import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/lib/auth";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [
      { title: "Reset password — Editing Hub" },
      { name: "description", content: "Reset your Editing Hub password. We'll send a verification code to your email." },
    ],
  }),
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Verification code sent to your email");
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate({
      to: "/reset-password",
      search: { email: email.trim() } as any,
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #1a0a2a 50%, #1a1a1a 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 60%, rgba(253,170,62,0.12), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 30%, rgba(253,170,62,0.06), transparent 50%)" }} />

        {/* Floating orbs */}
        <div
          className="absolute w-52 h-52 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #FDAA3E, transparent)",
            top: "25%",
            left: "25%",
            animation: "float-orb 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-36 h-36 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #FDAA3E, transparent)",
            bottom: "15%",
            right: "20%",
            animation: "float-orb 12s ease-in-out infinite reverse",
          }}
        />

        {/* Shield icon decoration */}
        <div className="absolute top-[20%] right-[15%] w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center backdrop-blur-sm" style={{ animation: "float-orb 7s ease-in-out infinite", transform: "rotate(12deg)" }}>
          <ShieldCheck className="w-8 h-8 text-[#FDAA3E]/40" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            Secure password<br />
            <span className="text-[#FDAA3E]">recovery</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            We'll send a 6-digit verification code to your registered email address. Use it to verify your identity and set a new password.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { step: "1", text: "Enter your registered email" },
              { step: "2", text: "Check your inbox for a 6-digit code" },
              { step: "3", text: "Verify the code and set a new password" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FDAA3E]/10 border border-[#FDAA3E]/20 flex items-center justify-center text-sm font-bold text-[#FDAA3E] shrink-0">
                  {item.step}
                </div>
                <span className="text-sm text-white/50">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid pattern */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-[400px] w-full animate-fade-up-blur">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={28} height={28} className="w-7 h-7 rounded-md" />
            <span className="text-xl font-semibold text-foreground tracking-tight">Editing Hub</span>
          </Link>

          {/* Back to login */}
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>

          {/* Form header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5">
              <KeyRound className="w-5 h-5 text-[#FDAA3E]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              {sent ? "Check your email" : "Forgot your password?"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {sent
                ? "We've sent a 6-digit verification code to your email"
                : "No worries, we'll send you a verification code"}
            </p>
          </div>

          {/* Form card */}
          <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7">
            {sent ? (
              /* ── Code Sent State ── */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-[#FDAA3E]" />
                </div>

                <p className="text-sm text-foreground font-medium">Code sent to</p>
                <p className="text-sm text-[#FDAA3E] font-semibold mt-1">{email}</p>

                <div className="mt-5 rounded-xl bg-muted/50 border border-border/40 p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Check your inbox (and spam folder) for an email from Editing Hub containing your 6-digit verification code.
                  </p>
                </div>

                <button
                  onClick={handleContinue}
                  className="mt-6 w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
                >
                  Enter verification code
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setSent(false); setLoading(false); }}
                  className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Didn't receive it? Try again
                </button>
              </div>
            ) : (
              /* ── Email Input State ── */
              <form onSubmit={handleSubmit} className="space-y-4" id="forgot-password-form">
                <div>
                  <label htmlFor="forgot-email" className="text-sm font-medium text-foreground block mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter the email associated with your account
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="forgot-submit"
                  className="w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                      Sending code…
                    </>
                  ) : (
                    <>
                      Send verification code
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Remember your password?{" "}
            <Link to="/login" className="text-[#FDAA3E] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
