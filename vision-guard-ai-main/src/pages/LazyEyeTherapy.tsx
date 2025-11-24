import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const SHAPES = ['●', '■', '▲', '★', '♥'];
const COLORS = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500'];

const LazyEyeTherapy = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState('');
  const [targetColor, setTargetColor] = useState('');
  const [objects, setObjects] = useState<Array<{shape: string, color: string, x: number, y: number, id: number}>>([]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newObj = {
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
          id: Date.now(),
        };
        setObjects(prev => [...prev, newObj].slice(-8));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const startExercise = () => {
    setIsPlaying(true);
    setScore(0);
    setTargetShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
    setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setObjects([]);
  };

  const handleClick = (obj: {shape: string, color: string, id: number}) => {
    if (obj.shape === targetShape && obj.color === targetColor) {
      setScore(prev => prev + 10);
      setObjects(prev => prev.filter(o => o.id !== obj.id));
      toast.success("+10 points!");
      // Generate new target
      setTargetShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
      setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      toast.error("-5 points");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/exercises">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exercises
          </Button>
        </Link>

        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Lazy Eye Therapy</h1>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-3xl font-bold text-primary">{score}</p>
            </div>
          </div>

          {!isPlaying ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-8">
                Click on objects that match the target shape and color to score points!
              </p>
              <Button onClick={startExercise} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Exercise
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Find this:</p>
                <p className={`text-6xl ${targetColor}`}>{targetShape}</p>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-muted to-background rounded-lg border-2 border-border overflow-hidden">
                {objects.map(obj => (
                  <button
                    key={obj.id}
                    onClick={() => handleClick(obj)}
                    className={`absolute text-5xl transition-all hover:scale-125 ${obj.color}`}
                    style={{
                      left: `${obj.x}%`,
                      top: `${obj.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {obj.shape}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button onClick={() => setIsPlaying(false)} variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LazyEyeTherapy;
