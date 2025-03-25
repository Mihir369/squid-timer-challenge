
import React from 'react';
import { useScrollAnimation } from '@/lib/animations';
import { Triangle, Circle, Square, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const InstructionSection: React.FC = () => {
  const animation1 = useScrollAnimation();
  const animation2 = useScrollAnimation();
  const animation3 = useScrollAnimation();
  const isMobile = useIsMobile();
  
  return (
    <section className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h4 className="section-subtitle">Game Instructions</h4>
          <h2 className="section-title squid-gradient bg-clip-text text-transparent">How To Participate</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mt-4">
            Follow these steps carefully. Any violation of the rules will result in immediate elimination.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div 
            ref={animation1.ref} 
            className={`glass-card p-6 transition-all duration-700 ${
              animation1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-squid-pink/20 flex items-center justify-center mb-4">
                <Triangle className={`h-8 w-8 text-squid-pink ${isMobile ? 'animate-pulse' : 'animate-float'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Registration</h3>
              <p className="text-gray-300">
                Complete the application form before the timer expires. Late entries will not be considered.
              </p>
              <div className="mt-6 space-y-3 text-left w-full">
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Valid identification required</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Consent form must be signed</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Medical clearance certificate</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={animation2.ref} 
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              animation2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-squid-teal/20 flex items-center justify-center mb-4">
                <Circle className={`h-8 w-8 text-squid-teal ${isMobile ? 'animate-subtle-bounce' : 'animate-float'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Selection Process</h3>
              <p className="text-gray-300">
                Participants will be selected based on eligibility criteria and background checks.
              </p>
              <div className="mt-6 space-y-3 text-left w-full">
                <div className="flex items-start">
                  <div className="bg-squid-teal/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-teal" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Physical capability assessment</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-teal/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-teal" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Psychological evaluation</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-teal/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-teal" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Financial status verification</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={animation3.ref} 
            className={`glass-card p-6 transition-all duration-700 delay-400 ${
              animation3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-squid-pink/20 flex items-center justify-center mb-4">
                <Square className={`h-8 w-8 text-squid-pink ${isMobile ? 'animate-shake' : 'animate-float'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Game Day</h3>
              <p className="text-gray-300">
                Selected participants will receive instructions on where and when to appear.
              </p>
              <div className="mt-6 space-y-3 text-left w-full">
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Transportation will be provided</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Personal belongings not allowed</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-squid-pink/20 p-1 rounded mt-0.5">
                    <AlertCircle className="h-4 w-4 text-squid-pink" />
                  </div>
                  <p className="text-sm text-gray-400 ml-3">Prepare for extended stay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="squid-btn-primary px-8 py-4 text-lg animate-pulse-glow">
            Apply Now
          </button>
          <div className="mt-4 text-sm text-gray-400">
            Applications close when the timer reaches zero
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructionSection;
