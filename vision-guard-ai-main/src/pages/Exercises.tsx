import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Exercises = () => {
  const exercises = [
    {
      title: "Lazy Eye Therapy",
      icon: Eye,
      description: "Interactive exercises to strengthen vision and improve amblyopia",
      link: "/exercises/lazy-eye",
      color: "from-primary to-primary-glow",
    },
    {
      title: "Vision Jump Game",
      icon: Gamepad2,
      description: "Doodle Jump-inspired game to improve eye coordination",
      link: "/exercises/jump-game",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Eye Exercises
          </h1>
          <p className="text-muted-foreground">
            Strengthen your vision with fun, interactive exercises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Link key={exercise.title} to={exercise.link} className="group">
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${exercise.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{exercise.title}</h3>
                  <p className="text-muted-foreground">{exercise.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
