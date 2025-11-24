import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Diagnose = () => {
  const [medicalHistory, setMedicalHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!medicalHistory && !symptoms) {
      toast.error("Please provide medical history or symptoms");
      return;
    }

    setLoading(true);
    setDiagnosis("");

    try {
      const { data, error } = await supabase.functions.invoke('diagnose-eye-condition', {
        body: {
          medicalHistory,
          symptoms,
          image: imagePreview
        }
      });

      if (error) throw error;

      setDiagnosis(data.diagnosis);
      toast.success("Diagnosis completed");
    } catch (error) {
      console.error("Diagnosis error:", error);
      toast.error("Failed to get diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Eye Diagnosis
          </h1>

          <div className="space-y-6">
            <div>
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                placeholder="Any previous eye conditions, surgeries, or family history..."
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="min-h-24 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="symptoms">Current Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe what you're experiencing (blurred vision, pain, redness, etc.)..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-24 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="image">Upload Eye Photo (Optional)</Label>
              <div className="mt-2">
                <label htmlFor="image" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Eye" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div className="space-y-2">
                        <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload photo</p>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <Button
              onClick={handleDiagnose}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get AI Diagnosis"
              )}
            </Button>

            {diagnosis && (
              <Card className="p-6 bg-muted">
                <h3 className="font-semibold text-lg mb-3">AI Analysis:</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground">{diagnosis}</p>
                </div>
                <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning-foreground">
                    <strong>Disclaimer:</strong> This is an AI-powered preliminary assessment and should not replace professional medical advice. Please consult with a qualified eye care professional for proper diagnosis and treatment.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Diagnose;
