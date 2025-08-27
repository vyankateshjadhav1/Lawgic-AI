import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, MessageCircle } from "lucide-react";

const appointments = [
  {
    id: 1,
    clientName: "John Smith",
    clientEmail: "john.smith@email.com",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "60 min",
    type: "Consultation",
    status: "confirmed",
    description: "Family law consultation regarding divorce proceedings"
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    clientEmail: "sarah.j@email.com",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "45 min",
    type: "Follow-up",
    status: "confirmed",
    description: "Contract review follow-up meeting"
  },
  {
    id: 3,
    clientName: "Michael Davis",
    clientEmail: "m.davis@email.com",
    date: "2024-01-16",
    time: "11:00 AM",
    duration: "30 min",
    type: "Consultation",
    status: "pending",
    description: "Initial consultation for business incorporation"
  }
];

export function ScheduledAppointments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Scheduled Appointments</h2>
        <p className="text-muted-foreground">
          View and manage your upcoming client appointments
        </p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-6 hover:shadow-hover transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.clientEmail}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.time} ({appointment.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{appointment.type}</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{appointment.description}</p>
              </div>

              <div className="flex flex-col space-y-2 lg:ml-6">
                <Button size="sm" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Client</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Message</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
          <p className="text-muted-foreground">
            You don't have any scheduled appointments yet.
          </p>
        </Card>
      )}
    </div>
  );
}