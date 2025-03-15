import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { AlertTriangle, Send, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-squid-dark text-white">
      <AnimatedBackground />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-6">
                <AlertTriangle className="h-8 w-8 text-squid-red animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-archivo mb-6 tracking-tight">
                <span className="squid-gradient bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Have questions about the competition? Reach out to us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-card p-8 rounded-lg">
                <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                  Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-squid-teal"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-squid-teal"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-squid-teal"
                      placeholder="What would you like to know?"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-squid-red hover:bg-squid-red/80 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="glass-card p-8 rounded-lg">
                  <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                    Quick Info
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 text-squid-red">
                        <span className="font-archivo">Location:</span>
                      </div>
                      <div className="text-gray-300">
                        Undisclosed Island, South Korea
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-squid-red">
                        <span className="font-archivo">Email:</span>
                      </div>
                      <div className="text-gray-300">
                        info@ingenious-competition.com
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-squid-red">
                        <span className="font-archivo">Hours:</span>
                      </div>
                      <div className="text-gray-300">24/7 - We never sleep</div>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-lg">
                  <h2 className="text-2xl font-archivo mb-4 text-squid-teal">
                    Important Note
                  </h2>
                  <p className="text-gray-300 mb-2">
                    Once registered, participants cannot withdraw from the
                    competition without penalties. All rules must be strictly
                    followed.
                  </p>
                  <p className="text-squid-red font-bold">
                    Remember: A deal is a deal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
