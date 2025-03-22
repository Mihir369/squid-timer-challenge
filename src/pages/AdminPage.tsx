
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RegistrationData } from "@/services/registrationService";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const { toast } = useToast();

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "squidadmin") {
      setAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      
      toast({
        title: "Admin Access Granted",
        description: "You're now logged in as an admin",
        duration: 3000,
      });
    } else {
      setError("Invalid password");
    }
  };

  useEffect(() => {
    // Check if previously authenticated
    if (localStorage.getItem("adminAuth") === "true") {
      setAuthenticated(true);
    }

    if (authenticated) {
      const fetchRegistrations = async () => {
        try {
          const q = query(
            collection(db, "registrations"),
            orderBy("registrationTime", "desc")
          );
          const querySnapshot = await getDocs(q);
          
          const registrationsData: RegistrationData[] = [];
          querySnapshot.forEach((doc) => {
            registrationsData.push(doc.data() as RegistrationData);
          });
          
          setRegistrations(registrationsData);
        } catch (err) {
          console.error("Error fetching registrations:", err);
          setError("Failed to load registrations");
        } finally {
          setLoading(false);
        }
      };

      fetchRegistrations();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Header />
        <AnimatedBackground />
        
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pt-20 md:pt-24">
          <div className="glass-card p-8 w-full max-w-md border-2 border-squid-red/40 backdrop-blur-xl bg-black/40 shadow-[0_0_50px_rgba(234,56,76,0.2)]">
            <h2 className="text-2xl font-black text-squid-red text-center mb-6 font-archivo">
              ADMIN ACCESS
            </h2>
            
            <form onSubmit={authenticate} className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg border border-squid-teal/30 flex items-start mb-4">
                <Info className="h-5 w-5 text-squid-teal shrink-0 mt-0.5 mr-2" />
                <p className="text-sm text-squid-teal/90">
                  Use the password <span className="font-mono bg-black/40 px-2 py-0.5 rounded">squidadmin</span> to access the admin panel.
                </p>
              </div>
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border-2 border-squid-red/50 rounded-lg"
                placeholder="Enter admin password"
              />
              
              {error && (
                <p className="text-squid-red text-center">{error}</p>
              )}
              
              <button
                type="submit"
                className="squid-btn-primary w-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header />
      <AnimatedBackground />
      
      <div className="min-h-screen relative z-10 pt-24 pb-16 container mx-auto px-4">
        <div className="glass-card p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-squid-red font-archivo">
              REGISTRATIONS DASHBOARD
            </h2>
            <button 
              onClick={() => {
                localStorage.removeItem("adminAuth");
                setAuthenticated(false);
              }}
              className="squid-btn-outline text-sm"
            >
              Logout
            </button>
          </div>
          
          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-black/20 p-4 rounded-lg border border-squid-red/30">
                  <Skeleton className="h-6 w-3/4 mb-3 bg-gray-800" />
                  <Skeleton className="h-4 w-1/2 mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-1/3 bg-gray-800" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-squid-red p-8">
              <p className="text-xl mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="squid-btn-outline"
              >
                Try Again
              </button>
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center p-12">
              <p className="text-xl text-squid-teal mb-2">No Registrations Yet</p>
              <p className="text-squid-teal/60">When teams register, they'll appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {registrations.map((registration, index) => (
                <div key={index} className="bg-black/20 p-4 md:p-6 rounded-lg border border-squid-red/30 hover:border-squid-red/60 transition-all">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h3 className="text-xl font-bold text-squid-pink mb-2 md:mb-0">
                      {registration.teamName}
                    </h3>
                    <div className="text-sm text-squid-teal">
                      {registration.registrationTime?.toDate().toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-squid-teal mb-2">Project Details</p>
                      <p><span className="text-squid-red/70">Title:</span> {registration.projectTitle}</p>
                      <p><span className="text-squid-red/70">Category:</span> {registration.category}</p>
                      <div className="mt-3">
                        <p className="text-squid-red/70 mb-1">Abstract:</p>
                        <p className="text-sm bg-black/30 p-3 rounded-md max-h-24 overflow-y-auto">
                          {registration.abstract}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-squid-teal mb-2">Team Members</p>
                      <div className="space-y-3">
                        {registration.members.filter(m => m.name).map((member, idx) => (
                          <div key={idx} className="bg-black/30 p-2 rounded-md text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">{member.name}</span>
                              <span className="text-squid-red text-xs">
                                {member.role}
                              </span>
                            </div>
                            <div className="text-xs text-squid-teal/80 mt-1">
                              {member.email} • {member.mobile} • {member.year}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {registration.videoUrl && (
                    <div className="mt-4">
                      <a 
                        href={registration.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="squid-btn-outline text-sm inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        View Demo Video
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
