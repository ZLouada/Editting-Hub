import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as resetPassword } from "./auth-VkYQ-S4H.mjs";
import { f as ShieldCheck, A as ArrowLeft, K as KeyRound, e as CircleCheck, g as ArrowRight, l as Mail } from "../_libs/lucide-react.mjs";
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
import "./router-DstwvJOU.mjs";
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
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Verification code sent to your email");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };
  const handleContinue = () => {
    navigate({
      to: "/reset-password",
      search: {
        email: email.trim()
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-[45%] relative overflow-hidden", style: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #1a0a2a 50%, #1a1a1a 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 30% 60%, rgba(253,170,62,0.12), transparent 60%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 70% 30%, rgba(253,170,62,0.06), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-52 h-52 rounded-full opacity-15", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        top: "25%",
        left: "25%",
        animation: "float-orb 9s ease-in-out infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-36 h-36 rounded-full opacity-10", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        bottom: "15%",
        right: "20%",
        animation: "float-orb 12s ease-in-out infinite reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[15%] w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center backdrop-blur-sm", style: {
        animation: "float-orb 7s ease-in-out infinite",
        transform: "rotate(12deg)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-[#FDAA3E]/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center px-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 32, height: 32, className: "w-8 h-8 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-white/90 tracking-tight", children: "Editing Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold text-white tracking-tight", style: {
          lineHeight: "1.1"
        }, children: [
          "Secure password",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "recovery" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mt-4 max-w-sm leading-relaxed", children: "We'll send a 6-digit verification code to your registered email address. Use it to verify your identity and set a new password." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-5", children: [{
          step: "1",
          text: "Enter your registered email"
        }, {
          step: "2",
          text: "Check your inbox for a 6-digit code"
        }, {
          step: "3",
          text: "Verify the code and set a new password"
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-[#FDAA3E]/10 border border-[#FDAA3E]/20 flex items-center justify-center text-sm font-bold text-[#FDAA3E] shrink-0", children: item.step }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/50", children: item.text })
        ] }, item.step)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]", style: {
        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[400px] w-full animate-fade-up-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 28, height: 28, className: "w-7 h-7 rounded-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-foreground tracking-tight", children: "Editing Hub" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
        "Back to sign in"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: sent ? "Check your email" : "Forgot your password?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: sent ? "We've sent a 6-digit verification code to your email" : "No worries, we'll send you a verification code" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7", children: sent ? (
        /* ── Code Sent State ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-[#FDAA3E]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Code sent to" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#FDAA3E] font-semibold mt-1", children: email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-xl bg-muted/50 border border-border/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Check your inbox (and spam folder) for an email from Editing Hub containing your 6-digit verification code." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleContinue, className: "mt-6 w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: [
            "Enter verification code",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setSent(false);
            setLoading(false);
          }, className: "mt-3 w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2", children: "Didn't receive it? Try again" })
        ] })
      ) : (
        /* ── Email Input State ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", id: "forgot-password-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "forgot-email", className: "text-sm font-medium text-foreground block mb-1.5", children: "Email address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "forgot-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, autoComplete: "email", autoFocus: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Enter the email associated with your account" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, id: "forgot-submit", className: "w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" }),
            "Sending code…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Send verification code",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] })
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Remember your password?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-[#FDAA3E] font-medium hover:underline", children: "Sign in" })
      ] })
    ] }) })
  ] });
}
export {
  ForgotPasswordPage as component
};
