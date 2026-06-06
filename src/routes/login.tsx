import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
import { toast } from "sonner";
import { signInWithEmail } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Editing Hub" },
      { name: "description", content: "Sign in to your Editing Hub account to manage your profile and connect with creators." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 50%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(253,170,62,0.15), transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 80%, rgba(253,170,62,0.08), transparent 50%)" }} />
        
        {/* Floating orbs */}
        <div className="absolute w-64 h-64 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", top: "15%", left: "20%", animation: "float-orb 8s ease-in-out infinite" }} />
        <div className="absolute w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", bottom: "20%", right: "15%", animation: "float-orb 10s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            Welcome back to<br />
            <span className="text-[#FDAA3E]">Editing Hub</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            Sign in to access your dashboard, manage your projects, and connect with top-tier video editors.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { label: "500+ vetted editors", icon: "✦" },
              { label: "Trusted by leading brands", icon: "✦" },
              { label: "24/7 project support", icon: "✦" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm text-white/50">
                <span className="text-[#FDAA3E] text-xs">{item.icon}</span>
                {item.label}
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
              <LogIn className="w-5 h-5 text-[#FDAA3E]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Enter your email and password to continue
            </p>
          </div>

          {/* Form card */}
          <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7">
            <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
              <div>
                <label htmlFor="login-email" className="text-sm font-medium text-foreground block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-email"
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
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-[#FDAA3E] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    required
                    minLength={6}
                    autoComplete="current-password"
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
              </div>

              <button
                type="submit"
                disabled={loading}
                id="login-submit"
                className="w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#FDAA3E] font-medium hover:underline"
              id="go-to-register"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
