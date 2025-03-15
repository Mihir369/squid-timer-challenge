import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Calendar,
  Trophy,
  Flag,
  Timer,
  Award,
  Star,
  Rocket,
  Target,
  Skull,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useCarousel } from "@/hooks/use-carousel";

// Competition timeline data
const timelineEvents = [
  {
    date: "march 20",
    title: "Registration Opens",
    description: "Players can officially enroll in the competition",
    icon: <Rocket className="h-8 w-8 text-squid-pink" />,
    color: "from-squid-pink to-squid-red",
  },
  {
    date: "Apr 4",
    title: "Registration Closes",
    description: "Last chance to secure your spot",
    icon: <Timer className="h-8 w-8 text-squid-red" />,
    color: "from-squid-red to-red-700",
  },
  {
    date: "Apr 5",
    title: "Orientation Day",
    description: "Introduction to rules and challenges",
    icon: <Flag className="h-8 w-8 text-squid-teal" />,
    color: "from-squid-teal to-cyan-700",
  },
  {
    date: "Apr 5",
    title: "First Game",
    description: "Red Light, Green Light",
    icon: <Skull className="h-8 w-8 text-white" />,
    color: "from-white/30 to-white/10",
  },
  {
    date: " Apr 5",
    title: "Final Game",
    description: "Squid Game",
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
    color: "from-yellow-400 to-amber-600",
  },
];

const RegistrationChart: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  // Calculate progress percentage based on current slide
  const progressPercentage = Math.min(
    ((currentIndex + 0.75) / (timelineEvents.length - 1)) * 100,
    100
  );

  React.useEffect(() => {
    if (!api) return;

    // Update current index when the slide changes
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    // Set initial index
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h3 className="section-title text-squid-pink">Competition Timeline</h3>
      </div>

      {/* Competition Timeline Section */}
      <div className="py-6">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {timelineEvents.map((event, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <div
                    className={`h-full p-6 rounded-xl bg-gradient-to-br ${event.color} bg-opacity-20 border border-white/10 flex flex-col`}
                  >
                    <div className="mb-4 flex justify-between items-start">
                      <div className="p-3 bg-black/30 rounded-lg">
                        {event.icon}
                      </div>
                      <span className="bg-black/40 text-white text-sm py-1 px-3 rounded-full">
                        {event.date}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white">
                      {event.title}
                    </h4>
                    <p className="text-white/70 text-sm">{event.description}</p>

                    {/* Event number/position indicator */}
                    <div className="mt-auto pt-4 flex items-center">
                      <div className="h-1 flex-grow bg-white/20 rounded-full">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{
                            width: `${
                              (index / (timelineEvents.length - 1)) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="ml-3 text-xs text-white/50">
                        {index + 1}/{timelineEvents.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 bg-black/50 border-squid-pink text-squid-pink hover:bg-black/70" />
          <CarouselNext className="right-1 bg-black/50 border-squid-pink text-squid-pink hover:bg-black/70" />
        </Carousel>
      </div>

      {/* Timeline Visualization */}
      <div className="relative mt-6 mb-2 px-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-squid-pink rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between pt-6">
          {timelineEvents.map((event, index) => {
            const isActive = index <= currentIndex;
            return (
              <div key={index} className="text-center">
                <div
                  className={`w-3 h-3 rounded-full mx-auto -mt-7 transition-colors duration-300
                    ${isActive ? "bg-squid-pink" : "bg-gray-600"}`}
                ></div>
                <span className="text-xs mt-1 block text-white/70">
                  {index === 0
                    ? "Registration"
                    : index === 1
                    ? "Preparation"
                    : index === 2
                    ? "Orientation"
                    : index === 3
                    ? "Games"
                    : "Finals"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegistrationChart;
