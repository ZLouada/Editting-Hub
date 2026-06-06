import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up/$")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a1f2a 50%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 40% 40%, rgba(253,170,62,0.12), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 70%, rgba(253,170,62,0.06), transparent 50%)" }} />
        
        {/* Floating orbs */}
        <div className="absolute w-56 h-56 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", top: "20%", right: "20%", animation: "float-orb 9s ease-in-out infinite" }} />
        <div className="absolute w-40 h-40 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDAA3E, transparent)", bottom: "25%", left: "15%", animation: "float-orb 11s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col justify-center px-14">
          <Link to="/" className="flex items-center gap-2.5 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Editing Hub" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="text-xl font-semibold text-white/90 tracking-tight">Editing Hub</span>
          </Link>

          <h2 className="text-4xl font-bold text-white tracking-tight" style={{ lineHeight: "1.1" }}>
            Join the world's<br />
            best <span className="text-[#FDAA3E]">editing</span><br />
            community
          </h2>
          <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
            Create your account to browse editors, request quotes, and build lasting creative partnerships.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { number: "500+", label: "Editors" },
              { number: "4.9", label: "Avg Rating" },
              { number: "10K+", label: "Projects" },
              { number: "24h", label: "Avg Response" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="text-xl font-bold text-[#FDAA3E]">{stat.number}</p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
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

          <SignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in" 
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
