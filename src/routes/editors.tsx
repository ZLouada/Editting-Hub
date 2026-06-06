import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Star, MapPin, ArrowRight } from "lucide-react";
import { ALL_SPECIALTIES, searchEditors, searchEditorsFromDb, type Editor } from "@/lib/editors";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().optional(),
  specialty: z.string().optional(),
});

export const Route = createFileRoute("/editors")({
  component: EditorsPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse video editors — Editing Hub" },
      { name: "description", content: "Search vetted video editors by style, software and budget." },
    ],
  }),
});

function EditorsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [specialty, setSpecialty] = useState(search.specialty ?? "All");

  // Start with synchronous fallback data for instant render
  const fallbackResults = useMemo(() => searchEditors(q, specialty), [q, specialty]);
  const [results, setResults] = useState<Editor[]>(fallbackResults);
  const [loaded, setLoaded] = useState(false);

  // Then hydrate from Supabase
  useEffect(() => {
    let cancelled = false;
    searchEditorsFromDb(q, specialty).then((data) => {
      if (!cancelled) {
        setResults(data);
        setLoaded(true);
      }
    });
    return () => { cancelled = true; };
  }, [q, specialty]);

  // Also update results from fallback when query changes (before DB responds)
  useEffect(() => {
    if (!loaded) {
      setResults(searchEditors(q, specialty));
    }
  }, [q, specialty, loaded]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-foreground/[0.03] border-b border-border/40">
        <SiteHeader />
      </div>

      <section className="max-w-6xl mx-auto px-5 pt-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Browse editors</h1>
        <p className="text-muted-foreground mt-2">Search by name, style, software or location.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => { setQ(e.target.value); setLoaded(false); }}
              placeholder="Search editors…"
              className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={specialty}
            onChange={(e) => { setSpecialty(e.target.value); setLoaded(false); }}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {ALL_SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          {results.length} editor{results.length === 1 ? "" : "s"} found
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 mt-6 pb-16">
        {results.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-2xl py-16 text-center">
            <p className="text-foreground font-semibold">No editors match your search</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different keyword or specialty.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((e) => (
              <Link
                key={e.id}
                to="/editors/$id"
                params={{ id: e.id }}
                className="group rounded-2xl border border-border/60 bg-card p-5 hover:shadow-lg hover:border-border transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <img src={e.avatar} alt={e.name} className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{e.name}</p>
                    <p className="text-xs text-muted-foreground truncate inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {e.location}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-[#FDAA3E] text-[#FDAA3E]" />
                    <span className="font-semibold text-foreground">{e.rating}</span>
                    <span className="text-muted-foreground text-xs">({e.reviews})</span>
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
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
