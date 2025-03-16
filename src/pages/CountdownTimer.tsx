
import React, { useState, useEffect } from 'react';
import { formatTime, getTimeRemaining } from '@/lib/animations';

interface CountdownTimerProps {
  endDate: Date;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endDate);
      setTimeLeft(remaining);
      
      if (remaining.total <= 0) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card p-8 animate-slide-up">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="timer-digit text-squid-pink">{formatTime(timeLeft.days)}</div>
            <div className="timer-label">Days</div>
          </div>
          
          <div className="hidden md:block text-4xl font-light">:</div>
          
          <div className="text-center">
            <div className="timer-digit text-squid-teal">{formatTime(timeLeft.hours)}</div>
            <div className="timer-label">Hours</div>
          </div>
          
          <div className="hidden md:block text-4xl font-light">:</div>
          
          <div className="text-center">
            <div className="timer-digit text-squid-pink">{formatTime(timeLeft.minutes)}</div>
            <div className="timer-label">Minutes</div>
          </div>
          
          <div className="hidden md:block text-4xl font-light">:</div>
          
          <div className="text-center">
            <div className="timer-digit text-squid-teal">{formatTime(timeLeft.seconds)}</div>
            <div className="timer-label">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
