import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

export function TimeAvailability() {
  const { toast } = useToast();
  const [availability, setAvailability] = useState({
    Monday: ["09:00", "10:00", "11:00"],
    Tuesday: ["09:00", "10:00", "11:00"],
    Wednesday: ["09:00", "10:00", "11:00"],
    Thursday: ["09:00", "10:00", "11:00"],
    Friday: ["09:00", "10:00", "11:00"],
    Saturday: [],
    Sunday: []
  });

  const toggleTimeSlot = (day, time) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].includes(time)
        ? prev[day].filter(t => t !== time)
        : [...prev[day], time].sort()
    }));
  };

  const handleSave = () => {
    toast({
      title: "Availability Updated",
      description: "Your time availability has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Time Availability</h2>
          <p className="text-muted-foreground">
            Set your available hours for client appointments
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      <div className="grid gap-6">
        {daysOfWeek.map((day) => (
          <Card key={day} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{day}</span>
              </h3>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`${day}-toggle`}>Available</Label>
                <Switch
                  id={`${day}-toggle`}
                  checked={availability[day].length > 0}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setAvailability(prev => ({ ...prev, [day]: [] }));
                    } else {
                      setAvailability(prev => ({ ...prev, [day]: ["09:00"] }));
                    }
                  }}
                />
              </div>
            </div>
            
            {availability[day].length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={availability[day].includes(time) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTimeSlot(day, time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}