import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type AuthUser = User;
export type AuthSession = Session;

/**
 * Sign in with email and password.
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw error;
  return data;
}

/**
 * Register a new account with email, password, and full name.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { full_name: fullName.trim() },
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });
  if (error) throw error;
  return data;
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get the current session (null if not authenticated).
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Get the current user (null if not authenticated).
 */
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error && error.message !== "Auth session missing!") throw error;
  return data?.user ?? null;
}

/**
 * Send a password-reset OTP to the given email.
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: typeof window !== "undefined"
      ? `${window.location.origin}/reset-password`
      : undefined,
  });
  if (error) throw error;
}

/**
 * Verify a 6-digit OTP code for password recovery.
 * Returns the new session on success.
 */
export async function verifyPasswordOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token,
    type: "recovery",
  });
  if (error) throw error;
  return data;
}

/**
 * Update the password for the currently authenticated user.
 * Must be called after verifyPasswordOtp succeeds.
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
}

/**
 * Subscribe to auth state changes.
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data.subscription;
}
