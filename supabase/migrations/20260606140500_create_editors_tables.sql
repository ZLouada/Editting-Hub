-- ══════════════════════════════════════════════════════════
-- Migration: Create editors + editor_reviews tables with seed data
-- ══════════════════════════════════════════════════════════

-- ── Editors table ──
CREATE TABLE public.editors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '',
  headline TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  hourly_rate NUMERIC(10,2) NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  software TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL DEFAULT '',
  showreel TEXT,
  skills TEXT[] NOT NULL DEFAULT '{}',
  portfolio_images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Editor reviews table ──
CREATE TABLE public.editor_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  editor_id TEXT NOT NULL REFERENCES public.editors(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX idx_editors_specialties ON public.editors USING GIN (specialties);
CREATE INDEX idx_editor_reviews_editor_id ON public.editor_reviews(editor_id);

-- ── RLS (public read, admin write) ──
ALTER TABLE public.editors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editor_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (even anonymous) can read editors
CREATE POLICY "Anyone can view editors"
  ON public.editors FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can view reviews
CREATE POLICY "Anyone can view editor reviews"
  ON public.editor_reviews FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only service_role can write (for admin/seeding)
GRANT SELECT ON public.editors TO anon, authenticated;
GRANT ALL ON public.editors TO service_role;
GRANT SELECT ON public.editor_reviews TO anon, authenticated;
GRANT ALL ON public.editor_reviews TO service_role;

-- ══════════════════════════════════════════════════════════
-- Seed editors
-- ══════════════════════════════════════════════════════════

INSERT INTO public.editors (id, name, avatar, headline, location, hourly_rate, rating, review_count, specialties, software, bio, skills, portfolio_images) VALUES
(
  'daniel-cooper',
  'Daniel Cooper',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg',
  'Cinematic short-form editor for brands',
  'Brooklyn, NY',
  85,
  4.9,
  64,
  ARRAY['YouTube','Short-form','Brand films'],
  ARRAY['Premiere Pro','After Effects','DaVinci Resolve'],
  '10+ years editing for brands and creators. Specialised in story-driven cuts that hold attention from frame one.',
  ARRAY['Color Grading','Sound Design','Motion Graphics','Storyboarding','Multi-cam Sync','Subtitle Styling'],
  ARRAY['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1535016120720-40c6874c3b13?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop']
),
(
  'emma-lindstrom',
  'Emma Lindström',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg',
  'Documentary & long-form editor',
  'Stockholm, SE',
  95,
  5.0,
  48,
  ARRAY['Documentary','Long-form','Podcasts'],
  ARRAY['DaVinci Resolve','Premiere Pro'],
  'I shape interviews and B-roll into narratives that feel inevitable. Past clients include Netflix and the BBC.',
  ARRAY['Archival Research','Interview Pacing','Narrative Structure','Audio Restoration','Color Matching','Closed Captions'],
  ARRAY['https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop']
),
(
  'ryan-mitchell',
  'Ryan Mitchell',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/6b77ccde-dbfd-4c23-8c9f-ce748683068a/avatar-16.jpg',
  'Motion graphics & VFX specialist',
  'Los Angeles, CA',
  110,
  4.8,
  91,
  ARRAY['Motion graphics','VFX','Commercials'],
  ARRAY['After Effects','Cinema 4D','Premiere Pro'],
  'From kinetic type to complex composites. I bring polish to ads, music videos and tech keynotes.',
  ARRAY['3D Animation','Particle Effects','Kinetic Typography','Rotoscoping','Green Screen Keying','Logo Animation'],
  ARRAY['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop']
),
(
  'mei-lin',
  'Mei Lin',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/b706d9a7-3a45-4fdd-ab47-c7023d4d0cfa/avatar-20.jpg',
  'Wedding & event highlight films',
  'Singapore',
  65,
  4.9,
  132,
  ARRAY['Weddings','Events','Highlight reels'],
  ARRAY['Final Cut Pro','DaVinci Resolve'],
  'Emotional, musical edits that families rewatch for years. 200+ weddings delivered.',
  ARRAY['Emotional Pacing','Music Sync','Same-day Edit','Drone Footage Integration','Teaser Trailers','DVD Authoring'],
  ARRAY['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1465495976277-969e09a2e79b?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&h=500&fit=crop']
),
(
  'lucas-moreno',
  'Lucas Moreno',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg',
  'Gaming & esports editor',
  'Madrid, ES',
  55,
  4.7,
  210,
  ARRAY['Gaming','Twitch highlights','YouTube'],
  ARRAY['Premiere Pro','After Effects'],
  'Fast turnarounds for streamers and esports teams. Punchy cuts, clean overlays, on-brand thumbnails.',
  ARRAY['Fast Pacing','Overlay Design','Thumbnail Design','Stream Highlights','Meme Editing','Zoom Transitions'],
  ARRAY['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop']
),
(
  'aisha-okafor',
  'Aisha Okafor',
  'https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg',
  'Social-first vertical video editor',
  'London, UK',
  70,
  4.9,
  178,
  ARRAY['TikTok','Reels','Short-form'],
  ARRAY['CapCut','Premiere Pro','After Effects'],
  'I make scroll-stopping verticals with captions, sound design and pacing tuned to each platform.',
  ARRAY['Hook Optimization','Caption Animation','Trend Sound Design','Platform-native Formats','A/B Testing Thumbnails','Viral Pacing'],
  ARRAY['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=500&fit=crop']
);

-- ══════════════════════════════════════════════════════════
-- Seed reviews (linked to ALL editors)
-- ══════════════════════════════════════════════════════════

-- Insert reviews for each editor
DO $$
DECLARE
  editor_rec RECORD;
BEGIN
  FOR editor_rec IN SELECT id FROM public.editors LOOP
    INSERT INTO public.editor_reviews (editor_id, author, avatar, rating, date, comment) VALUES
      (editor_rec.id, 'Sarah Patel',   'https://i.pravatar.cc/100?img=47', 5, '2 weeks ago',  'Delivered a week early and the color grade is gorgeous. Will absolutely book again for our next campaign.'),
      (editor_rec.id, 'Marcus Chen',   'https://i.pravatar.cc/100?img=12', 5, '1 month ago',  'Communication was top-notch and the pacing of the final cut was exactly what we pitched. Worth every penny.'),
      (editor_rec.id, 'Olivia Reed',   'https://i.pravatar.cc/100?img=32', 4, '2 months ago', 'Great eye for story. Needed one round of revisions on audio levels but the end result was excellent.'),
      (editor_rec.id, 'Diego Alvarez', 'https://i.pravatar.cc/100?img=68', 5, '3 months ago', 'Turned 12 hours of footage into a 90-second masterpiece. Our launch video crushed it on every channel.');
  END LOOP;
END $$;
