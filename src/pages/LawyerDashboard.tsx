import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LawyerSidebar } from "@/components/LawyerSidebar";
import { LawyerHeader } from "@/components/LawyerHeader";
import { TimeAvailability } from "@/components/TimeAvailability";
import { ScheduledAppointments } from "@/components/ScheduledAppointments";
import { LawyerProfile } from "@/components/LawyerProfile";
import { AppointmentRequests } from "@/components/AppointmentRequests";

const LawyerDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return <ScheduledAppointments />;
      case "requests":
        return <AppointmentRequests />;
      case "availability":
        return <TimeAvailability />;
      case "profile":
        return <LawyerProfile />;
      default:
        return <ScheduledAppointments />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LawyerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <LawyerHeader />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerDashboard;