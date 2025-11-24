import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Medication {
  id: string;
  name: string;
  purpose: string;
  timing: string;
}

const Medication = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [timing, setTiming] = useState("");

  const addMedication = () => {
    if (!name || !purpose || !timing) {
      toast.error("Please fill all fields");
      return;
    }

    const newMed: Medication = {
      id: Date.now().toString(),
      name,
      purpose,
      timing,
    };

    setMedications([...medications, newMed]);
    setName("");
    setPurpose("");
    setTiming("");
    toast.success("Medication added successfully");
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast.success("Medication removed");
  };

  const enableReminders = () => {
    if (medications.length === 0) {
      toast.error("Please add medications first");
      return;
    }
    toast.success("Reminders enabled! You'll receive notifications at scheduled times.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Add Medication Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6 text-primary" />
              Add Medication
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Medication Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Eye Drops"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  placeholder="e.g., Reduce inflammation"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="timing">Timing</Label>
                <Input
                  id="timing"
                  type="time"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button onClick={addMedication} className="w-full">
                Add Medication
              </Button>
            </div>
          </Card>

          {/* Medication List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Medications</h2>
              {medications.length > 0 && (
                <Button onClick={enableReminders} size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Reminders
                </Button>
              )}
            </div>

            {medications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No medications added yet</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {medications.map((med) => (
                  <Card key={med.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{med.name}</h3>
                        <p className="text-sm text-muted-foreground">{med.purpose}</p>
                        <p className="text-sm font-medium text-primary">
                          Time: {med.timing}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(med.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medication;
