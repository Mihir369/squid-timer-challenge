// src/pages/RegisterPage.tsx
import { useState, useRef } from "react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    teamName: "",
    projectTitle: "",
    category: "",
    abstract: "",
    members: [
      { name: "", email: "", mobile: "", role: "Leader" },
      { name: "", email: "", mobile: "", role: "Member" },
      { name: "", email: "", mobile: "", role: "Member" },
      { name: "", email: "", mobile: "", role: "Member" },
    ],
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = [
    "Algorithm Mastery",
    "Cryptic Puzzles",
    "Survival Strategy",
    "Virtual Warfare",
    "AI Confrontation",
    "Data Decryption",
  ];

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, members: updatedMembers });
  };

  const validateVideo = (file: File) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;

        if (duration < 60) {
          reject("Video must be exactly 60 seconds - too short!");
        } else if (duration > 60) {
          reject("Video must be exactly 60 seconds - too long!");
        } else {
          resolve(true);
        }
      };

      video.onerror = () => {
        reject("Invalid video file");
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setVideoError("Only video files are allowed (MP4, MOV, AVI)");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setVideoError("File size exceeds 100MB limit");
      return;
    }

    try {
      await validateVideo(file);
      setVideoFile(file);
      setVideoError("");
    } catch (error) {
      setVideoError(error as string);
      setVideoFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      setVideoError("Demo video is required");
      return;
    }

    if (!formData.teamName || !formData.projectTitle || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Red fields require your attention",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Initiated!",
      description: "Your team has entered the arena",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pt-20 md:pt-24">
        <div className="glass-card p-8 w-full max-w-2xl border-2 border-squid-red/40 backdrop-blur-xl bg-black/40 shadow-[0_0_50px_rgba(234,56,76,0.2)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0" />

          <div className="relative z-10">
            <h2 className="text-3xl font-black text-squid-red text-center mb-2 font-archivo">
              SOLDIER REGISTRATION
            </h2>
            <p className="text-center text-squid-teal mb-8">
              Complete all stages to enter the game
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Stage 1: Team Formation */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 1: Team Formation
                </h3>

                <div>
                  <label className="block text-squid-teal mb-2">
                    Squad Codename *
                  </label>
                  <input
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg focus:border-squid-red focus:ring-2 focus:ring-squid-red/50"
                    placeholder="Enter your team's designation"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.members.map((member, index) => (
                    <div
                      key={index}
                      className="bg-black/20 p-4 rounded-lg border border-squid-red/30"
                    >
                      <div className="text-squid-teal text-sm mb-2">
                        Soldier {index + 1} - {member.role}
                        {index === 0 && (
                          <span className="text-squid-red ml-2">*</span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 bg-black/40 border border-squid-red/30 rounded-md"
                        required={index === 0}
                      />
                      <input
                        type="email"
                        placeholder="Military Grade Email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 bg-black/40 border border-squid-red/30 rounded-md"
                        required={index === 0}
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Code (+91)"
                        value={member.mobile}
                        onChange={(e) =>
                          handleMemberChange(index, "mobile", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-black/40 border border-squid-red/30 rounded-md"
                        pattern="^\+[0-9]{1,3}[0-9]{4,14}$"
                        required={index === 0}
                        title="Enter country code followed by number (e.g., +911234567890)"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage 2: Mission Briefing */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 2: Mission Briefing
                </h3>

                <div>
                  <label className="block text-squid-teal mb-2">
                    Operation Title *
                  </label>
                  <input
                    value={formData.projectTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, projectTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg"
                    placeholder="Classified project designation"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-squid-teal mb-2">
                      Combat Zone *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-black/30 border-2 border-squid-red/50">
                        <SelectValue placeholder="Select battlefield" />
                      </SelectTrigger>
                      <SelectContent className="bg-squid-dark border border-squid-red/30">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="hover:bg-squid-red/10 text-squid-teal"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-squid-teal mb-2">
                    Tactical Abstract *
                  </label>
                  <textarea
                    value={formData.abstract}
                    onChange={(e) =>
                      setFormData({ ...formData, abstract: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg h-32"
                    placeholder="Encrypted mission details (max 500 characters)"
                    maxLength={500}
                    required
                  />
                </div>
              </div>

              {/* Stage 3: Project Demo */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 3: Project Demo
                </h3>

                <div>
                  <label className="block text-squid-teal mb-2">
                    Battle Simulation Reel (Exactly 60s) *
                  </label>

                  <div className="relative border-2 border-dashed border-squid-red/50 rounded-lg p-6 bg-black/30 hover:bg-black/40 transition-colors">
                    <input
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={handleVideoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="video-upload"
                    />

                    <div className="text-center">
                      <label
                        htmlFor="video-upload"
                        className="squid-btn-outline cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>Upload Reel</span>
                        <svg
                          className="w-5 h-5 text-squid-red"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </label>

                      {videoFile && (
                        <div className="mt-4 text-sm">
                          <p className="text-squid-teal">
                            Selected: {videoFile.name}
                          </p>
                          <p className="text-squid-red/80 mt-1">
                            Duration: 60.00s (Verified)
                          </p>
                        </div>
                      )}

                      {videoError && (
                        <p className="text-squid-red mt-3 text-sm font-medium animate-pulse">
                          ⚠️ {videoError}
                        </p>
                      )}
                    </div>
                  </div>

                  <video
                    ref={videoRef}
                    src={videoFile ? URL.createObjectURL(videoFile) : ""}
                    className="hidden"
                    controls
                  />
                </div>
              </div>

              <button
                type="submit"
                className="squid-btn-primary w-full py-4 text-lg font-bold tracking-wider hover:bg-squid-red/90 transition-all"
              >
                INITIATE REGISTRATION PROTOCOL
              </button>
            </form>

            <p className="mt-8 text-center text-squid-teal/80 text-sm">
              By submitting, you agree to the{" "}
              <span className="text-squid-red cursor-pointer">
                Rules of Engagement
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
