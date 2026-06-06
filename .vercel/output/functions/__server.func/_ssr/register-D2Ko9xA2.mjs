import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as signUpWithEmail } from "./auth-VkYQ-S4H.mjs";
import { j as UserPlus, k as User, l as Mail, h as Lock, E as EyeOff, i as Eye, g as ArrowRight } from "../_libs/lucide-react.mjs";
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
function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
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
      navigate({
        to: "/login"
      });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-[45%] relative overflow-hidden", style: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #0a1f2a 50%, #1a1a1a 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 40% 40%, rgba(253,170,62,0.12), transparent 60%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 80% 70%, rgba(253,170,62,0.06), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-56 h-56 rounded-full opacity-15", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        top: "20%",
        right: "20%",
        animation: "float-orb 9s ease-in-out infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-40 h-40 rounded-full opacity-10", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        bottom: "25%",
        left: "15%",
        animation: "float-orb 11s ease-in-out infinite reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center px-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 32, height: 32, className: "w-8 h-8 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-white/90 tracking-tight", children: "Editing Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold text-white tracking-tight", style: {
          lineHeight: "1.1"
        }, children: [
          "Join the world's",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "best ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "editing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "community"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mt-4 max-w-sm leading-relaxed", children: "Create your account to browse editors, request quotes, and build lasting creative partnerships." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-4", children: [{
          number: "500+",
          label: "Editors"
        }, {
          number: "4.9",
          label: "Avg Rating"
        }, {
          number: "10K+",
          label: "Projects"
        }, {
          number: "24h",
          label: "Avg Response"
        }].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[#FDAA3E]", children: stat.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mt-0.5", children: stat.label })
        ] }, stat.label)) })
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Set up your profile in under a minute" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", id: "register-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "register-name", className: "text-sm font-medium text-foreground block mb-1.5", children: "Full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "register-name", type: "text", value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "John Doe", className: "w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, autoComplete: "name" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "register-email", className: "text-sm font-medium text-foreground block mb-1.5", children: "Email address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "register-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, autoComplete: "email" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "register-password", className: "text-sm font-medium text-foreground block mb-1.5", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "register-password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Min. 6 characters", className: "w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, minLength: 6, autoComplete: "new-password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { password })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, id: "register-submit", className: "w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" }),
            "Creating account…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Create account",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-center mt-4 leading-relaxed", children: [
          "By creating an account, you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground hover:underline cursor-pointer", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground hover:underline cursor-pointer", children: "Privacy Policy" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-[#FDAA3E] font-medium hover:underline", id: "go-to-login", children: "Sign in" })
      ] })
    ] }) })
  ] });
}
export {
  RegisterPage as component
};
