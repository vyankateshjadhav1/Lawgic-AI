import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import legalHero from "@/assets/legal-hero.jpg";
import lawyerIcon from "@/assets/lawyer-icon.png";
import userIcon from "@/assets/user-icon.png";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/auth?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${legalHero})` }}
        >
          <div className="absolute inset-0 bg-legal-navy/70"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-6">
                <Scale className="h-12 w-12 mr-4" />
                <h1 className="text-5xl font-bold">Lawgic AI</h1>
              </div>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Connecting legal professionals with clients through intelligent appointment management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-muted-foreground">
              Select how you'd like to use Lawgic AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Lawyer Card */}
            <Card className="p-8 hover:shadow-hover transition-all duration-300 cursor-pointer group">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <img
                    src={lawyerIcon}
                    alt="Lawyer"
                    className="h-20 w-20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    I'm a Lawyer
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Manage your practice, set availability, and connect with clients
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    <li>• Appointment scheduling</li>
                    <li>• Client management</li>
                    <li>• Time availability control</li>
                    <li>• Professional profile</li>
                  </ul>
                </div>
                <Button
                  onClick={() => handleRoleSelect("lawyer")}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Scale className="mr-2 h-5 w-5" />
                  Continue as Lawyer
                </Button>
              </div>
            </Card>

            {/* User Card */}
            <Card className="p-8 hover:shadow-hover transition-all duration-300 cursor-pointer group">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <img
                    src={userIcon}
                    alt="Client"
                    className="h-20 w-20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    I need Legal Help
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Find qualified lawyers and book consultations easily
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    <li>• Search qualified lawyers</li>
                    <li>• Book consultations</li>
                    <li>• Manage appointments</li>
                    <li>• Secure communication</li>
                  </ul>
                </div>
                <Button
                  onClick={() => handleRoleSelect("user")}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Continue as Client
                </Button>
              </div>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Why Choose Lawgic AI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Professional Network</h4>
                <p className="text-sm text-muted-foreground">
                  Connect with verified legal professionals
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Easy Scheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Book appointments with just a few clicks
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Secure Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Your data and communications are protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;