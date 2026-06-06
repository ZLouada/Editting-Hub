import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, MapPin, Check, Wrench, Images, FileText, Send, CheckCircle2, MessageSquare, Globe, Clock, Briefcase, Play, ExternalLink, Calendar, Eye } from "lucide-react";
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

        {/* ── Recent Projects ── */}
        <RecentProjectsSection editorId={editor.id} />

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

/* ── Mock project data per editor ── */
type Project = {
  title: string;
  client: string;
  thumbnail: string;
  category: string;
  duration: string;
  views: string;
  date: string;
  description: string;
};

const MOCK_PROJECTS: Record<string, Project[]> = {
  "daniel-cooper": [
    { title: "Nike 'Move With Us' Campaign", client: "Nike", thumbnail: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=500&fit=crop", category: "Brand Film", duration: "2:30", views: "2.4M", date: "May 2026", description: "Full campaign edit including 1 hero film and 6 social cutdowns for the summer launch." },
    { title: "TechCrunch Startup Spotlight", client: "TechCrunch", thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop", category: "Short-form", duration: "1:15", views: "890K", date: "Apr 2026", description: "Fast-paced startup profile with kinetic type, b-roll sequencing, and sound design." },
    { title: "Ali Abdaal – Productivity Deep Dive", client: "Ali Abdaal", thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&fit=crop", category: "YouTube", duration: "18:42", views: "1.1M", date: "Mar 2026", description: "Full long-form edit with custom animations, chapter markers, and sponsor integrations." },
  ],
  "emma-lindstrom": [
    { title: "Into the Arctic – Nature Doc", client: "BBC Earth", thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop", category: "Documentary", duration: "52:00", views: "3.8M", date: "May 2026", description: "Full episode edit for a 6-part nature series. Managed 200+ hours of raw footage." },
    { title: "The Startup Diaries", client: "Netflix", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop", category: "Long-form", duration: "45:00", views: "5.2M", date: "Feb 2026", description: "Episodic docuseries following three founders. Narrative structure and interview pacing." },
    { title: "Voices Unheard – Podcast Film", client: "Spotify", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop", category: "Podcasts", duration: "32:00", views: "1.5M", date: "Jan 2026", description: "Visual podcast adaptation with archival footage, motion graphics overlays, and subtitles." },
  ],
  "ryan-mitchell": [
    { title: "Apple Vision Pro – Launch Teaser", client: "Apple", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop", category: "VFX", duration: "0:45", views: "12M", date: "May 2026", description: "3D product reveal with particle effects, glass reflections, and spatial audio design." },
    { title: "Dua Lipa – 'Electric' MV", client: "Warner Music", thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop", category: "Motion Graphics", duration: "3:48", views: "28M", date: "Mar 2026", description: "Full music video with kinetic typography, glitch effects, and color-driven transitions." },
    { title: "Google I/O Keynote Visuals", client: "Google", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop", category: "Commercials", duration: "1:30", views: "4.6M", date: "Feb 2026", description: "Animated infographics and stage visuals for the developer conference keynote." },
  ],
  "mei-lin": [
    { title: "Chen & Yuki – Bali Wedding", client: "Private", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop", category: "Wedding", duration: "8:20", views: "45K", date: "May 2026", description: "3-day destination wedding in Bali. Same-day edit teaser + full cinematic film." },
    { title: "Singapore Grand Prix Gala", client: "F1", thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&h=500&fit=crop", category: "Events", duration: "4:15", views: "320K", date: "Apr 2026", description: "High-energy event highlight reel with drone footage and multi-cam editing." },
    { title: "Tanaka Family Reunion", client: "Private", thumbnail: "https://images.unsplash.com/photo-1465495976277-969e09a2e79b?w=800&h=500&fit=crop", category: "Highlight Reel", duration: "5:00", views: "12K", date: "Mar 2026", description: "Emotional family highlight film with music sync, interviews, and archival photos." },
  ],
  "lucas-moreno": [
    { title: "Fnatic – Worlds Hype Film", client: "Fnatic", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop", category: "Gaming", duration: "2:00", views: "6.8M", date: "May 2026", description: "Esports team hype film with match highlights, slow-mo replays, and custom overlays." },
    { title: "Pokimane – Monthly Highlights", client: "Pokimane", thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop", category: "Twitch", duration: "12:30", views: "2.1M", date: "Apr 2026", description: "Stream highlights package with zoom transitions, meme edits, and chat reactions." },
    { title: "Valorant Champions Tour Recap", client: "Riot Games", thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop", category: "YouTube", duration: "8:45", views: "3.4M", date: "Mar 2026", description: "Tournament recap with picture-in-picture comms, match stats, and cinematic intros." },
  ],
  "aisha-okafor": [
    { title: "Glossier – TikTok Series", client: "Glossier", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop", category: "TikTok", duration: "0:30", views: "8.5M", date: "May 2026", description: "6-part TikTok series with trending sounds, dynamic captions, and hook-optimized pacing." },
    { title: "Gymshark Reels Campaign", client: "Gymshark", thumbnail: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800&h=500&fit=crop", category: "Reels", duration: "0:15", views: "4.2M", date: "Apr 2026", description: "15-second high-energy fitness Reels with beat-synced cuts and caption overlays." },
    { title: "Mr Beast – Shorts Package", client: "Mr Beast", thumbnail: "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=500&fit=crop", category: "Short-form", duration: "0:58", views: "18M", date: "Mar 2026", description: "Batch of 10 YouTube Shorts with A/B tested thumbnails, captions, and viral pacing." },
  ],
};

const DEFAULT_PROJECTS: Project[] = [
  { title: "Brand Launch Video", client: "Stealth Startup", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop", category: "Brand Film", duration: "2:00", views: "150K", date: "May 2026", description: "Full brand launch video with motion graphics, voiceover, and music licensing." },
  { title: "Product Demo Reel", client: "Tech Co", thumbnail: "https://images.unsplash.com/photo-1535016120720-40c6874c3b13?w=800&h=500&fit=crop", category: "Commercial", duration: "1:30", views: "85K", date: "Apr 2026", description: "Sleek product showcase with close-up shots, kinetic text, and ambient soundtrack." },
  { title: "Event Highlight Film", client: "Conference Inc", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop", category: "Events", duration: "3:45", views: "62K", date: "Mar 2026", description: "Multi-day conference condensed into a cinematic highlight reel with interviews." },
];

function RecentProjectsSection({ editorId }: { editorId: string }) {
  const projects = MOCK_PROJECTS[editorId] ?? DEFAULT_PROJECTS;

  return (
    <div className="mt-5 rounded-2xl bg-card border border-border/40 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FDAA3E]/15 flex items-center justify-center">
          <Play className="w-4 h-4 text-[#FDAA3E]" />
        </div>
        <h2 className="font-semibold text-foreground text-lg">Recent Projects</h2>
      </div>

      <div className="space-y-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group rounded-xl border border-border/40 bg-muted/20 overflow-hidden hover:border-[#FDAA3E]/30 hover:bg-muted/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-64 md:w-72 shrink-0 aspect-video sm:aspect-auto sm:h-auto">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#FDAA3E] flex items-center justify-center shadow-lg shadow-[#FDAA3E]/30">
                    <Play className="w-5 h-5 text-[#1a1a1a] ml-0.5" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {project.duration}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#FDAA3E] bg-[#FDAA3E]/10 px-2 py-0.5 rounded-md mb-2">
                        {project.category}
                      </span>
                      <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-[#FDAA3E] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">for {project.client}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-foreground/80 mt-2.5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    {project.views} views
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
