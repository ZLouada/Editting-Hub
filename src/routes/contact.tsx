import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

const searchSchema = z.object({
  editor: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact — Editing Hub" },
      { name: "description", content: "Tell us about your video project and we'll match you with the right editor." },
    ],
  }),
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.string().max(100).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function ContactPage() {
  const search = Route.useSearch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: search.editor ? `Hi, I'd like to work with ${search.editor.replace(/-/g, " ")}. ` : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: parsed.data.projectType || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Thanks! We'll be in touch.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-foreground/[0.03] border-b border-border/40">
        <SiteHeader />
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-10 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Tell us about your project</h1>
        <p className="text-muted-foreground mt-2">Share a few details and we'll get back to you within 1 business day.</p>

        {done ? (
          <div className="mt-10 rounded-2xl border border-border/40 bg-card p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FDAA3E]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#FDAA3E]" />
            </div>
            <p className="text-lg font-semibold">Message sent</p>
            <p className="text-sm text-muted-foreground mt-2">Thanks {form.name.split(" ")[0]} — we'll reply to {form.email} shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={100}
                  className="input"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                  className="input"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Project type">
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="input"
                >
                  <option value="">Select…</option>
                  <option>YouTube video</option>
                  <option>Short-form (TikTok / Reels)</option>
                  <option>Brand film / commercial</option>
                  <option>Documentary</option>
                  <option>Wedding / event</option>
                  <option>Motion graphics / VFX</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Budget">
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="input"
                >
                  <option value="">Select…</option>
                  <option>Under $500</option>
                  <option>$500 – $2,000</option>
                  <option>$2,000 – $10,000</option>
                  <option>$10,000+</option>
                </select>
              </Field>
            </div>

            <Field label="Tell us about your project" required>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={6}
                maxLength={2000}
                className="input resize-none"
                placeholder="Footage length, deadline, style references…"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] disabled:opacity-50"
            >
              {submitting ? "Sending…" : (<>Send message <Send className="w-4 h-4" /></>)}
            </button>
          </form>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-[#FDAA3E]">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
