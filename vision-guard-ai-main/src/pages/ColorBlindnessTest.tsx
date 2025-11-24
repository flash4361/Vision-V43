import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Simulated Ishihara plate data (number visible in the plate)
const ISHIHARA_PLATES = [
  { number: '12', normalVision: true },
  { number: '8', normalVision: true },
  { number: '6', normalVision: true },
  { number: '29', normalVision: true },
  { number: '57', normalVision: true },
  { number: '5', normalVision: true },
  { number: '3', normalVision: true },
  { number: '15', normalVision: true },
  { number: '74', normalVision: true },
  { number: '2', normalVision: true },
  { number: '6', normalVision: true },
  { number: '97', normalVision: true },
  { number: '45', normalVision: true },
  { number: '5', normalVision: true },
];

const ColorBlindnessTest = () => {
  const navigate = useNavigate();
  const [currentPlate, setCurrentPlate] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const handleSubmit = () => {
    if (userInput === ISHIHARA_PLATES[currentPlate].number) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentPlate + 1 >= ISHIHARA_PLATES.length) {
      setTestComplete(true);
    } else {
      setCurrentPlate(prev => prev + 1);
      setUserInput('');
    }
  };

  const calculateResult = () => {
    const percentage = (correctAnswers / ISHIHARA_PLATES.length) * 100;
    if (percentage >= 90) return { status: "Normal Color Vision", color: "text-success" };
    if (percentage >= 70) return { status: "Possible Color Deficiency", color: "text-warning" };
    return { status: "Likely Color Blindness", color: "text-destructive" };
  };

  const startTest = () => {
    setTestStarted(true);
    setCurrentPlate(0);
    setCorrectAnswers(0);
    setTestComplete(false);
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/vision-tests">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tests
            </Button>
          </Link>

          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Color Blindness Test</h1>
            <p className="text-muted-foreground mb-8">
              This test uses Ishihara plates to detect color vision deficiencies. You'll see 14 plates with numbers hidden in colored dots.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • View in good lighting conditions
              </p>
              <p className="text-sm text-muted-foreground">
                • Do not adjust your screen's color settings
              </p>
              <p className="text-sm text-muted-foreground">
                • Enter the number you see in each plate
              </p>
            </div>
            <Button onClick={startTest} className="mt-8" size="lg">
              Start Test
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const result = calculateResult();
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Test Complete!</h1>
            <div className="my-8">
              <p className="text-6xl font-bold mb-4">{correctAnswers}/{ISHIHARA_PLATES.length}</p>
              <p className={`text-2xl font-semibold mb-4 ${result.color}`}>
                {result.status}
              </p>
              <p className="text-muted-foreground">
                {correctAnswers >= 12 
                  ? "Your color vision appears normal." 
                  : "You may have some form of color vision deficiency. Please consult an eye specialist for a comprehensive evaluation."}
              </p>
            </div>
            <div className="space-x-4">
              <Button onClick={startTest}>Retry Test</Button>
              <Button variant="outline" onClick={() => navigate('/vision-tests')}>
                Back to Tests
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/vision-tests">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tests
          </Button>
        </Link>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{currentPlate + 1} / {ISHIHARA_PLATES.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPlate + 1) / ISHIHARA_PLATES.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center py-8">
            <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-rose-400 via-green-400 to-blue-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
              <p className="text-6xl font-bold text-white mix-blend-overlay z-10">
                {ISHIHARA_PLATES[currentPlate].number}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              What number do you see?
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              maxLength={2}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter the number"
              className="text-center text-2xl"
              autoFocus
            />
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Next Plate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ColorBlindnessTest;
