import { supabase } from "@/integrations/supabase/client";

export type EditorReview = {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type Editor = {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  location: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  specialties: string[];
  software: string[];
  bio: string;
  showreel?: string;
  skills: string[];
  portfolioImages: string[];
  testimonials?: EditorReview[];
};

/* ── Map a Supabase row to our Editor type ── */
function mapRow(row: any): Editor {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    headline: row.headline,
    location: row.location,
    hourlyRate: Number(row.hourly_rate),
    rating: Number(row.rating),
    reviews: Number(row.review_count),
    specialties: row.specialties ?? [],
    software: row.software ?? [],
    bio: row.bio,
    showreel: row.showreel ?? undefined,
    skills: row.skills ?? [],
    portfolioImages: row.portfolio_images ?? [],
  };
}

function mapReview(row: any): EditorReview {
  return {
    author: row.author,
    avatar: row.avatar,
    rating: row.rating,
    date: row.date,
    comment: row.comment,
  };
}

/* ── Fetch all editors ── */
export async function fetchEditors(): Promise<Editor[]> {
  const { data, error } = await supabase
    .from("editors")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[editors] fetchEditors failed:", error.message);
    return FALLBACK_EDITORS;
  }
  if (!data || data.length === 0) return FALLBACK_EDITORS;
  return data.map(mapRow);
}

/* ── Search editors with optional query + specialty filter ── */
export async function searchEditorsFromDb(
  query: string,
  specialty?: string
): Promise<Editor[]> {
  // Fetch all then filter client-side (small dataset)
  const editors = await fetchEditors();
  const q = query.trim().toLowerCase();

  return editors.filter((e) => {
    const matchQ =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.headline.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.specialties.some((s) => s.toLowerCase().includes(q)) ||
      e.software.some((s) => s.toLowerCase().includes(q));
    const matchS = !specialty || specialty === "All" || e.specialties.includes(specialty);
    return matchQ && matchS;
  });
}

/* ── Fetch a single editor with reviews ── */
export async function fetchEditor(id: string): Promise<Editor | undefined> {
  const { data: editorRow, error } = await supabase
    .from("editors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !editorRow) {
    console.error("[editors] fetchEditor failed:", error?.message);
    // Try fallback
    const fallback = FALLBACK_EDITORS.find((e) => e.id === id);
    return fallback ? { ...fallback, testimonials: FALLBACK_REVIEWS } : undefined;
  }

  // Fetch reviews for this editor
  const { data: reviews } = await supabase
    .from("editor_reviews")
    .select("*")
    .eq("editor_id", id)
    .order("created_at", { ascending: false });

  const editor = mapRow(editorRow);
  editor.testimonials = reviews && reviews.length > 0
    ? reviews.map(mapReview)
    : FALLBACK_REVIEWS;

  return editor;
}

/* ── Static helpers (kept for backward compat) ── */

export const ALL_SPECIALTIES = [
  "All",
  "YouTube",
  "Short-form",
  "Brand films",
  "Documentary",
  "Long-form",
  "Motion graphics",
  "VFX",
  "Commercials",
  "Weddings",
  "Events",
  "Gaming",
  "TikTok",
  "Reels",
];

/**
 * Synchronous client-side search (uses fallback data).
 * Kept as a compatibility layer — prefer searchEditorsFromDb for live data.
 */
export function searchEditors(query: string, specialty?: string): Editor[] {
  const q = query.trim().toLowerCase();
  return FALLBACK_EDITORS.filter((e) => {
    const matchQ =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.headline.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.specialties.some((s) => s.toLowerCase().includes(q)) ||
      e.software.some((s) => s.toLowerCase().includes(q));
    const matchS = !specialty || specialty === "All" || e.specialties.includes(specialty);
    return matchQ && matchS;
  });
}

/**
 * Synchronous single-editor getter (uses fallback data).
 * Kept as a compatibility layer — prefer fetchEditor for live data.
 */
export function getEditor(id: string): Editor | undefined {
  const editor = FALLBACK_EDITORS.find((e) => e.id === id);
  if (!editor) return undefined;
  return { ...editor, testimonials: editor.testimonials ?? FALLBACK_REVIEWS };
}

/* ══════════════════════════════════════════════════════════
   Fallback data — used when Supabase is unreachable
   (SSR first render, offline, etc.)
   ══════════════════════════════════════════════════════════ */

