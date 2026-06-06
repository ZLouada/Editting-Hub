import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { v as verifyPasswordOtp, r as resetPassword, u as updatePassword } from "./auth-VkYQ-S4H.mjs";
import { R as Route$9 } from "./router-DstwvJOU.mjs";
import { e as CircleCheck, A as ArrowLeft, f as ShieldCheck, g as ArrowRight, R as RefreshCw, K as KeyRound, h as Lock, E as EyeOff, i as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
function OtpInput({
  length = 6,
  value,
  onChange,
  disabled
}) {
  const refs = reactExports.useRef([]);
  const digits = reactExports.useMemo(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  }, [value, length]);
  const focusIdx = reactExports.useCallback((i) => {
    if (i >= 0 && i < length) refs.current[i]?.focus();
  }, [length]);
  const handleChange = (i, char) => {
    if (!/^\d?$/.test(char)) return;
    const arr = [...digits];
    arr[i] = char;
    const next = arr.join("");
    onChange(next);
    if (char && i < length - 1) focusIdx(i + 1);
  };
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      focusIdx(i - 1);
    }
    if (e.key === "ArrowLeft") focusIdx(i - 1);
    if (e.key === "ArrowRight") focusIdx(i + 1);
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      focusIdx(Math.min(pasted.length, length - 1));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 sm:gap-3", children: digits.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: (el) => {
    refs.current[i] = el;
  }, type: "text", inputMode: "numeric", maxLength: 1, value: d, disabled, onChange: (e) => handleChange(i, e.target.value), onKeyDown: (e) => handleKeyDown(i, e), onPaste: i === 0 ? handlePaste : void 0, onFocus: (e) => e.target.select(), className: `w-11 h-13 sm:w-12 sm:h-14 rounded-xl border text-center text-lg sm:text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDAA3E] focus:border-transparent ${d ? "border-[#FDAA3E]/40 bg-[#FDAA3E]/5 text-foreground" : "border-input bg-background text-foreground"} disabled:opacity-40`, "aria-label": `Digit ${i + 1}` }, i)) });
}
function PasswordStrength({
  password
}) {
  const strength = reactExports.useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);
  if (!password) return null;
  const levels = [{
    label: "Very weak",
    color: "#ef4444"
  }, {
    label: "Weak",
    color: "#f97316"
  }, {
    label: "Fair",
    color: "#eab308"
  }, {
    label: "Good",
    color: "#22c55e"
  }, {
    label: "Strong",
    color: "#10b981"
  }];
  const level = levels[Math.min(strength, levels.length) - 1] || levels[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({
      length: 5
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 flex-1 rounded-full transition-all duration-300", style: {
      backgroundColor: i < strength ? level.color : "var(--color-border)"
    } }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: {
      color: level.color
    }, children: level.label })
  ] });
}
function ResetPasswordPage() {
  useNavigate();
  const search = Route$9.useSearch();
  const [step, setStep] = reactExports.useState("verify");
  const [email] = reactExports.useState(search.email ?? "");
  const [otp, setOtp] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [resendCooldown, setResendCooldown] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1e3);
    return () => clearTimeout(t);
  }, [resendCooldown]);
  const handleVerify = async (e) => {
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
    } catch (err) {
      toast.error(err.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = async (e) => {
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
    } catch (err) {
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
    } catch (err) {
      toast.error(err.message || "Failed to resend");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-[45%] relative overflow-hidden", style: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #0a2a1a 50%, #1a1a1a 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 40% 50%, rgba(253,170,62,0.12), transparent 60%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 70% 70%, rgba(253,170,62,0.06), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-48 h-48 rounded-full opacity-15", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        top: "30%",
        right: "15%",
        animation: "float-orb 10s ease-in-out infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-32 h-32 rounded-full opacity-10", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        bottom: "20%",
        left: "20%",
        animation: "float-orb 8s ease-in-out infinite reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center px-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 32, height: 32, className: "w-8 h-8 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-white/90 tracking-tight", children: "Editing Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold text-white tracking-tight", style: {
          lineHeight: "1.1"
        }, children: step === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "All set! ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "✓" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Reset your",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "password" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 mt-4 max-w-sm leading-relaxed", children: [
          step === "verify" && "Enter the 6-digit code we sent to your email to verify your identity.",
          step === "reset" && "Almost there! Choose a strong new password for your account.",
          step === "done" && "Your password has been updated. You can now sign in with your new password."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center gap-3", children: [{
          label: "Verify",
          active: step === "verify",
          done: step === "reset" || step === "done"
        }, {
          label: "New password",
          active: step === "reset",
          done: step === "done"
        }, {
          label: "Complete",
          active: step === "done",
          done: false
        }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-px ${s.done || s.active ? "bg-[#FDAA3E]/60" : "bg-white/10"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${s.done ? "bg-[#FDAA3E] text-[#1a1a1a]" : s.active ? "bg-[#FDAA3E]/20 border border-[#FDAA3E]/40 text-[#FDAA3E]" : "bg-white/5 border border-white/10 text-white/30"}`, children: s.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${s.done || s.active ? "text-white/70" : "text-white/30"}`, children: s.label })
          ] })
        ] }, s.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]", style: {
        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[420px] w-full animate-fade-up-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 28, height: 28, className: "w-7 h-7 rounded-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-foreground tracking-tight", children: "Editing Hub" })
      ] }),
      step !== "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forgot-password", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
        "Back"
      ] }),
      step === "verify" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Enter verification code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1.5", children: [
            "We sent a 6-digit code to",
            " ",
            email ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: email }) : "your email"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVerify, className: "space-y-6", id: "verify-otp-form", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OtpInput, { value: otp, onChange: setOtp, disabled: loading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || otp.length !== 6, id: "verify-submit", className: "w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" }),
              "Verifying…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Verify code",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border/40 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleResend, disabled: resendCooldown > 0, className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"
          ] }) })
        ] })
      ] }),
      step === "reset" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Set new password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Choose a strong password for your account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReset, className: "space-y-4", id: "reset-password-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "new-password", className: "text-sm font-medium text-foreground block mb-1.5", children: "New password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "new-password", type: showPassword ? "text" : "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "Min. 6 characters", className: "w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, minLength: 6, autoComplete: "new-password", autoFocus: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { password: newPassword })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "confirm-password", className: "text-sm font-medium text-foreground block mb-1.5", children: "Confirm password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "confirm-password", type: showPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Re-enter your password", className: `w-full rounded-xl border bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${confirmPassword && confirmPassword !== newPassword ? "border-red-400" : confirmPassword && confirmPassword === newPassword ? "border-green-400" : "border-input"}`, required: true, minLength: 6, autoComplete: "new-password" })
            ] }),
            confirmPassword && confirmPassword !== newPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1.5", children: "Passwords don't match" }),
            confirmPassword && confirmPassword === newPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-500 mt-1.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
              " Passwords match"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || newPassword.length < 6 || newPassword !== confirmPassword, id: "reset-submit", className: "w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" }),
            "Updating…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Update password",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] }) })
      ] }),
      step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-[#FDAA3E]/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#FDAA3E]/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-[#FDAA3E]" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Password updated!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xs mx-auto", children: "Your password has been successfully reset. You can now sign in with your new credentials." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "mt-8 w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: [
          "Sign in with new password",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  ResetPasswordPage as component
};
