const activeTimers = /* @__PURE__ */ new Map();
function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}
function getNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}
async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  const result = await Notification.requestPermission();
  return result;
}
function scheduleReminder(habit) {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  if (!habit.reminderTime) return;
  cancelReminder(habit.id);
  const [hours, minutes] = habit.reminderTime.split(":").map(Number);
  const now = /* @__PURE__ */ new Date();
  const target = /* @__PURE__ */ new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) return;
  const ms = target.getTime() - now.getTime();
  const timer = setTimeout(() => {
    new Notification("Editing Hub reminder", {
      body: `Time to ${habit.name.toLowerCase()}`,
      icon: "/favicon.ico",
      tag: `habit-${habit.id}`
    });
    activeTimers.delete(habit.id);
  }, ms);
  activeTimers.set(habit.id, timer);
}
function cancelReminder(habitId) {
  const timer = activeTimers.get(habitId);
  if (timer) {
    clearTimeout(timer);
    activeTimers.delete(habitId);
  }
}
function rescheduleAllReminders(habits) {
  for (const [id] of activeTimers) {
    cancelReminder(id);
  }
  for (const habit of habits) {
    scheduleReminder(habit);
  }
}
export {
  rescheduleAllReminders as a,
  getNotificationPermission as g,
  isNotificationSupported as i,
  requestNotificationPermission as r,
  scheduleReminder as s
};
