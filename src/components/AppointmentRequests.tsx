import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Check, X, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const requests = [
  {
    id: 1,
    clientName: "Robert Wilson",
    clientEmail: "robert.wilson@email.com",
    requestedDate: "2024-01-20",
    requestedTime: "3:00 PM",
    duration: "60 min",
    type: "Initial Consultation",
    description: "Need legal advice regarding employment contract dispute with current employer.",
    status: "pending",
    submittedAt: "2024-01-10"
  },
  {
    id: 2,
    clientName: "Lisa Chen",
    clientEmail: "lisa.chen@email.com",
    requestedDate: "2024-01-22",
    requestedTime: "10:00 AM",
    duration: "45 min",
    type: "Legal Review",
    description: "Business partnership agreement review and consultation.",
    status: "pending",
    submittedAt: "2024-01-11"
  },
  {
    id: 3,
    clientName: "James Miller",
    clientEmail: "j.miller@email.com",
    requestedDate: "2024-01-18",
    requestedTime: "2:00 PM",
    duration: "30 min",
    type: "Follow-up",
    description: "Follow-up meeting regarding estate planning documents.",
    status: "pending",
    submittedAt: "2024-01-09"
  }
];

export function AppointmentRequests() {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleApprove = (requestId: number) => {
    toast({
      title: "Appointment Approved",
      description: "The appointment request has been approved and the client has been notified.",
      variant: "default",
    });
  };

  const handleDecline = (requestId: number) => {
    if (responseMessage.trim()) {
      toast({
        title: "Appointment Declined",
        description: "The appointment request has been declined with your message.",
        variant: "destructive",
      });
      setSelectedRequest(null);
      setResponseMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "approved":
        return "bg-success/10 text-success border-success/20";
      case "declined":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Appointment Requests</h2>
        <p className="text-muted-foreground">
          Review and respond to incoming appointment requests from clients
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-hover transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">{request.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{request.clientEmail}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{request.requestedDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{request.requestedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{request.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: {request.duration}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{request.description}</p>
              </div>

              <div className="text-xs text-muted-foreground">
                Submitted on {request.submittedAt}
              </div>

              {request.status === "pending" && (
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  {selectedRequest === request.id && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Add a message for the client (optional for approval, required for decline)"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center space-x-2"
                      size="sm"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (selectedRequest === request.id) {
                          handleDecline(request.id);
                        } else {
                          setSelectedRequest(request.id);
                          setResponseMessage("");
                        }
                      }}
                      className="flex items-center space-x-2"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                      <span>Decline</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Message Client</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
          <p className="text-muted-foreground">
            You don't have any pending appointment requests at the moment.
          </p>
        </Card>
      )}
    </div>
  );
}