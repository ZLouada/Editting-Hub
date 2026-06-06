import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { E as EDITORS } from "./router-DGhLPFWx.mjs";
import { a as SiteFooter, S as SiteHeader } from "./SiteHeader-Byg9xWyO.mjs";
import "../_libs/sonner.mjs";
import { k as Search, A as ArrowRight, m as Star, w as ShieldCheck, x as Clock, p as Sparkles, Q as Quote } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
const heroImg = "/assets/hero-editor-BY361OPo.jpg";
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Featured, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Why, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reviews, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = reactExports.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    navigate({
      to: "/editors",
      search: {
        q: q.trim() || void 0
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pb-20 lg:pb-28", style: {
    background: "#0a0a0a"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Video editor working on a laptop", width: 1920, height: 1080, className: "absolute inset-0 w-full h-full object-cover object-right opacity-70 pointer-events-none select-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      background: "linear-gradient(to right, rgba(10,10,10,0.92), rgba(10,10,10,0.55), rgba(10,10,10,0.15))"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, { variant: "dark" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-6xl mx-auto px-5 pt-20 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white", style: {
        lineHeight: "1.05"
      }, children: [
        "Find a video editor",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "who gets your vision"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-white/85 max-w-xl", style: {
        textWrap: "pretty",
        lineHeight: "1.6"
      }, children: "Search hundreds of vetted editors across YouTube, short-form, documentary, motion graphics, weddings and more." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-8 flex flex-col sm:flex-row gap-2 max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by style, software, location…", className: "w-full rounded-xl bg-white pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FDAA3E]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25", children: [
          "Search",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2 text-xs text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80", children: "Popular:" }),
        ["YouTube", "Short-form", "Motion graphics", "Weddings", "Documentary"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/editors", search: {
          specialty: t
        }, className: "rounded-full border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors", children: t }, t))
      ] })
    ] }) })
  ] });
}
function Featured() {
  const editors = EDITORS.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10 gap-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-2", children: "Featured editors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", style: {
          lineHeight: "1.15"
        }, children: "Trusted talent, ready to cut" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editors", className: "text-sm font-medium text-foreground hover:underline inline-flex items-center gap-1", children: [
        "Browse all ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: editors.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editors/$id", params: {
      id: e.id
    }, className: "group rounded-2xl border border-border/60 bg-card p-5 hover:shadow-lg hover:border-border transition-all duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.avatar, alt: e.name, className: "w-14 h-14 rounded-full object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: e.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: e.location })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-[#FDAA3E] text-[#FDAA3E]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: e.rating })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-4", children: e.headline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: e.specialties.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] rounded-full bg-muted px-2 py-1 text-muted-foreground", children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          "$",
          e.hourlyRate,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "/hr" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1", children: [
          "View profile ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
        ] })
      ] })
    ] }, e.id)) })
  ] }) });
}
function Why() {
  const items = [{
    icon: ShieldCheck,
    title: "Vetted talent",
    desc: "Every editor reviewed for quality, reliability and communication."
  }, {
    icon: Clock,
    title: "Fast turnarounds",
    desc: "Rush options for short-form and ongoing weekly collaborations."
  }, {
    icon: Sparkles,
    title: "All styles covered",
    desc: "From cinematic brand films to TikTok edits and full documentaries."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-2", children: "Why Editing Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", children: "Built for creators and brands" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border/40 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-[#FDAA3E]/15 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(i.icon, { className: "w-5 h-5 text-[#FDAA3E]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: i.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: i.desc })
    ] }, i.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-all duration-200 active:scale-[0.97]", children: [
      "Tell us about your project",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
    ] }) })
  ] }) });
}
const REVIEWS = [{
  id: "r1",
  name: "Sarah Jenkins",
  role: "YouTuber, 280K subs",
  avatar: "https://i.pravatar.cc/150?u=sarah",
  rating: 5,
  text: "I found an amazing editor through Editing Hub. Turnaround time dropped from 5 days to 2, and the quality actually went up.",
  editor: "Marcus L."
}, {
  id: "r2",
  name: "Derek Okafor",
  role: "Creative Director, Bloom Agency",
  avatar: "https://i.pravatar.cc/150?u=derek",
  rating: 5,
  text: "We needed a motion graphics specialist for a brand campaign. Within 48 hours we had three strong candidates and hired one.",
  editor: "Priya S."
}, {
  id: "r3",
  name: "Emily Rourke",
  role: "Wedding filmmaker",
  avatar: "https://i.pravatar.cc/150?u=emily",
  rating: 5,
  text: "The editor I hired understood the emotional tone I wanted instantly. My clients have noticed the difference in the final cuts.",
  editor: "Tomás V."
}, {
  id: "r4",
  name: "Jake Morrison",
  role: "Short-form creator",
  avatar: "https://i.pravatar.cc/150?u=jake",
  rating: 5,
  text: "Finally a place where I can filter by TikTok and Reels experience. Saved me hours of back-and-forth with generalist editors.",
  editor: "Lea K."
}, {
  id: "r5",
  name: "Nadia Patel",
  role: "Documentary producer",
  avatar: "https://i.pravatar.cc/150?u=nadia",
  rating: 5,
  text: "Our feature doc needed a senior editor with DaVinci Resolve experience. Editing Hub delivered exactly that.",
  editor: "Hugo B."
}, {
  id: "r6",
  name: "Chris Taylor",
  role: "E-commerce brand owner",
  avatar: "https://i.pravatar.cc/150?u=chris",
  rating: 4,
  text: "Great selection of editors with commercial experience. Pricing is transparent and communication has been smooth.",
  editor: "Ingrid M."
}];
function Reviews() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-2", children: "Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", children: "Loved by creators" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: REVIEWS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-card p-6 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.avatar, alt: r.name, className: "w-10 h-10 rounded-full object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: r.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5 mb-3", children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-3.5 h-3.5 ${i < r.rating ? "fill-[#FDAA3E] text-[#FDAA3E]" : "text-muted-foreground/30"}` }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute -top-1 -left-1 w-5 h-5 text-[#FDAA3E]/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed pl-4", children: r.text })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4 pt-3 border-t border-border/40", children: [
        "Hired ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.editor })
      ] })
    ] }, r.id)) })
  ] }) });
}
export {
  LandingPage as component
};