const FALLBACK_REVIEWS: EditorReview[] = [
  {
    author: "Sarah Patel",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "2 weeks ago",
    comment: "Delivered a week early and the color grade is gorgeous. Will absolutely book again for our next campaign.",
  },
  {
    author: "Marcus Chen",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "1 month ago",
    comment: "Communication was top-notch and the pacing of the final cut was exactly what we pitched. Worth every penny.",
  },
  {
    author: "Olivia Reed",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 4,
    date: "2 months ago",
    comment: "Great eye for story. Needed one round of revisions on audio levels but the end result was excellent.",
  },
  {
    author: "Diego Alvarez",
    avatar: "https://i.pravatar.cc/100?img=68",
    rating: 5,
    date: "3 months ago",
    comment: "Turned 12 hours of footage into a 90-second masterpiece. Our launch video crushed it on every channel.",
  },
];

const FALLBACK_EDITORS: Editor[] = [
  {
    id: "daniel-cooper",
    name: "Daniel Cooper",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg",
    headline: "Cinematic short-form editor for brands",
    location: "Brooklyn, NY",
    hourlyRate: 85,
    rating: 4.9,
    reviews: 64,
    specialties: ["YouTube", "Short-form", "Brand films"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    bio: "10+ years editing for brands and creators. Specialised in story-driven cuts that hold attention from frame one.",
    skills: ["Color Grading", "Sound Design", "Motion Graphics", "Storyboarding", "Multi-cam Sync", "Subtitle Styling"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1535016120720-40c6874c3b13?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop",
    ],
  },
  {
    id: "emma-lindstrom",
    name: "Emma Lindström",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg",
    headline: "Documentary & long-form editor",
    location: "Stockholm, SE",
    hourlyRate: 95,
    rating: 5.0,
    reviews: 48,
    specialties: ["Documentary", "Long-form", "Podcasts"],
    software: ["DaVinci Resolve", "Premiere Pro"],
    bio: "I shape interviews and B-roll into narratives that feel inevitable. Past clients include Netflix and the BBC.",
    skills: ["Archival Research", "Interview Pacing", "Narrative Structure", "Audio Restoration", "Color Matching", "Closed Captions"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
    ],
  },
  {
    id: "ryan-mitchell",
    name: "Ryan Mitchell",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/6b77ccde-dbfd-4c23-8c9f-ce748683068a/avatar-16.jpg",
    headline: "Motion graphics & VFX specialist",
    location: "Los Angeles, CA",
    hourlyRate: 110,
    rating: 4.8,
    reviews: 91,
    specialties: ["Motion graphics", "VFX", "Commercials"],
    software: ["After Effects", "Cinema 4D", "Premiere Pro"],
    bio: "From kinetic type to complex composites. I bring polish to ads, music videos and tech keynotes.",
    skills: ["3D Animation", "Particle Effects", "Kinetic Typography", "Rotoscoping", "Green Screen Keying", "Logo Animation"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
    ],
  },
  {
    id: "mei-lin",
    name: "Mei Lin",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/b706d9a7-3a45-4fdd-ab47-c7023d4d0cfa/avatar-20.jpg",
    headline: "Wedding & event highlight films",
    location: "Singapore",
    hourlyRate: 65,
    rating: 4.9,
    reviews: 132,
    specialties: ["Weddings", "Events", "Highlight reels"],
    software: ["Final Cut Pro", "DaVinci Resolve"],
    bio: "Emotional, musical edits that families rewatch for years. 200+ weddings delivered.",
    skills: ["Emotional Pacing", "Music Sync", "Same-day Edit", "Drone Footage Integration", "Teaser Trailers", "DVD Authoring"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-969e09a2e79b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&h=500&fit=crop",
    ],
  },
  {
    id: "lucas-moreno",
    name: "Lucas Moreno",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg",
    headline: "Gaming & esports editor",
    location: "Madrid, ES",
    hourlyRate: 55,
    rating: 4.7,
    reviews: 210,
    specialties: ["Gaming", "Twitch highlights", "YouTube"],
    software: ["Premiere Pro", "After Effects"],
    bio: "Fast turnarounds for streamers and esports teams. Punchy cuts, clean overlays, on-brand thumbnails.",
    skills: ["Fast Pacing", "Overlay Design", "Thumbnail Design", "Stream Highlights", "Meme Editing", "Zoom Transitions"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop",
    ],
  },
  {
    id: "aisha-okafor",
    name: "Aisha Okafor",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg",
    headline: "Social-first vertical video editor",
    location: "London, UK",
    hourlyRate: 70,
    rating: 4.9,
    reviews: 178,
    specialties: ["TikTok", "Reels", "Short-form"],
    software: ["CapCut", "Premiere Pro", "After Effects"],
    bio: "I make scroll-stopping verticals with captions, sound design and pacing tuned to each platform.",
    skills: ["Hook Optimization", "Caption Animation", "Trend Sound Design", "Platform-native Formats", "A/B Testing Thumbnails", "Viral Pacing"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=500&fit=crop",
    ],
  },
];
