import { Link } from "react-router-dom";
import { Eye, TestTube, Stethoscope, Pill, Dumbbell, Timer, Accessibility, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      title: "Vision Tests",
      icon: TestTube,
      description: "Test your visual acuity, color perception, and eye coordination",
      link: "/vision-tests",
      color: "from-blue-600 via-cyan-500 to-teal-400",
    },
    {
      title: "Diagnose",
      icon: Stethoscope,
      description: "AI-powered diagnosis for eye conditions",
      link: "/diagnose",
      color: "from-emerald-600 via-green-500 to-emerald-400",
    },
    {
      title: "Medication Tracking",
      icon: Pill,
      description: "Track your medications and get reminders",
      link: "/medication",
      color: "from-violet-600 via-purple-500 to-fuchsia-400",
    },
    {
      title: "Eye Exercises",
      icon: Dumbbell,
      description: "Strengthen your vision with interactive exercises",
      link: "/exercises",
      color: "from-amber-600 via-orange-500 to-yellow-400",
    },
    {
      title: "20-20-20 Rule",
      icon: Timer,
      description: "Reduce eye strain with regular reminders",
      link: "/twenty-rule",
      color: "from-sky-600 via-blue-500 to-cyan-400",
    },
    {
      title: "Low Vision",
      icon: Accessibility,
      description: "Accessibility tools for low vision users",
      link: "https://lowvision-vinay.vercel.app/",
      color: "from-indigo-700 via-purple-600 to-pink-500",
      external: true,
      premium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative py-12 px-4 md:py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Eye className="relative w-16 h-16 md:w-20 md:h-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 animate-pulse-glow" />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
                Vision-V
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Premium Eye Care</span>
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-medium mb-3">
            AI & GIS-Powered Smart Eye Care System
          </p>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Preventing blindness, improving accessibility with cutting-edge technology
          </p>
        </div>
      </header>

      {/* Features Grid */}
      <main className="relative px-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            const cardContent = (
              <Card className={`h-full p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl ${
                feature.premium 
                  ? 'ring-2 ring-purple-500/20 dark:ring-purple-400/20 hover:ring-purple-500/40 dark:hover:ring-purple-400/40 hover:shadow-purple-500/20' 
                  : 'hover:shadow-blue-500/10'
              }`}>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  {feature.premium && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      PREMIUM
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color} transition-all duration-500`}>
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                  {feature.external ? 'Visit Site' : 'Explore'}
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            );
            
            if (feature.external) {
              return (
                <a
                  key={feature.title}
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link 
                key={feature.title} 
                to={feature.link} 
                className="block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;
