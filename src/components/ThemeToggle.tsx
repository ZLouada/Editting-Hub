import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "continuum_theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const effective =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.classList.toggle("dark", effective === "dark");
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, mounted]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const cycle = useCallback(() => {
    setThemeState((prev) => {
      const order: Theme[] = ["light", "dark", "system"];
      const idx = order.indexOf(prev);
      return order[(idx + 1) % order.length];
    });
  }, []);

  const effective =
    theme === "system"
      ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return { theme, effective, setTheme, cycle, mounted };
}

export function ThemeToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { theme, cycle } = useTheme();
  const onDark = variant === "dark";

  const icon =
    theme === "dark" ? (
      <Moon className="w-[18px] h-[18px]" />
    ) : theme === "light" ? (
      <Sun className="w-[18px] h-[18px]" />
    ) : (
      <Monitor className="w-[18px] h-[18px]" />
    );

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme}`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 active:scale-[0.93] ${
        onDark
          ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
          : "bg-muted text-foreground hover:bg-accent border border-border/60"
      }`}
    >
      {icon}
    </button>
  );
}
