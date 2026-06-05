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
};

export const EDITORS: Editor[] = [
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
  },
];

export function searchEditors(query: string, specialty?: string): Editor[] {
  const q = query.trim().toLowerCase();
  return EDITORS.filter((e) => {
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

export function getEditor(id: string): Editor | undefined {
  return EDITORS.find((e) => e.id === id);
}
