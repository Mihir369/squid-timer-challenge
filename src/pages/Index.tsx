
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import RegistrationChart from "@/components/RegistrationChart";
import InstructionSection from "@/components/InstructionSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Triangle, Circle, Square, AlertTriangle, Skull, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [endDate] = useState(() => {
    return new Date(2025, 3, 4, 23, 59, 59, 999);
  });
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Only show welcome toast on desktop for better performance on mobile
    if (!isMobile) {
      toast({
        title: "Welcome to INGENIOUS",
        description: "Registration is now open. The timer is counting down!",
        duration: 5000,
      });
    }
  }, [toast, isMobile]);

  const handleTimerComplete = () => {
    toast({
      title: "Registration Closed",
      description: "The deadline has passed. No more entries accepted.",
      variant: "destructive",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 md:mb-6 flex justify-center space-x-3 md:space-x-4">
              <AlertTriangle className="h-8 w-8 md:h-12 md:w-12 text-squid-red animate-pulse-danger" />
              <Circle className="h-8 w-8 md:h-12 md:w-12 text-squid-teal animate-float animation-delay-500" />
              <Skull className="h-8 w-8 md:h-12 md:w-12 text-squid-red animate-pulse-danger animation-delay-1000" />
            </div>

            <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
              <div className="inline-flex items-center justify-center">
                <img
                  src="/ingenious-logo.png"
                  alt="INGENIOUS"
                  className="h-12 sm:h-16 md:h-20 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const textSpan = document.createElement("span");
                      textSpan.className =
                        "text-4xl sm:text-5xl md:text-7xl font-black font-archivo tracking-tight text-white";
                      textSpan.textContent = "INGENIOUS";
                      parent.appendChild(textSpan);
                    }
                  }}
                />
              </div>
            </div>

            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-10 animate-slide-up px-2">
              The clock is ticking. Register now to join the game of a lifetime.
              <br className="hidden md:block" />
              Only the determined will survive.
            </p>

            <div className="mt-8 md:mt-12 mb-10 md:mb-16">
              <h3 className="text-xl md:text-2xl mb-4 md:mb-6 font-semibold font-archivo">
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
      <section className="py-12 md:py-16 bg-black/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <RegistrationChart />
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <InstructionSection />

      {/* Prize Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-squid-red/10 rounded-full blur-3xl animate-rotate-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-56 md:w-80 h-56 md:h-80 bg-squid-teal/10 rounded-full blur-3xl animate-rotate-slow animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h4 className="section-subtitle">The Ultimate Reward</h4>
            <h2 className="section-title squid-gradient bg-clip-text text-transparent">
              The Prize
            </h2>
          </div>

          <div className="max-w-4xl mx-auto glass-card p-6 md:p-12 text-center animate-pulse-danger">
            <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-archivo squid-gradient bg-clip-text text-transparent mb-4 md:mb-8">
              ₩45.6B
            </div>
            <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-8">
              A life-changing amount that will solve all your financial
              problems.
              <br className="hidden md:block" />
              But at what cost?
            </p>
            <div className="pt-4 md:pt-8 border-t border-squid-red/30">
              <p className="text-xs md:text-sm text-gray-400 italic">
                "Do you want to play a game with me? We'll have fun together..."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-black font-archivo mb-4 md:mb-6">
              Ready to Take the Challenge?
            </h2>
            <p className="text-gray-300 mb-6 md:mb-8">
              Spaces are limited and time is running out. Register now to secure
              your chance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="squid-btn-primary text-base md:text-lg animate-pulse-danger">
                Register Now
              </Link>
              <Link to="/about" className="squid-btn-outline text-base md:text-lg">
                Learn More
              </Link>
            </div>
            
            {/* Added visible admin login button */}
            <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-squid-red/20">
              <Link
                to="/admin"
                className="inline-flex items-center text-squid-red/70 hover:text-squid-red transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Admin access at the bottom, very subtle */}
      <div className="absolute bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity">
        <Link 
          to="/admin"
          className="text-xs text-gray-500 hover:text-squid-red flex items-center"
          aria-label="Admin Access"
        >
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Index;
