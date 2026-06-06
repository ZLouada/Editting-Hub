import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, h as isScheduledToday, s as saveHabits, i as isCompletedToday, e as getStreak, j as frequencyLabel, B as BottomNav, A as AddHabitSheet, g as getHabits, a as getLogs, H as HABIT_COLORS, t as todayKey, k as toggleHabit, b as saveLogs, F as FrequencyPicker, l as updateHabit, m as createHabit, n as getMilestoneMessage } from "./use-auth-ChIgYCQJ.mjs";
import { a as arrayMove, S as SortableContext, v as verticalListSortingStrategy, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as rescheduleAllReminders, s as scheduleReminder } from "./notifications-DpLRAFqO.mjs";
import { r as reorderHabitsInCloud, m as migrateLocalToCloud, f as fetchHabitsFromCloud, a as fetchLogsFromCloud, d as deleteHabitFromCloud, t as toggleLogInCloud, s as saveHabitToCloud, u as updateHabitInCloud } from "./habits-cloud-BxD8OpdQ.mjs";
import { c as useSensors, d as useSensor, D as DndContext, e as closestCenter, f as DragOverlay, T as TouchSensor, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { t as Sparkles, d as Leaf, u as Check, v as ChevronDown, P as Pencil, g as ArrowRight, X, B as Bell, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
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
import "../_libs/dnd-kit__accessibility.mjs";
function HabitCard({
  habit,
  logs,
  habits,
  index,
  onToggle,
  onDelete,
  onEdit
}) {
  const completed = isCompletedToday(habit.id, logs);
  const streak = getStreak(habit.id, logs, habits);
  const [pressing, setPressing] = reactExports.useState(false);
  const [showRipple, setShowRipple] = reactExports.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: habit.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 60}ms`
  };
  const handleToggle = () => {
    if (!completed) {
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
    onToggle(habit.id);
  };
  const showFrequencyBadge = habit.frequency.type !== "daily";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      ...attributes,
      className: `animate-fade-up-blur relative ${isDragging ? "opacity-30 z-0" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            ref: setActivatorNodeRef,
            ...listeners,
            className: "absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-8 flex flex-col items-center justify-center gap-[3px] cursor-grab active:cursor-grabbing opacity-30 hover:opacity-60 transition-opacity touch-none",
            "aria-label": "Reorder habit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-foreground/40" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `
          flex-1 relative overflow-hidden rounded-xl transition-all duration-300
          bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)]
          ${!completed ? "hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]" : ""}
          ${pressing ? "scale-[0.97]" : "scale-100"}
        `,
            onPointerDown: () => setPressing(true),
            onPointerUp: () => setPressing(false),
            onPointerLeave: () => setPressing(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-2.5 top-3 bottom-3 w-1 rounded-full",
                  style: { backgroundColor: habit.color }
                }
              ),
              showRipple && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-full",
                  style: {
                    backgroundColor: habit.color,
                    opacity: 0.3,
                    animation: "bloom-fill 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 p-4 pl-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleToggle,
                    className: `
              flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center
              transition-all duration-300 active:scale-90 outline-none focus:outline-none focus-visible:outline-none
              ${completed ? "border-transparent" : "border-border bg-background hover:border-primary/40"}
            `,
                    style: completed ? { backgroundColor: habit.color } : void 0,
                    "aria-label": `Mark ${habit.name} as ${completed ? "incomplete" : "complete"}`,
                    children: completed && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-white animate-bounce-check", strokeWidth: 2.5 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => onEdit(habit),
                    className: "flex-1 min-w-0 text-left",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-medium text-[15px] leading-snug transition-all duration-300 ${completed ? "line-through text-muted-foreground" : "text-foreground"}`, children: habit.name }),
                      habit.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: habit.description }),
                      showFrequencyBadge && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/60 mt-0.5", children: frequencyLabel(habit.frequency) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 text-right", children: streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-semibold text-foreground tabular-nums", children: streak }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "d" })
                ] }) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ProgressRing({ completed, total }) {
  const percentage = total === 0 ? 0 : completed / total * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - percentage / 100 * circumference;
  const allDone = total > 0 && completed === total;
  const [displayCount, setDisplayCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let frame;
    const duration = 600;
    const start = performance.now();
    const from = displayCount;
    const to = completed;
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [completed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-20 h-20 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 100 100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: "50",
          cy: "50",
          r: "45",
          fill: "none",
          stroke: "var(--color-border)",
          strokeWidth: "7",
          opacity: "0.3"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: "50",
          cy: "50",
          r: "45",
          fill: "none",
          stroke: "#FDAA3E",
          strokeWidth: "7",
          strokeLinecap: "round",
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          className: "animate-draw-ring",
          style: {
            transition: "stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold text-foreground tabular-nums leading-none", children: [
        displayCount,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground mt-0.5 font-medium tracking-wide uppercase", children: allDone ? "done" : "today" })
    ] })
  ] });
}
const COLOR_NAMES = {
  "oklch(0.38 0.08 160)": "Forest",
  "oklch(0.55 0.15 200)": "Ocean",
  "oklch(0.60 0.15 50)": "Amber",
  "oklch(0.50 0.15 320)": "Berry",
  "oklch(0.55 0.12 270)": "Lavender",
  "oklch(0.50 0.10 100)": "Olive"
};
const MAX_NAME = 40;
function EditHabitSheet({ habit, onClose, onSave, onDelete }) {
  reactExports.useEffect(() => {
    if (!habit) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [habit]);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [selectedColor, setSelectedColor] = reactExports.useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = reactExports.useState({ type: "daily" });
  const [reminderTime, setReminderTime] = reactExports.useState("");
  const [showReminder, setShowReminder] = reactExports.useState(false);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setSelectedColor(habit.color);
      setFrequency(habit.frequency);
      setReminderTime(habit.reminderTime || "");
      setShowReminder(!!habit.reminderTime);
      setConfirmDelete(false);
    }
  }, [habit]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit || !name.trim()) return;
    onSave({ ...habit, name: name.trim(), description: description.trim(), color: selectedColor, frequency, reminderTime: reminderTime || null });
    onClose();
  };
  if (!habit) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/40",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl border-t border-border p-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] animate-spring-up max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Edit habit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors active:scale-95",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] tabular-nums ${name.length >= MAX_NAME ? "text-destructive" : "text-muted-foreground"}`, children: [
              name.length,
              "/",
              MAX_NAME
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value.slice(0, MAX_NAME)),
              placeholder: "e.g. Morning walk",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200",
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground mb-1.5 block", children: "Description (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "A short note about this habit",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FrequencyPicker, { value: frequency, onChange: setFrequency }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground mb-2 block", children: "Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-center", children: HABIT_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedColor(c),
              className: `w-9 h-9 rounded-full transition-all duration-200 active:scale-90 ${selectedColor === c ? "ring-2 ring-offset-2 ring-offset-card ring-ring scale-110" : "hover:scale-105"}`,
              style: { backgroundColor: c },
              title: COLOR_NAMES[c] || c
            },
            c
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-2", children: COLOR_NAMES[selectedColor] || "Custom" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowReminder(!showReminder),
              className: "flex items-center gap-2 text-sm font-medium text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
                "Reminder",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "(optional)" })
              ]
            }
          ),
          showReminder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "time",
                value: reminderTime,
                onChange: (e) => setReminderTime(e.target.value),
                className: "rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              }
            ),
            reminderTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setReminderTime("");
                  setShowReminder(false);
                },
                className: "ml-2 text-xs text-muted-foreground hover:text-foreground",
                children: "Clear"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: !name.trim(),
            className: "w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
            children: "Save changes"
          }
        ),
        onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              if (!confirmDelete) {
                setConfirmDelete(true);
                return;
              }
              onDelete(habit.id);
              onClose();
            },
            className: `w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${confirmDelete ? "bg-destructive text-destructive-foreground" : "text-destructive hover:bg-destructive/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              confirmDelete ? "Tap again to confirm" : "Delete habit"
            ]
          }
        )
      ] })
    ] })
  ] });
}
const ONBOARDED_KEY = "continuum_onboarded";
function isOnboarded() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(ONBOARDED_KEY) === "true";
}
function setOnboarded() {
  localStorage.setItem(ONBOARDED_KEY, "true");
}
const SUGGESTED_HABITS = [
  { name: "Morning walk", description: "20 minutes of fresh air", color: HABIT_COLORS[0] },
  { name: "Read", description: "At least 10 pages", color: HABIT_COLORS[1] },
  { name: "Meditate", description: "5 minutes of stillness", color: HABIT_COLORS[4] },
  { name: "Drink water", description: "8 glasses throughout the day", color: HABIT_COLORS[2] }
];
function OnboardingFlow({ onComplete }) {
  const [step, setStep] = reactExports.useState(0);
  const [selectedHabit, setSelectedHabit] = reactExports.useState(null);
  const [customName, setCustomName] = reactExports.useState("");
  const handleFinish = () => {
    setOnboarded();
    if (selectedHabit !== null) {
      const h = SUGGESTED_HABITS[selectedHabit];
      onComplete(createHabit(h.name, h.description, h.color));
    } else if (customName.trim()) {
      onComplete(createHabit(customName.trim(), "", HABIT_COLORS[0]));
    } else {
      onComplete();
    }
  };
  const handleSkip = () => {
    setOnboarded();
    onComplete();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center mb-10", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-1 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/50" : "w-4 bg-border"}`
      },
      i
    )) }),
    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center animate-fade-up-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-9 h-9 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight", style: { lineHeight: "1.2" }, children: "Welcome to Editing Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 mx-auto max-w-[280px]", style: { textWrap: "pretty" }, children: "A calm space to build lasting habits. No noise, no pressure — just you and your daily ritual." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setStep(1),
          className: "mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.97]",
          children: [
            "Get started",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center animate-fade-up-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-accent/60 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight", style: { lineHeight: "1.2" }, children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4 text-left", children: [
        { emoji: "☑️", text: "Tap to mark habits complete each day" },
        { emoji: "🔥", text: "Build streaks with consecutive days" },
        { emoji: "📊", text: "Watch your progress grow over time" }
      ].map(({ emoji, text }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 rounded-xl bg-card p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]",
          style: { animationDelay: `${i * 100}ms` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: text })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setStep(2),
          className: "mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.97]",
          children: [
            "Create my first habit",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight text-center", style: { lineHeight: "1.2" }, children: "Pick a habit to start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 text-center", children: "Choose one or type your own" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2", children: SUGGESTED_HABITS.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setSelectedHabit(i);
            setCustomName("");
          },
          className: `w-full flex items-center gap-3 rounded-xl p-4 text-left transition-all duration-200 active:scale-[0.98] ${selectedHabit === i ? "bg-primary/10 ring-2 ring-primary" : "bg-card shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full flex-shrink-0", style: { backgroundColor: h.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: h.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.description })
            ] }),
            selectedHabit === i && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary flex-shrink-0" })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: customName,
          onChange: (e) => {
            setCustomName(e.target.value);
            setSelectedHabit(null);
          },
          placeholder: "Or type your own...",
          className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSkip,
            className: "flex-1 py-3.5 rounded-xl text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-all duration-200 active:scale-[0.97]",
            children: "Skip for now"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleFinish,
            disabled: selectedHabit === null && !customName.trim(),
            className: "flex-1 py-3.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
            children: "Let's go"
          }
        )
      ] })
    ] })
  ] }) });
}
function TodayPage() {
  const {
    user,
    isLoading: authLoading
  } = useAuth();
  useNavigate();
  const [habits, setHabits] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [editHabit, setEditHabit] = reactExports.useState(null);
  const [mounted, setMounted] = reactExports.useState(false);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5
    }
  }));
  const [showOnboarding, setShowOnboarding] = reactExports.useState(false);
  const [showNotScheduled, setShowNotScheduled] = reactExports.useState(false);
  const [activeId, setActiveId] = reactExports.useState(null);
  const isCloud = !!user;
  const reorderScheduledHabits = reactExports.useCallback((currentHabits, activeId2, overId) => {
    const scheduled = currentHabits.filter((h) => isScheduledToday(h));
    const activeIndex = scheduled.findIndex((h) => h.id === activeId2);
    const overIndex = scheduled.findIndex((h) => h.id === overId);
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
      return currentHabits;
    }
    const reorderedScheduled = arrayMove(scheduled, activeIndex, overIndex);
    let scheduledPointer = 0;
    return currentHabits.map((habit) => {
      if (!isScheduledToday(habit)) return habit;
      const nextHabit = reorderedScheduled[scheduledPointer];
      scheduledPointer += 1;
      return nextHabit;
    });
  }, []);
  reactExports.useEffect(() => {
    if (authLoading) return;
    const loadData = async () => {
      if (user) {
        try {
          await migrateLocalToCloud(user.id);
          const [h, l] = await Promise.all([fetchHabitsFromCloud(user.id), fetchLogsFromCloud(user.id)]);
          setHabits(h);
          setLogs(l);
          rescheduleAllReminders(h);
        } catch (err) {
          console.error("Failed to load from cloud:", err);
          const h = getHabits();
          setHabits(h);
          setLogs(getLogs());
          rescheduleAllReminders(h);
        }
      } else {
        const h = getHabits();
        setHabits(h);
        setLogs(getLogs());
        setShowOnboarding(!isOnboarded() && h.length === 0);
        rescheduleAllReminders(h);
      }
      setMounted(true);
    };
    loadData();
  }, [user, authLoading]);
  const handleToggle = async (habitId) => {
    const streakBefore = getStreak(habitId, logs, habits);
    const today = todayKey();
    const exists = isCompletedToday(habitId, logs);
    const updated = toggleHabit(habitId, logs);
    setLogs(updated);
    if (isCloud && user) {
      try {
        await toggleLogInCloud(habitId, today, user.id, exists);
      } catch (err) {
        console.error("Cloud toggle failed:", err);
      }
    } else {
      saveLogs(updated);
    }
    const streakAfter = getStreak(habitId, updated, habits);
    if (streakAfter > streakBefore) {
      const msg = getMilestoneMessage(streakAfter);
      if (msg) {
        const habit = habits.find((h) => h.id === habitId);
        toast.success(msg, {
          description: habit?.name
        });
      }
    }
  };
  const handleAdd = async (habit) => {
    const updated = [...habits, habit];
    setHabits(updated);
    scheduleReminder(habit);
    if (isCloud && user) {
      try {
        await saveHabitToCloud(habit, user.id, updated.length - 1);
      } catch (err) {
        console.error("Cloud save failed:", err);
      }
    } else {
      saveHabits(updated);
    }
  };
  const handleEdit = async (updatedHabit) => {
    const newHabits = updateHabit(habits, updatedHabit);
    setHabits(newHabits);
    scheduleReminder(updatedHabit);
    if (isCloud) {
      try {
        await updateHabitInCloud(updatedHabit);
      } catch (err) {
        console.error("Cloud update failed:", err);
      }
    } else {
      saveHabits(newHabits);
    }
  };
  const handleDelete = async (habitId) => {
    const updated = habits.filter((h) => h.id !== habitId);
    setHabits(updated);
    if (isCloud) {
      try {
        await deleteHabitFromCloud(habitId);
      } catch (err) {
        console.error("Cloud delete failed:", err);
      }
    } else {
      saveHabits(updated);
    }
    toast("Habit removed");
  };
  const handleDragStart = reactExports.useCallback((event) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragOver = reactExports.useCallback((event) => {
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    setHabits((currentHabits) => reorderScheduledHabits(currentHabits, String(active.id), String(over.id)));
  }, [reorderScheduledHabits]);
  const handleDragEnd = reactExports.useCallback(async (event) => {
    setActiveId(null);
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    const reordered = reorderScheduledHabits(habits, String(active.id), String(over.id));
    if (reordered === habits) return;
    if (isCloud) {
      try {
        await reorderHabitsInCloud(reordered);
      } catch (err) {
        console.error("Cloud reorder failed:", err);
      }
    } else {
      saveHabits(reordered);
    }
  }, [habits, isCloud, reorderScheduledHabits]);
  const handleOnboardingComplete = (habit) => {
    setShowOnboarding(false);
    if (habit) {
      handleAdd(habit);
    }
  };
  const scheduledToday = habits.filter((h) => isScheduledToday(h));
  const notScheduledToday = habits.filter((h) => !isScheduledToday(h));
  const completedCount = scheduledToday.filter((h) => isCompletedToday(h.id, logs)).length;
  const allDone = scheduledToday.length > 0 && completedCount === scheduledToday.length;
  if (!mounted || authLoading) return null;
  if (showOnboarding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingFlow, { onComplete: handleOnboardingComplete });
  }
  const now = /* @__PURE__ */ new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const subtitle = scheduledToday.length === 0 && habits.length > 0 ? "Nothing scheduled today" : scheduledToday.length === 0 ? "" : allDone ? "All done for today ✨" : `${completedCount} of ${scheduledToday.length} done`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-28 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between animate-fade-up-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground font-medium", children: greeting }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground mt-0.5 tracking-tight", style: {
            lineHeight: "1.2"
          }, children: allDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            "Perfect day",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" })
          ] }) : "Your daily ritual" }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            dateStr,
            " · ",
            subtitle
          ] }),
          !subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: dateStr })
        ] }),
        scheduledToday.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { completed: completedCount, total: scheduledToday.length }) })
      ] }),
      habits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-muted-foreground/20 rounded-2xl py-16 px-6 text-center animate-fade-up-blur mt-6", style: {
        animationDelay: "160ms"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-7 h-7 text-muted-foreground/40 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "A fresh start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-[240px] mx-auto", style: {
          textWrap: "pretty"
        }, children: "Tap the + button below to add your first habit" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DndContext, { sensors, collisionDetection: closestCenter, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, onDragCancel: () => setActiveId(null), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: scheduledToday.map((h) => h.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-6", children: scheduledToday.map((habit, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HabitCard, { habit, logs, habits, index: i, onToggle: handleToggle, onDelete: handleDelete, onEdit: (h) => setEditHabit(h) }, habit.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DragOverlay, { dropAnimation: null, children: activeId ? (() => {
            const habit = scheduledToday.find((h) => h.id === activeId);
            if (!habit) return null;
            scheduledToday.indexOf(habit);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", style: {
              width: "100%"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg bg-card shadow-[0_8px_24px_rgba(0,0,0,0.15)] cursor-grabbing", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 top-3 bottom-3 w-1 rounded-full", style: {
                backgroundColor: habit.color
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 pl-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${isCompletedToday(habit.id, logs) ? "border-transparent" : "border-border bg-background"}`, style: isCompletedToday(habit.id, logs) ? {
                  backgroundColor: habit.color
                } : void 0, children: isCompletedToday(habit.id, logs) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-white", strokeWidth: 2.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-medium text-[15px] leading-snug ${isCompletedToday(habit.id, logs) ? "line-through text-muted-foreground" : "text-foreground"}`, children: habit.name }),
                  habit.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: habit.description })
                ] }),
                getStreak(habit.id, logs, habits) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-semibold text-foreground tabular-nums", children: getStreak(habit.id, logs, habits) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "d" })
                ] })
              ] })
            ] }) });
          })() : null })
        ] }),
        notScheduledToday.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowNotScheduled(!showNotScheduled), className: "flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-2 hover:text-foreground transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-3.5 h-3.5 transition-transform duration-200 ${showNotScheduled ? "rotate-0" : "-rotate-90"}` }),
            "Not scheduled today (",
            notScheduledToday.length,
            ")"
          ] }),
          showNotScheduled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 opacity-60", children: notScheduledToday.map((habit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditHabit(habit), className: "flex items-center gap-3 rounded-xl bg-card/50 px-4 py-3 w-full text-left hover:bg-card/80 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: {
              backgroundColor: habit.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: habit.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/60", children: frequencyLabel(habit.frequency) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5 text-muted-foreground/40" })
          ] }, habit.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: handleAdd }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditHabitSheet, { habit: editHabit, onClose: () => setEditHabit(null), onSave: handleEdit, onDelete: handleDelete })
  ] });
}
export {
  TodayPage as component
};
