import { d as supabase } from "./router-DstwvJOU.mjs";
async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });
  if (error) throw error;
  return data;
}
async function signUpWithEmail(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { full_name: fullName.trim() },
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : void 0
    }
  });
  if (error) throw error;
  return data;
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}
async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error && error.message !== "Auth session missing!") throw error;
  return data?.user ?? null;
}
async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : void 0
  });
  if (error) throw error;
}
async function verifyPasswordOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token,
    type: "recovery"
  });
  if (error) throw error;
  return data;
}
async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
}
function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data.subscription;
}
export {
  signInWithEmail as a,
  signOut as b,
  getUser as c,
  getSession as g,
  onAuthStateChange as o,
  resetPassword as r,
  signUpWithEmail as s,
  updatePassword as u,
  verifyPasswordOtp as v
};
