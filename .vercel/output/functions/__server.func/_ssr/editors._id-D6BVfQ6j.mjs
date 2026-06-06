import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as Route, g as fetchEditor, d as supabase } from "./router-DstwvJOU.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-D0WvB9LN.mjs";
import { A as ArrowLeft, u as Check, q as MapPin, r as Star, H as Briefcase, G as Clock, I as Globe, W as Wrench, J as Images, N as MessageSquare, O as FileText, e as CircleCheck, s as Send } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-VkYQ-S4H.mjs";
function EditorProfilePage() {
  const {
    editor: loaderEditor
  } = Route.useLoaderData();
  const [editor, setEditor] = reactExports.useState(loaderEditor);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetchEditor(loaderEditor.id).then((liveEditor) => {
      if (!cancelled && liveEditor) setEditor(liveEditor);
    });
    return () => {
      cancelled = true;
    };
  }, [loaderEditor.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/[0.03] border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5 pt-8 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/editors", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        "Back to editors"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-card border border-border/40 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-32 sm:h-40 relative", style: {
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 50%, #1a1a1a 100%)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
            background: "radial-gradient(circle at 50% 100%, rgba(253,170,62,0.2), transparent 70%)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.04]", style: {
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 sm:px-8 pb-8 -mt-14 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-2xl overflow-hidden border-4 border-card shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editor.avatar, alt: editor.name, className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22c55e] border-2 border-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-4 sm:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-foreground tracking-tight", children: editor.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 inline-flex items-center gap-1.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                  editor.location
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-muted/60 rounded-xl px-3.5 py-2 border border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-[#FDAA3E] text-[#FDAA3E]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: editor.rating }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  "(",
                  editor.reviews,
                  " reviews)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground mt-3", children: editor.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl", children: editor.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4 text-[#FDAA3E]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "$",
                  editor.hourlyRate
                ] }),
                "/hr"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-[#FDAA3E]" }),
                "Usually responds in 24h"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-[#FDAA3E]" }),
                "Available worldwide"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", search: {
                editor: editor.id
              }, className: "inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/20", children: [
                "Contact ",
                editor.name.split(" ")[0]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#request-quote", className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all active:scale-[0.97]", children: "Request a quote" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4 text-[#FDAA3E]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-lg", children: "Skills" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: editor.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm text-foreground border border-border/40 hover:border-[#FDAA3E]/30 hover:bg-[#FDAA3E]/5 transition-all duration-200 cursor-default", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-[#FDAA3E]" }),
          skill
        ] }, skill)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "w-4 h-4 text-[#FDAA3E]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-lg", children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: editor.portfolioImages.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative aspect-[16/10] rounded-xl overflow-hidden border border-border/40 bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: `${editor.name} portfolio ${idx + 1}`, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-[#FDAA3E]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-lg", children: "Reviews" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-1.5 border border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-[#FDAA3E] text-[#FDAA3E]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: editor.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "· ",
              editor.reviews,
              " reviews"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: (editor.testimonials ?? []).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/30 p-5 hover:border-border/60 transition-colors duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.avatar, alt: r.author, className: "w-10 h-10 rounded-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: r.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.date })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({
              length: 5
            }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-3.5 h-3.5 ${i < r.rating ? "fill-[#FDAA3E] text-[#FDAA3E]" : "text-muted-foreground/30"}` }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 mt-3 leading-relaxed", children: [
            '"',
            r.comment,
            '"'
          ] })
        ] }, r.author)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border/40 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3", children: "Specialties" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: editor.specialties.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-[#FDAA3E]" }),
            " ",
            s
          ] }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border/40 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3", children: "Software" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: editor.software.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-[#FDAA3E]" }),
            " ",
            s
          ] }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RequestQuoteSection, { editor })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const quoteSchema = objectType({
  name: stringType().trim().min(1, "Name required").max(100),
  email: stringType().trim().email("Invalid email").max(255),
  budget: stringType().max(50).optional(),
  message: stringType().trim().min(10, "Tell us a bit more about your project").max(2e3)
});
function RequestQuoteSection({
  editor
}) {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    budget: "",
    message: `Hi ${editor.name.split(" ")[0]}, I'd love a quote for a project. `
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: `Quote request — ${editor.name}`,
      budget: parsed.data.budget || null,
      message: parsed.data.message
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Quote request sent!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8", id: "request-quote", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[#FDAA3E]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-lg", children: "Request a quote" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5 ml-10", children: [
      "Send ",
      editor.name.split(" ")[0],
      " a brief — we'll reply within 1 business day."
    ] }),
    done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/40 p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[#FDAA3E]/15 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-[#FDAA3E]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Quote request sent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "We'll get back to you at ",
        form.email,
        "."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 border border-border/40 px-4 py-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "For: " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: editor.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            "Your name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), required: true, maxLength: 100, className: "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            "Email ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), required: true, maxLength: 255, className: "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.budget, onChange: (e) => setForm({
          ...form,
          budget: e.target.value
        }), className: "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Under $500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$500 – $2,000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$2,000 – $10,000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$10,000+" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
          "Project brief ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }), required: true, rows: 5, maxLength: 2e3, className: "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none", placeholder: "Footage length, deadline, style references…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] disabled:opacity-50", children: submitting ? "Sending…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Request quote ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
      ] }) })
    ] })
  ] });
}
export {
  EditorProfilePage as component
};
