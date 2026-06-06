import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, User } from "lucide-react";
import { toast } from "sonner";
import { signUpWithEmail } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Create account — Editing Hub" },
      { name: "description", content: "Create your Editing Hub account to discover and hire top video editors." },
    ],
  }),
});

function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  if (!password) return null;

  const levels = [
    { label: "Very weak", color: "#ef4444" },
    { label: "Weak", color: "#f97316" },
    { label: "Fair", color: "#eab308" },
    { label: "Good", color: "#22c55e" },
    { label: "Strong", color: "#10b981" },
  ];

  const level = levels[Math.min(strength, levels.length) - 1] || levels[0];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < strength ? level.color : "var(--color-border)",
            }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: level.color }}>
        {level.label}
      </p>
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    try {
      await signUpWithEmail(email, password, fullName);
      toast.success("Account created! Check your email to confirm.");
      navigate({ to: "/login" });
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a1f2a 50%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 40% 40%, rgba(253,170,62,0.12), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 70%, rgba(253,170,62,0.06), transparent 50%)" }} />
        
        {/* Floating orbs */}
        <div className="absolute w-56 h-56 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", top: "20%", right: "20%", animation: "float-orb 9s ease-in-out infinite" }} />
        <div className="absolute w-40 h-40 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", bottom: "25%", left: "15%", animation: "float-orb 11s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            Join the world's<br />
            best <span className="text-[#FDAA3E]">editing</span><br />
            community
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            Create your account to browse editors, request quotes, and build lasting creative partnerships.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { number: "500+", label: "Editors" },
              { number: "4.9", label: "Avg Rating" },
              { number: "10K+", label: "Projects" },
              { number: "24h", label: "Avg Response" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="text-xl font-bold text-[#FDAA3E]">{stat.number}</p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-[400px] w-full animate-fade-up-blur">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={28} height={28} className="w-7 h-7 rounded-md" />
            <span className="text-xl font-semibold text-foreground tracking-tight">Editing Hub</span>
          </Link>

          {/* Form header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5">
              <UserPlus className="w-5 h-5 text-[#FDAA3E]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Set up your profile in under a minute
            </p>
          </div>

          {/* Form card */}
          <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7">
            <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
              <div>
                <label htmlFor="register-name" className="text-sm font-medium text-foreground block mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="register-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-email" className="text-sm font-medium text-foreground block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-password" className="text-sm font-medium text-foreground block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="register-submit"
                className="w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-foreground hover:underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-foreground hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#FDAA3E] font-medium hover:underline"
              id="go-to-login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
