import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as BottomNav, A as AddHabitSheet, g as getHabits, a as getLogs, s as saveHabits, b as saveLogs } from "./use-auth-CFU6Wtsn.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getNotificationPermission, i as isNotificationSupported, r as requestNotificationPermission, a as rescheduleAllReminders } from "./notifications-DpLRAFqO.mjs";
import { L as LogOut, a as LogIn, C as ChevronRight, S as Sun, M as Moon, b as Monitor, B as Bell, c as BellOff, D as Download, U as Upload, T as Trash2, d as Leaf } from "../_libs/lucide-react.mjs";
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
const THEME_KEY = "continuum_theme";
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}
function useTheme() {
  const [theme, setThemeState] = reactExports.useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(THEME_KEY) || "light";
  });
  const setTheme = reactExports.useCallback((t) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);
  reactExports.useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);
  const resolved = theme === "system" ? getSystemTheme() : theme;
  return { theme, resolved, setTheme };
}
function SettingsPage() {
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [notifPermission, setNotifPermission] = reactExports.useState(getNotificationPermission());
  const handleExport = () => {
    const data = {
      habits: getHabits(),
      logs: getLogs(),
      exportedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `editing-hub-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result);
        if (data.habits && Array.isArray(data.habits)) {
          saveHabits(data.habits);
        }
        if (data.logs && Array.isArray(data.logs)) {
          saveLogs(data.logs);
        }
        toast.success("Data imported successfully");
      } catch {
        toast.error("Invalid backup file");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleClear = async () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    saveHabits([]);
    saveLogs([]);
    if (user) {
      try {
        const {
          supabase
        } = await import("./client-CL9j1hH8.mjs");
        await supabase.from("habit_logs").delete().eq("user_id", user.id);
        await supabase.from("habits").delete().eq("user_id", user.id);
      } catch (err) {
        console.error("Failed to clear cloud data:", err);
        toast.error("Failed to clear cloud data");
        setConfirmClear(false);
        return;
      }
    }
    setConfirmClear(false);
    toast.success("All data cleared");
  };
  const handleAdd = (habit) => {
    const updated = [...getHabits(), habit];
    saveHabits(updated);
  };
  const handleNotificationToggle = async () => {
    if (notifPermission === "granted") {
      toast("To disable notifications, use your browser settings");
      return;
    }
    const result = await requestNotificationPermission();
    setNotifPermission(result);
    if (result === "granted") {
      toast.success("Notifications enabled");
      rescheduleAllReminders(getHabits());
    } else if (result === "denied") {
      toast.error("Notifications blocked by browser");
    }
  };
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/login"
    });
    toast.success("Signed out");
  };
  const themeOptions = [{
    value: "light",
    icon: Sun,
    label: "Light"
  }, {
    value: "dark",
    icon: Moon,
    label: "Dark"
  }, {
    value: "system",
    icon: Monitor,
    label: "Auto"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground font-medium", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground mt-0.5 tracking-tight", style: {
          lineHeight: "1.2"
        }, children: "Settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "40ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Syncing to cloud" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors active:scale-95", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
              "Sign out"
            ] })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
            to: "/login"
          }), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Sync your habits across devices" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "60ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] p-1.5 flex gap-1", children: themeOptions.map(({
            value,
            icon: Icon,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTheme(value), className: `flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.97] ${theme === value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 transition-transform duration-300 ${theme === value ? "rotate-0" : ""}` }),
            label
          ] }, value)) })
        ] }),
        isNotificationSupported() && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "90ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleNotificationToggle, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            notifPermission === "granted" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: notifPermission === "granted" ? "Notifications enabled" : "Enable notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: notifPermission === "granted" ? "Reminders will fire at scheduled times" : notifPermission === "denied" ? "Blocked — update in browser settings" : "Get reminded to complete your habits" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-6 rounded-full transition-colors ${notifPermission === "granted" ? "bg-primary" : "bg-muted"} flex items-center px-0.5`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifPermission === "granted" ? "translate-x-4" : "translate-x-0"}` }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "120ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] divide-y divide-border/50 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExport, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Export data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Download your habits as JSON" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Import data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Restore from a JSON backup" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: ".json", className: "hidden", onChange: handleImport }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleClear, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-destructive/5 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: confirmClear ? "Tap again to confirm" : "Clear all data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: confirmClear ? "This cannot be undone" : "Remove all habits and logs" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "180ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Editing Hub" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Version 1.0.0 · Built with care" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: handleAdd })
  ] });
}
export {
  SettingsPage as component
};
