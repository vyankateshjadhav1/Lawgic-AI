import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Save, Edit, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LawyerProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [profile, setProfile] = useState({
    name: "Dr. Emily Carter",
    email: "emily.carter@lawfirm.com",
    phone: "+1 (555) 123-4567",
    license: "BAR123456",
    experience: "12",
    hourlyRate: "350",
    bio: "Experienced attorney specializing in corporate law, mergers & acquisitions, and business litigation. Over 12 years of experience helping businesses navigate complex legal challenges.",
    specialties: ["Corporate Law", "M&A", "Business Litigation", "Contract Law"],
    education: "Harvard Law School, JD (2011)"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          <p className="text-muted-foreground">
            Manage your professional information and credentials
          </p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="flex items-center space-x-2"
        >
          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-xl">EC</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.education}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {profile.experience} years experience
              </p>
            </div>
            <div className="w-full">
              <p className="text-sm font-medium mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                    {isEditing && (
                      <button
                        onClick={() => removeSpecialty(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add specialty"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="text-xs"
                  />
                  <Button size="sm" onClick={addSpecialty}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Bar License Number</Label>
                <Input
                  id="license"
                  value={profile.license}
                  onChange={(e) => handleInputChange("license", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  value={profile.hourlyRate}
                  onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={profile.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Professional Bio</h3>
            <div className="space-y-2">
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Describe your experience, specialties, and approach to law..."
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}