import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LETTERS = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'P', 'E', 'D'];
const SIZES = [80, 72, 64, 56, 48, 40, 32, 28, 24, 20, 18, 16, 14, 12, 10];

const VisualAcuityTest = () => {
  const navigate = useNavigate();
  const [currentLetter, setCurrentLetter] = useState(0);
  const [displayedLetter, setDisplayedLetter] = useState('');
  const [fontSize, setFontSize] = useState(80);
  const [userInput, setUserInput] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    if (testStarted && currentLetter < 15) {
      const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      const size = SIZES[Math.floor(Math.random() * SIZES.length)];
      setDisplayedLetter(randomLetter);
      setFontSize(size);
    }
  }, [currentLetter, testStarted]);

  const handleSubmit = () => {
    if (!userInput) {
      toast.error("Please enter a letter");
      return;
    }

    if (userInput.toUpperCase() === displayedLetter) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentLetter + 1 >= 15) {
      setTestComplete(true);
    } else {
      setCurrentLetter(prev => prev + 1);
      setUserInput('');
    }
  };

  const calculateResult = () => {
    const percentage = (correctAnswers / 15) * 100;
    if (percentage >= 90) return { status: "Excellent", color: "text-success", message: "Your vision is excellent!" };
    if (percentage >= 70) return { status: "Good", color: "text-primary", message: "Your vision is good, but consider a checkup." };
    if (percentage >= 50) return { status: "Fair", color: "text-warning", message: "You may need corrective lenses. Please consult an eye doctor." };
    return { status: "Poor", color: "text-destructive", message: "Please consult an eye doctor soon." };
  };

  const startTest = () => {
    setTestStarted(true);
    setCurrentLetter(0);
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
            <h1 className="text-3xl font-bold mb-4">Visual Acuity Test</h1>
            <p className="text-muted-foreground mb-8">
              This test will display 15 random letters in varying sizes. Enter each letter you see.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • Position yourself at a comfortable distance from the screen
              </p>
              <p className="text-sm text-muted-foreground">
                • Make sure you have good lighting
              </p>
              <p className="text-sm text-muted-foreground">
                • If you wear glasses, keep them on
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
              <p className="text-6xl font-bold mb-4">{correctAnswers}/15</p>
              <p className={`text-2xl font-semibold mb-2 ${result.color}`}>
                {result.status}
              </p>
              <p className="text-muted-foreground">{result.message}</p>
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
              <span>{currentLetter + 1} / 15</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentLetter + 1) / 15) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center py-12">
            <p
              className="font-bold text-foreground select-none"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
            >
              {displayedLetter}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              maxLength={1}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter the letter you see"
              className="text-center text-2xl"
              autoFocus
            />
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Next Letter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VisualAcuityTest;
