import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { User } from "lucide-react";

const logoUrl = "/logo.png";

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const onDark = variant === "dark";

  return (
    <nav className={`relative z-20 max-w-6xl mx-auto px-5 h-16 flex items-center justify-between`}>
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Editing Hub" width={28} height={28} className="w-7 h-7 rounded-md" />
        <span className={`text-lg font-semibold tracking-tight ${onDark ? "text-white/90" : "text-foreground"}`}>
          Editing Hub
        </span>
      </Link>
      <div className={`hidden sm:flex items-center gap-7 text-sm ${onDark ? "text-white/80" : "text-muted-foreground"}`}>
        <Link to="/editors" className="hover:opacity-80 transition-opacity">Browse editors</Link>
        <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle variant={variant} />

        <Show when="signed-in">
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
          </div>
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
              onDark
                ? "border border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                : "border border-border bg-background text-foreground hover:bg-muted"
            }`}>
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 active:scale-[0.97] bg-[#FDAA3E] text-[#1a1a1a] hover:bg-[#fdb95e] shadow-sm">
              Sign up
            </button>
          </SignUpButton>
        </Show>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="Editing Hub" width={20} height={20} className="w-5 h-5 rounded-sm" />
          <span className="font-semibold text-foreground text-sm">Editing Hub</span>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/editors" className="hover:text-foreground transition-colors">Browse editors</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Editing Hub</p>
      </div>
    </footer>
  );
}
