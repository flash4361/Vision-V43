import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Platform {
  x: number;
  y: number;
  width: number;
}

const JumpGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(80);
  const [velocityY, setVelocityY] = useState(0);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setPlayerX(50);
    setPlayerY(80);
    setVelocityY(0);
    
    // Initialize platforms
    const initialPlatforms: Platform[] = [];
    for (let i = 0; i < 8; i++) {
      initialPlatforms.push({
        x: Math.random() * 80 + 10,
        y: i * 12 + 10,
        width: 15,
      });
    }
    setPlatforms(initialPlatforms);
  };

  const handleMove = useCallback((direction: 'left' | 'right') => {
    if (!isPlaying || gameOver) return;
    setPlayerX(prev => {
      const newX = direction === 'left' ? prev - 5 : prev + 5;
      return Math.max(0, Math.min(100, newX));
    });
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setVelocityY(prev => prev + 0.5); // Gravity
      setPlayerY(prev => {
        const newY = prev + velocityY;
        
        // Check platform collision
        platforms.forEach(platform => {
          if (
            Math.abs(playerX - platform.x) < platform.width / 2 &&
            Math.abs(newY - platform.y) < 2 &&
            velocityY > 0
          ) {
            setVelocityY(-10); // Jump
            setScore(s => s + 10);
          }
        });

        // Game over if fall off screen
        if (newY > 100) {
          setGameOver(true);
          setIsPlaying(false);
        }

        return Math.min(100, newY);
      });

      // Scroll platforms down when player goes up
      if (playerY < 40 && velocityY < 0) {
        setPlatforms(prev => {
          const scrolled = prev.map(p => ({ ...p, y: p.y + 2 }));
          // Add new platform at top if needed
          if (scrolled[0].y > 10) {
            scrolled.unshift({
              x: Math.random() * 80 + 10,
              y: -10,
              width: 15,
            });
          }
          // Remove platforms that are off screen
          return scrolled.filter(p => p.y < 100).slice(0, 10);
        });
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, playerX, playerY, velocityY, platforms]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleMove('left');
      if (e.key === 'ArrowRight') handleMove('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/exercises">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exercises
          </Button>
        </Link>

        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Vision Jump Game</h1>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-3xl font-bold text-primary">{score}</p>
            </div>
          </div>

          {!isPlaying && !gameOver ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-8">
                Use arrow keys or buttons to move left/right. Land on platforms to jump higher!
              </p>
              <Button onClick={startGame} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </Button>
            </div>
          ) : gameOver ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-4xl font-bold text-primary mb-8">{score} points</p>
              <Button onClick={startGame} size="lg">
                Play Again
              </Button>
            </div>
          ) : (
            <>
              <div className="relative h-96 bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg border-2 border-border overflow-hidden">
                {/* Player */}
                <div
                  className="absolute w-8 h-8 bg-primary rounded-full transition-all duration-100"
                  style={{
                    left: `${playerX}%`,
                    top: `${playerY}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                
                {/* Platforms */}
                {platforms.map((platform, i) => (
                  <div
                    key={i}
                    className="absolute bg-green-600 rounded"
                    style={{
                      left: `${platform.x}%`,
                      top: `${platform.y}%`,
                      width: `${platform.width}%`,
                      height: '3%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => handleMove('left')} size="lg">
                  ← Left
                </Button>
                <Button onClick={() => handleMove('right')} size="lg">
                  Right →
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default JumpGame;
