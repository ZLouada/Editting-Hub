import { D as notFound } from "../_libs/tanstack__router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-BJEmxk-e.css";
const Route$8 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Editing Hub — Find the perfect video editor" },
      { name: "description", content: "Browse and hire vetted video editors for YouTube, short-form, documentary, motion graphics and more." },
      { name: "author", content: "Editing Hub" },
      { property: "og:title", content: "Editing Hub — Find the perfect video editor" },
      { property: "og:description", content: "Browse and hire vetted video editors for YouTube, short-form, documentary, motion graphics and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Editing Hub — Find the perfect video editor" },
      { name: "twitter:description", content: "Browse and hire vetted video editors for YouTube, short-form, documentary, motion graphics and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/542c2316-1b35-4b5a-9087-8b2e9fc636b6/id-preview-d88e6787--73846db5-041f-43bb-a607-a66abc1f8216.lovable.app-1780707694199.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/542c2316-1b35-4b5a-9087-8b2e9fc636b6/id-preview-d88e6787--73846db5-041f-43bb-a607-a66abc1f8216.lovable.app-1780707694199.png" }
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ],
    scripts: [
      {
        children: `
          (function() {
            var theme = localStorage.getItem('continuum_theme') || 'system';
            if (theme === 'system') {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            if (theme === 'dark') document.documentElement.classList.add('dark');
          })();
        `
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "pb-[env(safe-area-inset-bottom)]", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-page-enter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" })
  ] });
}
const $$splitComponentImporter$7 = () => import("./settings-BUOdjYIG.mjs");
const Route$7 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Editing Hub — Settings"
    }, {
      name: "description",
      content: "Customize your Editing Hub experience."
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./login-_w9yfa3U.mjs");
const Route$6 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./insights-B77Odt9c.mjs");
const Route$5 = createFileRoute("/insights")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Editing Hub — Insights"
    }, {
      name: "description",
      content: "View your habit streaks, completion rates, and 30-day history."
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./editors-DMwaAkMa.mjs");
const searchSchema$1 = objectType({
  q: stringType().optional(),
  specialty: stringType().optional()
});
const Route$4 = createFileRoute("/editors")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  validateSearch: searchSchema$1,
  head: () => ({
    meta: [{
      title: "Browse video editors — Editing Hub"
    }, {
      name: "description",
      content: "Search vetted video editors by style, software and budget."
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./contact-DFzupELH.mjs");
const searchSchema = objectType({
  editor: stringType().optional()
});
const Route$3 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Contact — Editing Hub"
    }, {
      name: "description",
      content: "Tell us about your video project and we'll match you with the right editor."
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./app-D00KTUFk.mjs");
const Route$2 = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Editing Hub — Your daily ritual"
    }, {
      name: "description",
      content: "Build lasting habits with Editing Hub. Simple streak tracking, beautiful progress visualization."
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./index-yqSJcqR-.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Editing Hub — Find the perfect video editor"
    }, {
      name: "description",
      content: "Browse and hire vetted video editors for YouTube, short-form, documentary, motion graphics and more."
    }, {
      property: "og:title",
      content: "Editing Hub — Find the perfect video editor"
    }, {
      property: "og:description",
      content: "Browse and hire vetted video editors for any project."
    }]
  })
});
const MOCK_REVIEWS = [
  {
    author: "Sarah Patel",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "2 weeks ago",
    comment: "Delivered a week early and the color grade is gorgeous. Will absolutely book again for our next campaign."
  },
  {
    author: "Marcus Chen",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "1 month ago",
    comment: "Communication was top-notch and the pacing of the final cut was exactly what we pitched. Worth every penny."
  },
  {
    author: "Olivia Reed",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 4,
    date: "2 months ago",
    comment: "Great eye for story. Needed one round of revisions on audio levels but the end result was excellent."
  },
  {
    author: "Diego Alvarez",
    avatar: "https://i.pravatar.cc/100?img=68",
    rating: 5,
    date: "3 months ago",
    comment: "Turned 12 hours of footage into a 90-second masterpiece. Our launch video crushed it on every channel."
  }
];
const EDITORS = [
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
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop"
    ]
  },
  {
    id: "emma-lindstrom",
    name: "Emma Lindström",
    avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg",
    headline: "Documentary & long-form editor",
    location: "Stockholm, SE",
    hourlyRate: 95,
    rating: 5,
    reviews: 48,
    specialties: ["Documentary", "Long-form", "Podcasts"],
    software: ["DaVinci Resolve", "Premiere Pro"],
    bio: "I shape interviews and B-roll into narratives that feel inevitable. Past clients include Netflix and the BBC.",
    skills: ["Archival Research", "Interview Pacing", "Narrative Structure", "Audio Restoration", "Color Matching", "Closed Captions"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop"
    ]
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
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop"
    ]
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
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&h=500&fit=crop"
    ]
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
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop"
    ]
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
      "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=500&fit=crop"
    ]
  }
];
function searchEditors(query, specialty) {
  const q = query.trim().toLowerCase();
  return EDITORS.filter((e) => {
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.headline.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.specialties.some((s) => s.toLowerCase().includes(q)) || e.software.some((s) => s.toLowerCase().includes(q));
    const matchS = !specialty || specialty === "All" || e.specialties.includes(specialty);
    return matchQ && matchS;
  });
}
const ALL_SPECIALTIES = [
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
  "Reels"
];
function getEditor(id) {
  const editor = EDITORS.find((e) => e.id === id);
  if (!editor) return void 0;
  return { ...editor, testimonials: editor.testimonials ?? MOCK_REVIEWS };
}
const $$splitErrorComponentImporter = () => import("./editors._id-BNWm9MAm.mjs");
const $$splitNotFoundComponentImporter = () => import("./editors._id-DH0bAVkh.mjs");
const $$splitComponentImporter = () => import("./editors._id-TwSmyNi2.mjs");
const Route = createFileRoute("/editors/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: ({
    params
  }) => {
    const editor = getEditor(params.id);
    if (!editor) throw notFound();
    return {
      editor
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: loaderData ? `${loaderData.editor.name} — Editing Hub` : "Editor — Editing Hub"
    }, {
      name: "description",
      content: loaderData?.editor.headline ?? "Video editor profile."
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const SettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const InsightsRoute = Route$5.update({
  id: "/insights",
  path: "/insights",
  getParentRoute: () => Route$8
});
const EditorsRoute = Route$4.update({
  id: "/editors",
  path: "/editors",
  getParentRoute: () => Route$8
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$8
});
const AppRoute = Route$2.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const EditorsIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => EditorsRoute
});
const EditorsRouteChildren = {
  EditorsIdRoute
};
const EditorsRouteWithChildren = EditorsRoute._addFileChildren(EditorsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute,
  ContactRoute,
  EditorsRoute: EditorsRouteWithChildren,
  InsightsRoute,
  LoginRoute,
  SettingsRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ALL_SPECIALTIES as A,
  EDITORS as E,
  Route$4 as R,
  Route$3 as a,
  Route as b,
  router as r,
  searchEditors as s
};
