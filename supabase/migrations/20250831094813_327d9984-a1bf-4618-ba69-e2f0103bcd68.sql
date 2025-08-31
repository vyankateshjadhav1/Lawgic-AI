-- Create enum types
CREATE TYPE public.user_type AS ENUM ('client', 'lawyer');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE public.appointment_type AS ENUM ('consultation', 'follow_up', 'document_review', 'court_preparation');

-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  user_type user_type NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lawyers table for lawyer-specific information
CREATE TABLE public.lawyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  experience_years INTEGER NOT NULL DEFAULT 0,
  education TEXT,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time_slots table for lawyer availability
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(lawyer_id, day_of_week, start_time, end_time)
);

-- Create appointment_requests table
CREATE TABLE public.appointment_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_date DATE NOT NULL,
  requested_time TIME NOT NULL,
  appointment_type appointment_type NOT NULL,
  description TEXT NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  response_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table for confirmed appointments
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  appointment_type appointment_type NOT NULL,
  description TEXT NOT NULL,
  status appointment_status NOT NULL DEFAULT 'confirmed',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for lawyers
CREATE POLICY "Anyone can view lawyer profiles" ON public.lawyers FOR SELECT USING (true);
CREATE POLICY "Lawyers can update their own profile" ON public.lawyers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Lawyers can insert their own profile" ON public.lawyers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for time_slots
CREATE POLICY "Anyone can view time slots" ON public.time_slots FOR SELECT USING (true);
CREATE POLICY "Lawyers can manage their own time slots" ON public.time_slots FOR ALL USING (auth.uid() = lawyer_id);

-- RLS Policies for appointment_requests
CREATE POLICY "Users can view their own appointment requests" ON public.appointment_requests 
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = lawyer_id);
CREATE POLICY "Clients can create appointment requests" ON public.appointment_requests 
  FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Lawyers can update appointment requests" ON public.appointment_requests 
  FOR UPDATE USING (auth.uid() = lawyer_id);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" ON public.appointments 
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = lawyer_id);
CREATE POLICY "Lawyers can manage appointments" ON public.appointments 
  FOR ALL USING (auth.uid() = lawyer_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lawyers_updated_at BEFORE UPDATE ON public.lawyers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_time_slots_updated_at BEFORE UPDATE ON public.time_slots FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointment_requests_updated_at BEFORE UPDATE ON public.appointment_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')::user_type
  );
  
  -- If user is a lawyer, create lawyer profile
  IF (NEW.raw_user_meta_data->>'user_type' = 'lawyer') THEN
    INSERT INTO public.lawyers (user_id, specialties, experience_years)
    VALUES (NEW.id, '{}', 0);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();