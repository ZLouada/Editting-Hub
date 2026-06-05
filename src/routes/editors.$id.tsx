import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, MapPin, Check, Wrench, Images, FileText, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getEditor, type Editor } from "@/lib/editors";
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
  const { editor } = Route.useLoaderData();

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

        {/* Profile Card */}
        <div className="mt-6 rounded-2xl bg-card border border-border/40 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img src={editor.avatar} alt={editor.name} className="w-24 h-24 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{editor.name}</h1>
                  <p className="text-muted-foreground mt-1 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {editor.location}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#FDAA3E] text-[#FDAA3E]" />
                  <span className="font-semibold text-foreground">{editor.rating}</span>
                  <span className="text-sm text-muted-foreground">({editor.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-lg text-foreground mt-4">{editor.headline}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{editor.bio}</p>

              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <Link
                  to="/contact"
                  search={{ editor: editor.id } as any}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#fdb95e] transition-all active:scale-[0.97]"
                >
                  Contact about {editor.name.split(" ")[0]}
                </Link>
                <p className="text-sm text-muted-foreground">
                  From <span className="font-semibold text-foreground">${editor.hourlyRate}</span>/hr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
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
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm text-foreground border border-border/40"
              >
                <Check className="w-3.5 h-3.5 text-[#FDAA3E]" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Images */}
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
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Specialties & Software */}
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
      </div>

      <SiteFooter />
    </div>
  );
}
