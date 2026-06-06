import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/$")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 50%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(253,170,62,0.15), transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 80%, rgba(253,170,62,0.08), transparent 50%)" }} />
        
        {/* Floating orbs */}
        <div className="absolute w-64 h-64 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", top: "15%", left: "20%", animation: "float-orb 8s ease-in-out infinite" }} />
        <div className="absolute w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", bottom: "20%", right: "15%", animation: "float-orb 10s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            Welcome back to<br />
            <span className="text-[#FDAA3E]">Editing Hub</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            Sign in to access your dashboard, manage your projects, and connect with top-tier video editors.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { label: "500+ vetted editors", icon: "✦" },
              { label: "Trusted by leading brands", icon: "✦" },
              { label: "24/7 project support", icon: "✦" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm text-white/50">
                <span className="text-[#FDAA3E] text-xs">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px] animate-fade-up-blur flex flex-col items-center">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={28} height={28} className="w-7 h-7 rounded-md" />
            <span className="text-xl font-semibold text-foreground tracking-tight">Editing Hub</span>
          </Link>

          <SignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up" 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-xl shadow-black/[0.04] border border-border/50 rounded-2xl bg-card",
                headerTitle: "text-2xl font-bold text-foreground tracking-tight",
                headerSubtitle: "text-sm text-muted-foreground",
                socialButtonsBlockButton: "rounded-xl border border-input hover:bg-muted transition-all duration-200",
                formButtonPrimary: "rounded-xl bg-[#FDAA3E] text-[#1a1a1a] py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FDAA3E]/20",
                formFieldInput: "rounded-xl border-input bg-background py-2.5 focus:ring-2 focus:ring-[#FDAA3E] focus:border-transparent transition-all duration-200",
                footerActionLink: "text-[#FDAA3E] font-medium hover:underline",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
                formFieldLabel: "text-foreground font-medium",
                identityPreviewText: "text-foreground",
                identityPreviewEditButtonIcon: "text-[#FDAA3E]"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
