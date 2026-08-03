"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import * as api from "@/lib/api";
import type { AuthResponse, User } from "@/types/product";

const STORAGE_KEY = "bozor_auth";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface AuthContextValue {
  auth: AuthState | null;
  isLoaded: boolean;
  loginWithOtp: (phone: string, code: string, name?: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  updateName: (name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let authState: AuthState | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function loadFromStorage(): AuthState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
}

function ensureHydrated() {
  if (!hydrated) {
    authState = loadFromStorage();
    hydrated = true;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function setAuthState(next: AuthState | null) {
  ensureHydrated();
  authState = next;
  if (next) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthState | null {
  ensureHydrated();
  return authState;
}

function getServerSnapshot(): AuthState | null {
  return null;
}

function subscribeNoop() {
  return () => {};
}

function getClientTrue() {
  return true;
}

function getClientFalse() {
  return false;
}

function fromAuthResponse(res: AuthResponse): AuthState {
  return {
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    user: res.user,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoaded = useSyncExternalStore(subscribeNoop, getClientTrue, getClientFalse);

  const loginWithOtp = useCallback(
    async (phone: string, code: string, name?: string) => {
      const res = await api.verifyOtp(phone, code, name);
      setAuthState(fromAuthResponse(res));
    },
    []
  );

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password);
    setAuthState(fromAuthResponse(res));
  }, []);

  const registerWithEmail = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await api.register(name, email, password);
      setAuthState(fromAuthResponse(res));
    },
    []
  );

  const updateName = useCallback(async (name: string) => {
    if (!authState) return;
    const user = await api.updateProfile(authState.accessToken, name);
    setAuthState({ ...authState, user });
  }, []);

  const logout = useCallback(() => setAuthState(null), []);

  const value: AuthContextValue = {
    auth,
    isLoaded,
    loginWithOtp,
    loginWithEmail,
    registerWithEmail,
    updateName,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
