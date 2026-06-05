import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star, ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-editor.jpg";
import { EDITORS } from "@/lib/editors";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Editing Hub — Find the perfect video editor" },
      { name: "description", content: "Browse and hire vetted video editors for YouTube, short-form, documentary, motion graphics and more." },
      { property: "og:title", content: "Editing Hub — Find the perfect video editor" },
      { property: "og:description", content: "Browse and hire vetted video editors for any project." },
    ],
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Featured />
      <Why />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/editors", search: { q: q.trim() || undefined } as any });
  };

  return (
    <section className="relative pb-20 lg:pb-28" style={{ background: "#0a0a0a" }}>
      <img
        src={heroImg}
        alt="Video editor working on a laptop"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-right opacity-70 pointer-events-none select-none"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.92), rgba(10,10,10,0.55), rgba(10,10,10,0.15))" }} />
      <SiteHeader variant="dark" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-20 pb-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white" style={{ lineHeight: "1.05" }}>
            Find a video editor<br />who gets your vision
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-xl" style={{ textWrap: "pretty", lineHeight: "1.6" }}>
            Search hundreds of vetted editors across YouTube, short-form, documentary, motion graphics, weddings and more.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by style, software, location…"
                className="w-full rounded-xl bg-white pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FDAA3E]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="opacity-80">Popular:</span>
            {["YouTube", "Short-form", "Motion graphics", "Weddings", "Documentary"].map((t) => (
              <Link
                key={t}
                to="/editors"
                search={{ specialty: t } as any}
                className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const editors = EDITORS.slice(0, 6);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-2">Featured editors</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.15" }}>
              Trusted talent, ready to cut
            </h2>
          </div>
          <Link to="/editors" className="text-sm font-medium text-foreground hover:underline inline-flex items-center gap-1">
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {editors.map((e) => (
            <Link
              key={e.id}
              to="/editors/$id"
              params={{ id: e.id }}
              className="group rounded-2xl border border-black/[0.06] bg-card p-5 hover:shadow-lg hover:border-black/[0.1] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <img src={e.avatar} alt={e.name} className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.location}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 fill-[#FDAA3E] text-[#FDAA3E]" />
                  <span className="font-semibold text-foreground">{e.rating}</span>
                </div>
              </div>
              <p className="text-sm text-foreground mt-4">{e.headline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.specialties.slice(0, 3).map((s) => (
                  <span key={s} className="text-[11px] rounded-full bg-muted px-2 py-1 text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">${e.hourlyRate}<span className="text-muted-foreground font-normal">/hr</span></span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1">
                  View profile <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: ShieldCheck, title: "Vetted talent", desc: "Every editor reviewed for quality, reliability and communication." },
    { icon: Clock, title: "Fast turnarounds", desc: "Rush options for short-form and ongoing weekly collaborations." },
    { icon: Sparkles, title: "All styles covered", desc: "From cinematic brand films to TikTok edits and full documentaries." },
  ];
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-2">Why Editing Hub</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Built for creators and brands</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl bg-card border border-border/40 p-6">
              <div className="w-11 h-11 rounded-xl bg-[#FDAA3E]/15 flex items-center justify-center mb-4">
                <i.icon className="w-5 h-5 text-[#FDAA3E]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{i.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
          >
            Tell us about your project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
