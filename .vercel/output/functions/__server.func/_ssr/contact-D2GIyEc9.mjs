import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as Route$3, d as supabase } from "./router-DstwvJOU.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-D0WvB9LN.mjs";
import { e as CircleCheck, s as Send } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
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
const formSchema = objectType({
  name: stringType().trim().min(1, "Name required").max(100),
  email: stringType().trim().email("Invalid email").max(255),
  projectType: stringType().max(100).optional(),
  budget: stringType().max(50).optional(),
  message: stringType().trim().min(10, "Tell us a bit more").max(2e3)
});
function ContactPage() {
  const search = Route$3.useSearch();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: search.editor ? `Hi, I'd like to work with ${search.editor.replace(/-/g, " ")}. ` : ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
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
      project_type: parsed.data.projectType || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Thanks! We'll be in touch.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/[0.03] border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-5 pt-10 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", children: "Tell us about your project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Share a few details and we'll get back to you within 1 business day." }),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-border/40 bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#FDAA3E]/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-[#FDAA3E]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "Message sent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
          "Thanks ",
          form.name.split(" ")[0],
          " — we'll reply to ",
          form.email,
          " shortly."
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), required: true, maxLength: 100, className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), required: true, maxLength: 255, className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.projectType, onChange: (e) => setForm({
            ...form,
            projectType: e.target.value
          }), className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "YouTube video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Short-form (TikTok / Reels)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Brand film / commercial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Documentary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Wedding / event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Motion graphics / VFX" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Budget", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.budget, onChange: (e) => setForm({
            ...form,
            budget: e.target.value
          }), className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Under $500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$500 – $2,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$2,000 – $10,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "$10,000+" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tell us about your project", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }), required: true, rows: 6, maxLength: 2e3, className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none", placeholder: "Footage length, deadline, style references…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] disabled:opacity-50", children: submitting ? "Sending…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Send message ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FDAA3E]", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
export {
  ContactPage as component
};
