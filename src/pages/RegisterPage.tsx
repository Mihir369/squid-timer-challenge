
// src/pages/RegisterPage.tsx
import { useState } from "react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";

const RegisterPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    teamName: "",
    projectTitle: "",
    category: "",
    abstract: "",
    members: [
      { name: "", email: "", mobile: "", role: "Leader", year: "" },
      { name: "", email: "", mobile: "", role: "Member", year: "" },
      { name: "", email: "", mobile: "", role: "Member", year: "" },
      { name: "", email: "", mobile: "", role: "Member", year: "" },
    ],
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const categories = [
    "Algorithm Mastery",
    "Cryptic Puzzles",
    "Survival Strategy",
    "Virtual Warfare",
    "AI Confrontation",
    "Data Decryption",
  ];

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, members: updatedMembers });
  };

  const validateVideo = (file: File) => {
    const validTypes = ["video/mp4", "video/x-m4v", "video/*"];
    if (!validTypes.includes(file.type)) {
      setVideoError("Invalid file type - only MP4/M4V allowed");
      return false;
    }
    return true;
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateVideo(file)) return;
    setVideoFile(file);
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

    if (!formData.members[0].year) {
      toast({
        title: "Missing Information",
        description: "Team leader's year of study is required",
        variant: "destructive",
      });
      return;
    }

    // Show success dialog instead of just a toast
    setShowSuccessDialog(true);
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Formation */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 1: Team Formation
                </h3>

                <input
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg"
                  placeholder="Team Name *"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.members.map((member, index) => (
                    <div
                      key={index}
                      className="bg-black/20 p-4 rounded-lg border border-squid-red/30"
                    >
                      <div className="text-squid-teal text-sm mb-2">
                        Member {index + 1} - {member.role}
                        {index === 0 && (
                          <span className="text-squid-red ml-2">*</span>
                        )}
                      </div>
                      <input
                        placeholder="Full Name *"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 bg-black/40 border border-squid-red/30 rounded-md"
                        required={index === 0}
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 bg-black/40 border border-squid-red/30 rounded-md"
                        required={index === 0}
                      />
                      <input
                        type="tel"
                        placeholder="Mobile (+91) *"
                        value={member.mobile}
                        onChange={(e) =>
                          handleMemberChange(index, "mobile", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 bg-black/40 border border-squid-red/30 rounded-md"
                        required={index === 0}
                      />
                      <Select
                        value={member.year}
                        onValueChange={(value) =>
                          handleMemberChange(index, "year", value)
                        }
                      >
                        <SelectTrigger className="bg-black/40 border border-squid-red/30">
                          <SelectValue placeholder="Year of Study *" />
                        </SelectTrigger>
                        <SelectContent className="bg-squid-dark border border-squid-red/30">
                          {yearOptions.map((year) => (
                            <SelectItem
                              key={year}
                              value={year}
                              className="hover:bg-squid-red/10"
                            >
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 2: Project Details
                </h3>

                <input
                  value={formData.projectTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, projectTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg"
                  placeholder="Project Title *"
                  required
                />

                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="bg-black/30 border-2 border-squid-red/50">
                    <SelectValue placeholder="Select Category *" />
                  </SelectTrigger>
                  <SelectContent className="bg-squid-dark border border-squid-red/30">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="hover:bg-squid-red/10"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <textarea
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg h-32"
                  placeholder="Project Abstract *"
                  required
                />
              </div>

              {/* Video Upload */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-squid-pink border-l-4 border-squid-red pl-3">
                  Stage 3: Video Upload
                </h3>

                <div className="border-2 border-dashed border-squid-red/50 rounded-lg p-6 bg-black/30 flex flex-col items-center">
                  <input
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="squid-btn-outline cursor-pointer inline-flex items-center gap-2 mb-4"
                  >
                    Upload Video *
                  </label>

                  {videoFile ? (
                    <div className="mt-2 flex flex-col items-center w-full">
                      <div className="w-16 h-16 bg-squid-red/20 rounded-full flex items-center justify-center mb-2 animate-pulse">
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-8 h-8 text-squid-red"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                      </div>
                      <p className="text-squid-teal text-center font-medium">
                        {videoFile.name}
                      </p>
                      <p className="text-xs text-squid-teal/70 mt-1">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-squid-teal/60 text-sm">
                      <p>Select your demo video file</p>
                      <p className="mt-1 text-xs">(MP4/M4V format)</p>
                    </div>
                  )}

                  {videoError && (
                    <p className="text-squid-red mt-3 text-sm font-medium animate-pulse">
                      ⚠️ {videoError}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="squid-btn-primary w-full py-4 text-lg font-bold hover:bg-squid-red/90"
              >
                SUBMIT REGISTRATION
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-black border-2 border-squid-red/40 backdrop-blur-xl shadow-[0_0_50px_rgba(234,56,76,0.3)] max-w-md">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-squid-red/20 to-squid-teal/20 flex items-center justify-center animate-pulse">
                <PartyPopper className="h-10 w-10 text-squid-red" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-black text-squid-red text-center">
              HURRAYY!!
            </DialogTitle>
            <DialogDescription className="text-center text-squid-teal font-medium">
              <p className="mb-4">Your registration is completed!</p>
              <div className="bg-black/30 p-4 rounded-lg border border-squid-red/20 mb-4">
                <p className="font-bold text-squid-pink mb-1">Team: {formData.teamName}</p>
                <p className="text-sm">Project: {formData.projectTitle}</p>
                <p className="text-sm">Category: {formData.category}</p>
              </div>
              <p className="text-sm">Get ready for the ultimate coding battle!</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterPage;
