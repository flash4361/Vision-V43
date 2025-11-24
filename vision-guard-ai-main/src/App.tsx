import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VisionTests from "./pages/VisionTests";
import VisualAcuityTest from "./pages/VisualAcuityTest";
import ColorBlindnessTest from "./pages/ColorBlindnessTest";
import AmblyopiaTest from "./pages/AmblyopiaTest";
import Diagnose from "./pages/Diagnose";
import Medication from "./pages/Medication";
import Exercises from "./pages/Exercises";
import LazyEyeTherapy from "./pages/LazyEyeTherapy";
import JumpGame from "./pages/JumpGame";
import TwentyRule from "./pages/TwentyRule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vision-tests" element={<VisionTests />} />
          <Route path="/vision-tests/acuity" element={<VisualAcuityTest />} />
          <Route path="/vision-tests/color" element={<ColorBlindnessTest />} />
          <Route path="/vision-tests/amblyopia" element={<AmblyopiaTest />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/lazy-eye" element={<LazyEyeTherapy />} />
          <Route path="/exercises/jump-game" element={<JumpGame />} />
          <Route path="/twenty-rule" element={<TwentyRule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
