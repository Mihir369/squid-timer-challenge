
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import RegistrationChart from '@/components/RegistrationChart';
import InstructionSection from '@/components/InstructionSection';
import { Triangle, Circle, Square } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  // Set countdown end date to 7 days from now
  const [endDate] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return end;
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast when component mounts
    toast({
      title: "Welcome to Squid Challenge",
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
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-squid-pink/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-squid-teal/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-squid-pink/30 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center space-x-4">
              <div className="h-12 w-12 shape-triangle bg-squid-pink animate-float"></div>
              <div className="h-12 w-12 shape-circle bg-squid-teal animate-float animation-delay-500"></div>
              <div className="h-12 w-12 shape-square bg-squid-pink animate-float animation-delay-1000"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
              <span className="squid-gradient bg-clip-text text-transparent">SQUID GAME</span> CHALLENGE
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 animate-slide-up">
              The clock is ticking. Register now to join the game of a lifetime.
              <br />Only the determined will survive.
            </p>
            
            <div className="mt-12 mb-16">
              <h3 className="text-xl mb-6 font-semibold">Registration Closes In:</h3>
              <CountdownTimer endDate={endDate} onComplete={handleTimerComplete} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Chart Section */}
      <section className="py-16 bg-black/40">
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
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-squid-pink/10 rounded-full blur-3xl animate-rotate-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-squid-teal/10 rounded-full blur-3xl animate-rotate-slow animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h4 className="section-subtitle">The Ultimate Reward</h4>
            <h2 className="section-title squid-gradient bg-clip-text text-transparent">The Prize</h2>
          </div>
          
          <div className="max-w-4xl mx-auto glass-card p-12 text-center">
            <div className="text-7xl md:text-8xl lg:text-9xl font-bold squid-gradient bg-clip-text text-transparent mb-8">
              ₩45.6B
            </div>
            <p className="text-xl text-gray-300 mb-8">
              A life-changing amount that will solve all your financial problems.
              <br />But at what cost?
            </p>
            <div className="pt-8 border-t border-white/10">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take the Challenge?</h2>
            <p className="text-gray-300 mb-8">
              Spaces are limited and time is running out. Register now to secure your chance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="squid-btn-primary text-lg">Register Now</button>
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
