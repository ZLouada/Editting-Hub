import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, MapPin, Check, Wrench, Images, FileText, Send, CheckCircle2, MessageSquare, Globe, Clock, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getEditor, fetchEditor, type Editor } from "@/lib/editors";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/editors/$id")({
  component: EditorProfilePage,
  loader: ({ params }) => {
    const editor = getEditor(params.id);
    if (!editor) throw notFound();
    return { editor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.editor.name} — Editing Hub` : "Editor — Editing Hub" },
      { name: "description", content: loaderData?.editor.headline ?? "Video editor profile." },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <p className="text-lg font-semibold">Editor not found</p>
        <Link to="/editors" className="text-sm text-muted-foreground hover:underline mt-2 inline-block">Back to all editors</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <p className="text-lg font-semibold">Something went wrong</p>
        <button onClick={reset} className="text-sm text-muted-foreground hover:underline mt-2">Try again</button>
      </div>
    </div>
  ),
});

function EditorProfilePage() {
  const { editor: loaderEditor } = Route.useLoaderData();
  const [editor, setEditor] = useState<Editor>(loaderEditor);

  // Hydrate with live Supabase data on the client
  useEffect(() => {
    let cancelled = false;
    fetchEditor(loaderEditor.id).then((liveEditor) => {
      if (!cancelled && liveEditor) setEditor(liveEditor);
    });
    return () => { cancelled = true; };
  }, [loaderEditor.id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-foreground/[0.03] border-b border-border/40">
        <SiteHeader />
      </div>

      <div className="max-w-5xl mx-auto px-5 pt-8 pb-16">
        <Link to="/editors" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to editors
        </Link>

        {/* ── Hero Profile Card ── */}
        <div className="mt-6 rounded-2xl bg-card border border-border/40 overflow-hidden">
          {/* Banner gradient */}
          <div className="h-32 sm:h-40 relative" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 50%, #1a1a1a 100%)" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 100%, rgba(253,170,62,0.2), transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }} />
          </div>

          <div className="px-6 sm:px-8 pb-8 -mt-14 relative z-10">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Profile picture */}
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-card shadow-xl">
                  <img src={editor.avatar} alt={editor.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22c55e] border-2 border-card flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0 pt-4 sm:pt-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{editor.name}</h1>
                    <p className="text-muted-foreground mt-1 inline-flex items-center gap-1.5 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {editor.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/60 rounded-xl px-3.5 py-2 border border-border/40">
                    <Star className="w-4 h-4 fill-[#FDAA3E] text-[#FDAA3E]" />
                    <span className="font-bold text-foreground">{editor.rating}</span>
                    <span className="text-sm text-muted-foreground">({editor.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-lg text-foreground mt-3">{editor.headline}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{editor.bio}</p>

                {/* Quick stats */}
                <div className="mt-5 flex items-center gap-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-[#FDAA3E]" />
                    <span className="font-semibold text-foreground">${editor.hourlyRate}</span>/hr
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-[#FDAA3E]" />
                    Usually responds in 24h
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 text-[#FDAA3E]" />
                    Available worldwide
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  <Link
                    to="/contact"
                    search={{ editor: editor.id } as any}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/20"
                  >
                    Contact {editor.name.split(" ")[0]}
                  </Link>
                  <a
                    href="#request-quote"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all active:scale-[0.97]"
                  >
                    Request a quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-[#FDAA3E]" />
            </div>
            <h2 className="font-semibold text-foreground text-lg">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {editor.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm text-foreground border border-border/40 hover:border-[#FDAA3E]/30 hover:bg-[#FDAA3E]/5 transition-all duration-200 cursor-default"
              >
                <Check className="w-3.5 h-3.5 text-[#FDAA3E]" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Portfolio Images ── */}
        <div className="mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center">
              <Images className="w-4 h-4 text-[#FDAA3E]" />
            </div>
            <h2 className="font-semibold text-foreground text-lg">Portfolio</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {editor.portfolioImages.map((url, idx) => (
              <div key={idx} className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-border/40 bg-muted">
                <img
                  src={url}
                  alt={`${editor.name} portfolio ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#FDAA3E]" />
              </div>
              <h2 className="font-semibold text-foreground text-lg">Reviews</h2>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-1.5 border border-border/40">
              <Star className="w-4 h-4 fill-[#FDAA3E] text-[#FDAA3E]" />
              <span className="font-semibold text-foreground">{editor.rating}</span>
              <span className="text-sm text-muted-foreground">· {editor.reviews} reviews</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {(editor.testimonials ?? []).map((r) => (
              <div key={r.author} className="rounded-xl border border-border/40 bg-muted/30 p-5 hover:border-border/60 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-sm truncate">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r.rating ? "fill-[#FDAA3E] text-[#FDAA3E]" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/90 mt-3 leading-relaxed">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Specialties & Software ── */}
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          <div className="rounded-2xl bg-card border border-border/40 p-6">
            <h2 className="font-semibold text-foreground mb-3">Specialties</h2>
            <ul className="space-y-2">
              {editor.specialties.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-[#FDAA3E]" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-card border border-border/40 p-6">
            <h2 className="font-semibold text-foreground mb-3">Software</h2>
            <ul className="space-y-2">
              {editor.software.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-[#FDAA3E]" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Request a Quote ── */}
        <RequestQuoteSection editor={editor} />
      </div>

      <SiteFooter />
    </div>
  );
}

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  budget: z.string().max(50).optional(),
  message: z.string().trim().min(10, "Tell us a bit more about your project").max(2000),
});

function RequestQuoteSection({ editor }: { editor: Editor }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: `Hi ${editor.name.split(" ")[0]}, I'd love a quote for a project. `,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: `Quote request — ${editor.name}`,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Quote request sent!");
  };

  return (
    <div className="mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8" id="request-quote">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#FDAA3E]" />
        </div>
        <h2 className="font-semibold text-foreground text-lg">Request a quote</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5 ml-10">
        Send {editor.name.split(" ")[0]} a brief — we'll reply within 1 business day.
      </p>

      {done ? (
        <div className="rounded-xl border border-border/40 bg-muted/40 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FDAA3E]/15 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-[#FDAA3E]" />
          </div>
          <p className="font-semibold text-foreground">Quote request sent</p>
          <p className="text-sm text-muted-foreground mt-1">We'll get back to you at {form.email}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl bg-muted/40 border border-border/40 px-4 py-3 text-sm">
            <span className="text-muted-foreground">For: </span>
            <span className="font-semibold text-foreground">{editor.name}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Your name <span className="text-[#FDAA3E]">*</span>
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={100}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Email <span className="text-[#FDAA3E]">*</span>
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                maxLength={255}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-foreground">Budget</span>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select…</option>
              <option>Under $500</option>
              <option>$500 – $2,000</option>
              <option>$2,000 – $10,000</option>
              <option>$10,000+</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-foreground">
              Project brief <span className="text-[#FDAA3E]">*</span>
            </span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              maxLength={2000}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Footage length, deadline, style references…"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97] disabled:opacity-50"
          >
            {submitting ? "Sending…" : (<>Request quote <Send className="w-4 h-4" /></>)}
          </button>
        </form>
      )}
    </div>
  );
}
