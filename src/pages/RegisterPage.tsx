import React, { useState } from "react";
import { registerTeam, TeamMember } from "@/services/registrationService";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const RegisterPage = () => {
  const [teamName, setTeamName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [category, setCategory] = useState("");
  const [abstract, setAbstract] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", email: "", mobile: "", role: "", year: "" },
  ]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "", mobile: "", role: "", year: "" }]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const updateMember = (index: number, field: string, value: string) => {
    const newMembers = [...members];
    newMembers[index][field as keyof TeamMember] = value;
    setMembers(newMembers);
  };

  const handleVideoChange = (e: InputChangeEvent) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName || !projectTitle || !category || !abstract || members.some(member => !member.name || !member.email || !member.mobile || !member.role || !member.year) || !videoFile) {
      toast({
        title: "Error",
        description: "Please fill in all fields, including all team member details and video.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      await registerTeam(
        { teamName, projectTitle, category, abstract, members },
        videoFile,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      toast({
        title: "Success",
        description: "Team registered successfully!",
      });

      // Reset form
      setTeamName("");
      setProjectTitle("");
      setCategory("");
      setAbstract("");
      setMembers([{ name: "", email: "", mobile: "", role: "", year: "" }]);
      setVideoFile(null);
      const input = document.getElementById("videoFile") as HTMLInputElement;
      if (input) {
        input.value = "";
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pt-20 md:pt-24">
        <div className="glass-card p-6 md:p-8 w-full max-w-3xl border-2 border-squid-red/40 backdrop-blur-xl bg-black/40 shadow-[0_0_50px_rgba(234,56,76,0.2)]">
          <h2 className="text-2xl font-black text-squid-red text-center mb-6 font-archivo">
            TEAM REGISTRATION
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="teamName" className="text-squid-teal">
                Team Name
              </Label>
              <Input
                type="text"
                id="teamName"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="bg-black/30 border-2 border-squid-red/50"
              />
            </div>

            <div>
              <Label htmlFor="projectTitle" className="text-squid-teal">
                Project Title
              </Label>
              <Input
                type="text"
                id="projectTitle"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="bg-black/30 border-2 border-squid-red/50"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-squid-teal">
                Category
              </Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="bg-black/30 border-2 border-squid-red/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                  <SelectItem value="Game Development">Game Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="Blockchain">Blockchain</SelectItem>
                  <SelectItem value="Internet of Things (IoT)">Internet of Things (IoT)</SelectItem>
                  <SelectItem value="AR/VR">AR/VR</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="abstract" className="text-squid-teal">
                Abstract
              </Label>
              <Textarea
                id="abstract"
                placeholder="Enter project abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className="bg-black/30 border-2 border-squid-red/50 resize-none"
              />
            </div>

            <div>
              <Label className="text-squid-teal">Team Members</Label>
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <Label htmlFor={`name-${index}`} className="text-squid-teal text-sm">
                        Name
                      </Label>
                      <Input
                        type="text"
                        id={`name-${index}`}
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => updateMember(index, "name", e.target.value)}
                        className="bg-black/30 border-2 border-squid-red/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${index}`} className="text-squid-teal text-sm">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id={`email-${index}`}
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => updateMember(index, "email", e.target.value)}
                        className="bg-black/30 border-2 border-squid-red/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`mobile-${index}`} className="text-squid-teal text-sm">
                        Mobile
                      </Label>
                      <Input
                        type="tel"
                        id={`mobile-${index}`}
                        placeholder="Mobile"
                        value={member.mobile}
                        onChange={(e) => updateMember(index, "mobile", e.target.value)}
                        className="bg-black/30 border-2 border-squid-red/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${index}`} className="text-squid-teal text-sm">
                        Role
                      </Label>
                      <Input
                        type="text"
                        id={`role-${index}`}
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) => updateMember(index, "role", e.target.value)}
                        className="bg-black/30 border-2 border-squid-red/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`year-${index}`} className="text-squid-teal text-sm">
                        Year
                      </Label>
                      <Input
                        type="text"
                        id={`year-${index}`}
                        placeholder="Year"
                        value={member.year}
                        onChange={(e) => updateMember(index, "year", e.target.value)}
                        className="bg-black/30 border-2 border-squid-red/50"
                      />
                    </div>
                    {members.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(index)}
                        className="col-span-full md:col-span-1 w-full"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddMember}
                  className="w-full"
                >
                  Add Member
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="videoFile" className="text-squid-teal">
                Demo Video (mp4, max 100MB)
              </Label>
              <Input
                type="file"
                id="videoFile"
                accept="video/mp4"
                onChange={handleVideoChange}
                className="bg-black/30 file:border-0 file:bg-squid-red file:text-white file:font-bold file:h-10 hover:file:bg-squid-pink text-white border-2 border-squid-red/50"
              />
            </div>

            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-squid-teal text-sm">Uploading video...</p>
                  <span className="text-squid-pink font-medium">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress 
                  value={uploadProgress} 
                  className="h-2 bg-black/30 border border-squid-red/30"
                />
              </div>
            )}

            <Button
              type="submit"
              className="squid-btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register Team"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
