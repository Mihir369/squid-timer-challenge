
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import RegistrationChart from "@/components/RegistrationChart";
import InstructionSection from "@/components/InstructionSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Triangle, Circle, Square, AlertTriangle, Skull } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [endDate] = useState(() => {
    // Set to April 4th 23:59:59.999 (last millisecond of April 4th)
    return new Date(2025, 3, 4, 23, 59, 59, 999);
  });

  const { toast } = useToast();
  // ... rest of your component

  useEffect(() => {
    // Show welcome toast when component mounts
    toast({
      title: "Welcome to INGENIOUS",
      description: "Registration is now open. The timer is counting down!",
      duration: 5000,
    });
  }, [toast]);

  const handleTimerComplete = () => {
    toast({
      title: "Registration Closed",
      description: "The deadline has passed. No more entries accepted.",
      variant: "destructive",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-squid-dark text-white">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center space-x-4">
              <AlertTriangle className="h-12 w-12 text-squid-red animate-pulse-danger" />
              <Circle className="h-12 w-12 text-squid-teal animate-float animation-delay-500" />
              <Skull className="h-12 w-12 text-squid-red animate-pulse-danger animation-delay-1000" />
            </div>

            <div className="flex justify-center mb-6 animate-fade-in">
              <div className="bg-gradient-to-r from-squid-red to-squid-pink p-3 rounded-md inline-flex items-center">
                <img 
                  src="/ingenious-logo.png" 
                  alt="INGENIOUS" 
                  className="h-16 md:h-20"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const textSpan = document.createElement('span');
                      textSpan.className = "text-5xl sm:text-6xl md:text-7xl font-black font-archivo tracking-tight text-white";
                      textSpan.textContent = "INGENIOUS";
                      parent.appendChild(textSpan);
                    }
                  }}
                />
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-10 animate-slide-up">
              The clock is ticking. Register now to join the game of a lifetime.
              <br />
              Only the determined will survive.
            </p>

            <div className="mt-12 mb-16">
              <h3 className="text-2xl mb-6 font-semibold font-archivo">
                Registration Closes In:
              </h3>
              <CountdownTimer
                endDate={endDate}
                onComplete={handleTimerComplete}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Chart Section */}
      <section className="py-16 bg-black/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <RegistrationChart />
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <InstructionSection />

      {/* Prize Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-squid-red/10 rounded-full blur-3xl animate-rotate-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-squid-teal/10 rounded-full blur-3xl animate-rotate-slow animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h4 className="section-subtitle">The Ultimate Reward</h4>
            <h2 className="section-title squid-gradient bg-clip-text text-transparent">
              The Prize
            </h2>
          </div>

          <div className="max-w-4xl mx-auto glass-card p-12 text-center animate-pulse-danger">
            <div className="text-7xl md:text-8xl lg:text-9xl font-bold font-archivo squid-gradient bg-clip-text text-transparent mb-8">
              ₩45.6B
            </div>
            <p className="text-xl text-gray-300 mb-8">
              A life-changing amount that will solve all your financial
              problems.
              <br />
              But at what cost?
            </p>
            <div className="pt-8 border-t border-squid-red/30">
              <p className="text-sm text-gray-400 italic">
                "Do you want to play a game with me? We'll have fun together..."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black font-archivo mb-6">
              Ready to Take the Challenge?
            </h2>
            <p className="text-gray-300 mb-8">
              Spaces are limited and time is running out. Register now to secure
              your chance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="squid-btn-primary text-lg animate-pulse-danger">
                Register Now
              </button>
              <button className="squid-btn-outline text-lg">Learn More</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
