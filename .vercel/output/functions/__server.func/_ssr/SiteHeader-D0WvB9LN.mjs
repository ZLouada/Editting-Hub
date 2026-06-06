import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { o as onAuthStateChange, b as signOut, g as getSession, c as getUser } from "./auth-VkYQ-S4H.mjs";
import { k as User, L as LogOut, b as Monitor, M as Moon, S as Sun } from "../_libs/lucide-react.mjs";
const STORAGE_KEY = "continuum_theme";
function getInitialTheme() {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
}
function applyTheme(theme) {
  const root = document.documentElement;
  const effective = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
  root.classList.toggle("dark", effective === "dark");
}
function useTheme() {
  const [theme, setThemeState] = reactExports.useState("system");
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setThemeState(getInitialTheme());
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);
  reactExports.useEffect(() => {
    if (!mounted || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, mounted]);
  const setTheme = reactExports.useCallback((t) => setThemeState(t), []);
  const cycle = reactExports.useCallback(() => {
    setThemeState((prev) => {
      const order = ["light", "dark", "system"];
      const idx = order.indexOf(prev);
      return order[(idx + 1) % order.length];
    });
  }, []);
  const effective = theme === "system" ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
  return { theme, effective, setTheme, cycle, mounted };
}
function ThemeToggle({ variant = "light" }) {
  const { theme, cycle, mounted } = useTheme();
  const onDark = variant === "dark";
  const icon = !mounted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-[18px] h-[18px]" }) : theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-[18px] h-[18px]" }) : theme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-[18px] h-[18px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-[18px] h-[18px]" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: cycle,
      suppressHydrationWarning: true,
      title: mounted ? `Theme: ${theme}` : "Theme",
      className: `relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 active:scale-[0.93] ${onDark ? "bg-white/10 text-white hover:bg-white/20 border border-white/20" : "bg-muted text-foreground hover:bg-accent border border-border/60"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { suppressHydrationWarning: true, children: icon })
    }
  );
}
function useAuth() {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const currentSession = await getSession();
        if (!mounted) return;
        setSession(currentSession);
        if (currentSession) {
          const currentUser = await getUser();
          if (!mounted) return;
          setUser(currentUser);
        }
      } catch {
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    const subscription = onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);
  const logout = reactExports.useCallback(async () => {
    await signOut();
    setUser(null);
    setSession(null);
  }, []);
  return {
    user,
    session,
    loading,
    isAuthenticated: !!session,
    logout
  };
}
const logoUrl = "/logo.png";
function SiteHeader({ variant = "light" }) {
  const onDark = variant === "dark";
  const { user, isAuthenticated, loading, logout } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Account";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `relative z-20 max-w-6xl mx-auto px-5 h-16 flex items-center justify-between`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Editing Hub", width: 28, height: 28, className: "w-7 h-7 rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-lg font-semibold tracking-tight ${onDark ? "text-white/90" : "text-foreground"}`, children: "Editing Hub" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `hidden sm:flex items-center gap-7 text-sm ${onDark ? "text-white/80" : "text-muted-foreground"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/editors", className: "hover:opacity-80 transition-opacity", children: "Browse editors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:opacity-80 transition-opacity", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { variant }),
      !loading && isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `hidden sm:flex items-center gap-1.5 text-sm ${onDark ? "text-white/70" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center ${onDark ? "bg-white/10" : "bg-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[100px] truncate", children: displayName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: logout,
            className: `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${onDark ? "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10" : "border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted"}`,
            title: "Sign out",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign out" })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: `inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${onDark ? "border border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" : "border border-border bg-background text-foreground hover:bg-muted"}`,
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 active:scale-[0.97] bg-[#FDAA3E] text-[#1a1a1a] hover:bg-[#fdb95e] shadow-sm",
            children: "Sign up"
          }
        )
      ] })
    ] })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 py-10 mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Editing Hub", width: 20, height: 20, className: "w-5 h-5 rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Editing Hub" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/editors", className: "hover:text-foreground transition-colors", children: "Browse editors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground transition-colors", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Editing Hub"
    ] })
  ] }) });
}
export {
  SiteHeader as S,
  SiteFooter as a
};
