import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, KeyRound, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { verifyPasswordOtp, updatePassword, resetPassword } from "@/lib/auth";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().optional(),
});

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reset password — Editing Hub" },
      { name: "description", content: "Enter your verification code and set a new password for your Editing Hub account." },
    ],
  }),
});

/* ── OTP Input Component ── */
function OtpInput({
  length = 6,
  value,
  onChange,
  disabled,
}: {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = useMemo(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  }, [value, length]);

  const focusIdx = useCallback(
    (i: number) => {
      if (i >= 0 && i < length) refs.current[i]?.focus();
    },
    [length]
  );

  const handleChange = (i: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = [...digits];
    arr[i] = char;
    const next = arr.join("");
    onChange(next);
    if (char && i < length - 1) focusIdx(i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      focusIdx(i - 1);
    }
    if (e.key === "ArrowLeft") focusIdx(i - 1);
    if (e.key === "ArrowRight") focusIdx(i + 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      focusIdx(Math.min(pasted.length, length - 1));
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          onFocus={(e) => e.target.select()}
          className={`w-11 h-13 sm:w-12 sm:h-14 rounded-xl border text-center text-lg sm:text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDAA3E] focus:border-transparent ${
            d
              ? "border-[#FDAA3E]/40 bg-[#FDAA3E]/5 text-foreground"
              : "border-input bg-background text-foreground"
          } disabled:opacity-40`}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Password Strength ── */
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
            style={{ backgroundColor: i < strength ? level.color : "var(--color-border)" }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: level.color }}>
        {level.label}
      </p>
    </div>
  );
}

/* ── Main Page ── */
type Step = "verify" | "reset" | "done";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [step, setStep] = useState<Step>("verify");
  const [email] = useState(search.email ?? "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }
    if (!email) {
      toast.error("Email is missing. Go back and enter your email.");
      return;
    }
    setLoading(true);
    try {
      await verifyPasswordOtp(email, otp);
      toast.success("Code verified!");
      setStep("reset");
    } catch (err: any) {
      toast.error(err.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(newPassword);
      toast.success("Password updated successfully!");
      setStep("done");
    } catch (err: any) {
      toast.error(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resendCooldown > 0) return;
    try {
      await resetPassword(email);
      toast.success("New code sent!");
      setResendCooldown(60);
    } catch (err: any) {
      toast.error(err.message || "Failed to resend");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a2a1a 50%, #1a1a1a 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 40% 50%, rgba(253,170,62,0.12), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 70%, rgba(253,170,62,0.06), transparent 50%)" }} />

        {/* Floating orbs */}
        <div className="absolute w-48 h-48 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", top: "30%", right: "15%", animation: "float-orb 10s ease-in-out infinite" }} />
        <div className="absolute w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", bottom: "20%", left: "20%", animation: "float-orb 8s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            {step === "done" ? (
              <>All set! <span className="text-[#FDAA3E]">✓</span></>
            ) : (
              <>Reset your<br /><span className="text-[#FDAA3E]">password</span></>
            )}
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            {step === "verify" && "Enter the 6-digit code we sent to your email to verify your identity."}
            {step === "reset" && "Almost there! Choose a strong new password for your account."}
            {step === "done" && "Your password has been updated. You can now sign in with your new password."}
          </p>

          {/* Progress indicator */}
          <div className="mt-10 flex items-center gap-3">
            {[
              { label: "Verify", active: step === "verify", done: step === "reset" || step === "done" },
              { label: "New password", active: step === "reset", done: step === "done" },
              { label: "Complete", active: step === "done", done: false },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                {i > 0 && <div className={`w-8 h-px ${s.done || s.active ? "bg-[#FDAA3E]/60" : "bg-white/10"}`} />}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    s.done ? "bg-[#FDAA3E] text-[#1a1a1a]" :
                    s.active ? "bg-[#FDAA3E]/20 border border-[#FDAA3E]/40 text-[#FDAA3E]" :
                    "bg-white/5 border border-white/10 text-white/30"
                  }`}>
                    {s.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-xs ${s.done || s.active ? "text-white/70" : "text-white/30"}`}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-[420px] w-full animate-fade-up-blur">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={28} height={28} className="w-7 h-7 rounded-md" />
            <span className="text-xl font-semibold text-foreground tracking-tight">Editing Hub</span>
          </Link>

          {step !== "done" && (
            <Link to="/forgot-password" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
          )}

          {/* ════════════ STEP 1: Verify OTP ════════════ */}
          {step === "verify" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5 text-[#FDAA3E]" />
                </div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Enter verification code</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                  We sent a 6-digit code to{" "}
                  {email ? <span className="text-foreground font-medium">{email}</span> : "your email"}
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7">
                <form onSubmit={handleVerify} className="space-y-6" id="verify-otp-form">
                  <OtpInput value={otp} onChange={setOtp} disabled={loading} />

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    id="verify-submit"
                    className="w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        Verify code
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-border/40 text-center">
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ════════════ STEP 2: New Password ════════════ */}
          {step === "reset" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5">
                  <KeyRound className="w-5 h-5 text-[#FDAA3E]" />
                </div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Set new password</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Choose a strong password for your account
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7">
                <form onSubmit={handleReset} className="space-y-4" id="reset-password-form">
                  <div>
                    <label htmlFor="new-password" className="text-sm font-medium text-foreground block mb-1.5">
                      New password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        required
                        minLength={6}
                        autoComplete="new-password"
                        autoFocus
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
                    <PasswordStrength password={newPassword} />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="text-sm font-medium text-foreground block mb-1.5">
                      Confirm password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`w-full rounded-xl border bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                          confirmPassword && confirmPassword !== newPassword
                            ? "border-red-400"
                            : confirmPassword && confirmPassword === newPassword
                              ? "border-green-400"
                              : "border-input"
                        }`}
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                    </div>
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-xs text-red-400 mt-1.5">Passwords don't match</p>
                    )}
                    {confirmPassword && confirmPassword === newPassword && (
                      <p className="text-xs text-green-500 mt-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
                    id="reset-submit"
                    className="w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                        Updating…
                      </>
                    ) : (
                      <>
                        Update password
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}

          {/* ════════════ STEP 3: Done ════════════ */}
          {step === "done" && (
            <>
              <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#FDAA3E]/10 flex items-center justify-center mx-auto mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#FDAA3E]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-[#FDAA3E]" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Password updated!</h1>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Your password has been successfully reset. You can now sign in with your new credentials.
                </p>

                <Link
                  to="/login"
                  className="mt-8 w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2"
                >
                  Sign in with new password
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
