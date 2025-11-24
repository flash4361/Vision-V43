import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const TwentyRule = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [breakTime, setBreakTime] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(20); // 20 seconds

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (breakTime) {
        setBreakTimeLeft(prev => {
          if (prev <= 1) {
            setBreakTime(false);
            setTimeLeft(20 * 60);
            toast.success("Break complete! Back to work.");
            return 20;
          }
          return prev - 1;
        });
      } else {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setBreakTime(true);
            toast.info("Time for a 20-second break! Look at something 20 feet away.", {
              duration: 5000,
            });
            return 20 * 60;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, breakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.success("20-20-20 timer started!");
    } else {
      toast.info("Timer paused");
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setBreakTime(false);
    setTimeLeft(20 * 60);
    setBreakTimeLeft(20);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <Bell className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-bold mb-2">20-20-20 Rule Timer</h1>
            <p className="text-muted-foreground">
              Every 20 minutes, look at something 20 feet away for 20 seconds
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 mb-8">
            <div className="text-center">
              {breakTime ? (
                <>
                  <p className="text-xl font-semibold mb-4 text-accent">Break Time!</p>
                  <p className="text-7xl font-bold mb-2 text-foreground animate-pulse">
                    {formatTime(breakTimeLeft)}
                  </p>
                  <p className="text-muted-foreground">
                    Look at something 20 feet away
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg text-muted-foreground mb-4">Time until break</p>
                  <p className="text-7xl font-bold mb-2 text-foreground">
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-muted-foreground">minutes remaining</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="flex-1 max-w-xs"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="flex-1 max-w-xs"
            >
              Reset
            </Button>
          </div>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Why the 20-20-20 Rule?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Reduces digital eye strain</li>
              <li>• Prevents dry eyes</li>
              <li>• Decreases headaches</li>
              <li>• Improves focus and productivity</li>
              <li>• Protects long-term eye health</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TwentyRule;
