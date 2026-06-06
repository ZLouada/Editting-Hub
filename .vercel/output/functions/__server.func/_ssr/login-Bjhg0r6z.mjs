import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as signInWithEmail } from "./auth-VkYQ-S4H.mjs";
import { a as LogIn, l as Mail, h as Lock, E as EyeOff, i as Eye, g as ArrowRight } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
      navigate({
        to: "/"
      });
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-[45%] relative overflow-hidden", style: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 50%, #1a1a1a 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 30% 50%, rgba(253,170,62,0.15), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(circle at 70% 80%, rgba(253,170,62,0.08), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-64 h-64 rounded-full opacity-20", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        top: "15%",
        left: "20%",
        animation: "float-orb 8s ease-in-out infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-48 h-48 rounded-full opacity-10", style: {
        background: "radial-gradient(circle, #FDAA3E, transparent)",
        bottom: "20%",
        right: "15%",
        animation: "float-orb 10s ease-in-out infinite reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center px-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Editing Hub", width: 32, height: 32, className: "w-8 h-8 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-white/90 tracking-tight", children: "Editing Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold text-white tracking-tight", style: {
          lineHeight: "1.1"
        }, children: [
          "Welcome back to",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "Editing Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mt-4 max-w-sm leading-relaxed", children: "Sign in to access your dashboard, manage your projects, and connect with top-tier video editors." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-4", children: [{
          label: "500+ vetted editors",
          icon: "✦"
        }, {
          label: "Trusted by leading brands",
          icon: "✦"
        }, {
          label: "24/7 project support",
          icon: "✦"
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-white/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E] text-xs", children: item.icon }),
          item.label
        ] }, item.label)) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FDAA3E]/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Sign in to your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Enter your email and password to continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/50 p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", id: "login-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "login-email", className: "text-sm font-medium text-foreground block mb-1.5", children: "Email address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "login-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, autoComplete: "email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "login-password", className: "text-sm font-medium text-foreground", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-xs text-[#FDAA3E] hover:underline", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "login-password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", className: "w-full rounded-xl border border-input bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200", required: true, minLength: 6, autoComplete: "current-password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, id: "login-submit", className: "w-full rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#FDAA3E]/20 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" }),
          "Signing in…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Sign in",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-[#FDAA3E] font-medium hover:underline", id: "go-to-register", children: "Create one" })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
