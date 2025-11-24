import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'R', 'T', 'V', 'X', 'Y', 'Z'];
const SIZES = [60, 52, 44, 36, 28, 24, 20];
const TEST_DURATION = 60; // 60 seconds

const AmblyopiaTest = () => {
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('');
  const [fontSize, setFontSize] = useState(60);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);

  useEffect(() => {
    if (testStarted && !testComplete) {
      generateNewLetter();
    }
  }, [testStarted]);

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTestComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, timeLeft]);

  const generateNewLetter = () => {
    const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    const randomSize = SIZES[Math.floor(Math.random() * SIZES.length)];
    const randomX = Math.random() * 70 + 15; // 15-85%
    const randomY = Math.random() * 60 + 20; // 20-80%
    
    setCurrentLetter(randomLetter);
    setFontSize(randomSize);
    setPosition({ x: randomX, y: randomY });
  };

  const handleSubmit = () => {
    if (!userInput) return;

    if (userInput.toUpperCase() === currentLetter) {
      setCorrectCount(prev => prev + 1);
      generateNewLetter();
      setUserInput('');
    }
  };

  const startTest = () => {
    setTestStarted(true);
    setTestComplete(false);
    setCorrectCount(0);
    setTimeLeft(TEST_DURATION);
  };

  const calculateResult = () => {
    if (correctCount >= 40) return { status: "Excellent", color: "text-success", message: "Your eye coordination is excellent!" };
    if (correctCount >= 25) return { status: "Good", color: "text-primary", message: "Your eye coordination is good." };
    if (correctCount >= 15) return { status: "Fair", color: "text-warning", message: "Consider consulting an eye specialist." };
    return { status: "Needs Attention", color: "text-destructive", message: "Please consult an eye specialist." };
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
            <h1 className="text-3xl font-bold mb-4">Amblyopia Test</h1>
            <p className="text-muted-foreground mb-8">
              This test checks eye coordination by displaying letters in different positions and sizes. You have 60 seconds to identify as many letters as possible.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • Letters will appear in random positions
              </p>
              <p className="text-sm text-muted-foreground">
                • Type the letter you see and press Enter
              </p>
              <p className="text-sm text-muted-foreground">
                • Work as quickly and accurately as possible
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
              <p className="text-6xl font-bold mb-4">{correctCount}</p>
              <p className="text-sm text-muted-foreground mb-2">Letters Identified</p>
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
      <div className="max-w-4xl mx-auto">
        <Link to="/vision-tests">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tests
          </Button>
        </Link>

        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm">
              <span className="text-muted-foreground">Score: </span>
              <span className="font-bold text-2xl text-primary">{correctCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Time: </span>
              <span className={`font-bold text-2xl ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="relative h-96 bg-muted rounded-lg mb-6">
            <p
              className="absolute font-bold text-foreground select-none transition-all duration-200"
              style={{
                fontSize: `${fontSize}px`,
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {currentLetter}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              maxLength={1}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type the letter and press Enter"
              className="text-center text-2xl"
              autoFocus
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AmblyopiaTest;
