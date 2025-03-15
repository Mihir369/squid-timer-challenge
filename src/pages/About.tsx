import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Square, Circle, Triangle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-squid-dark text-white">
      <AnimatedBackground />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-6">
                <Triangle className="h-8 w-8 text-squid-red" />
                <Circle className="h-8 w-8 text-squid-teal" />
                <Square className="h-8 w-8 text-squid-red" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-archivo mb-6 tracking-tight">
                <span className="squid-gradient bg-clip-text text-transparent">
                  About INGENIOUS
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Learn about our competition and what makes it unique.
              </p>
            </div>

            <div className="space-y-12">
              <section className="glass-card p-8 rounded-lg">
                <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                  Our Story
                </h2>
                <p className="text-gray-300 mb-4">
                  INGENIOUS was founded with a simple yet powerful mission: to
                  challenge brilliant minds and push them beyond their limits.
                  Our competition brings together individuals from diverse
                  backgrounds, all competing for the ultimate prize.
                </p>
                <p className="text-gray-300">
                  What started as a small event has now grown into a global
                  phenomenon that captures the imagination of millions. Yet we
                  maintain our core principles: fairness, challenge, and the
                  pursuit of excellence.
                </p>
              </section>

              <section className="glass-card p-8 rounded-lg">
                <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                  Our Philosophy
                </h2>
                <p className="text-gray-300 mb-4">
                  We believe that under pressure, people show their true nature.
                  INGENIOUS is designed to push participants to their
                  intellectual and psychological limits, revealing their genuine
                  character and capabilities.
                </p>
                <p className="text-gray-300">
                  Every challenge in our competition has been meticulously
                  crafted to test different aspects of human ingenuity,
                  resilience, and strategic thinking.
                </p>
              </section>

              <section className="glass-card p-8 rounded-lg">
                <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                  The Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-squid-dark rounded-full border-2 border-squid-red flex items-center justify-center mb-4">
                      <Triangle className="h-10 w-10 text-squid-red" />
                    </div>
                    <h3 className="font-archivo text-lg mb-1">The Front Man</h3>
                    <p className="text-gray-400 text-sm">
                      Competition Director
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-squid-dark rounded-full border-2 border-squid-teal flex items-center justify-center mb-4">
                      <Circle className="h-10 w-10 text-squid-teal" />
                    </div>
                    <h3 className="font-archivo text-lg mb-1">The Host</h3>
                    <p className="text-gray-400 text-sm">
                      Master of Ceremonies
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-squid-dark rounded-full border-2 border-squid-red flex items-center justify-center mb-4">
                      <Square className="h-10 w-10 text-squid-red" />
                    </div>
                    <h3 className="font-archivo text-lg mb-1">The Manager</h3>
                    <p className="text-gray-400 text-sm">Operations Lead</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
