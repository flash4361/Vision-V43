import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Palette, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VisionTests = () => {
  const tests = [
    {
      title: "Visual Acuity Test",
      icon: Eye,
      description: "Test your vision sharpness with Snellen chart letters",
      link: "/vision-tests/acuity",
      color: "from-primary to-primary-glow",
    },
    {
      title: "Color Blindness Test",
      icon: Palette,
      description: "Identify color perception with Ishihara plates",
      link: "/vision-tests/color",
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "Amblyopia Test",
      icon: Search,
      description: "Test eye coordination with letter recognition",
      link: "/vision-tests/amblyopia",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Vision Tests
          </h1>
          <p className="text-muted-foreground">
            Choose a test to check your eye health
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => {
            const Icon = test.icon;
            return (
              <Link key={test.title} to={test.link} className="group">
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${test.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisionTests;
