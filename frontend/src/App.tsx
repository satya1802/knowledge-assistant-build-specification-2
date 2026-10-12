import type { ReactElement } from "react";
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import SignIn from "@/screens/SignIn";
import Chat from "@/screens/Chat";
import KnowledgeBase from "@/screens/KnowledgeBase";
import Admin from "@/screens/Admin";
import Account from "@/screens/Account";
import Docs from "@/screens/Docs";
import { AuthProvider, useAuth } from "@/lib/auth";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

function RouteLoading() {
  return <div className="p-8 text-sm text-[var(--brand-fg-muted)]">{"Loading…"}</div>;
}

/** Protected-route guard: redirects to /sign-in when GET /api/me says 401. */
function RequireAuth({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <RouteLoading />;
  if (!user) return <Navigate to="/sign-in" replace state={{ from: location }} />;
  return children;
}

/** Signed-in users hitting /sign-in go straight to /chat. */
function RedirectIfAuthed({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();
  if (loading) return <RouteLoading />;
  if (user) return <Navigate to="/chat" replace />;
  return children;
}

function SignOutControl() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <button
      type="button"
      onClick={() => {
        void logout().then(() => navigate("/sign-in"));
      }}
      className="mt-2 block w-full rounded-[var(--brand-radius)] px-3 py-2 text-left text-sm font-medium text-[var(--brand-fg-muted)] transition-colors hover:bg-[var(--brand-hover)]"
    >
      {"Sign out"}
    </button>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <RedirectIfAuthed>
            <SignIn />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/chat"
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        }
      />
      <Route
        path="/knowledge-base"
        element={
          <RequireAuth>
            <KnowledgeBase />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />
      <Route path="/docs" element={<Docs />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <aside
          className="w-56 shrink-0 border-r p-4"
          style={{
            backgroundColor: "var(--brand-surface)",
            borderColor: "var(--brand-border)",
          }}
        >
          <p
            className="mb-4 px-3 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"Knowledge Assistant · Build specification (2)"}
          </p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/sign-in" className={navLinkClass}>
              {"Sign in"}
            </NavLink>
            <NavLink to="/chat" className={navLinkClass}>
              {"Chat"}
            </NavLink>
            <NavLink to="/knowledge-base" className={navLinkClass}>
              {"Knowledge base"}
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              {"Admin"}
            </NavLink>
            <NavLink to="/account" className={navLinkClass}>
              {"Account"}
            </NavLink>
            <NavLink to="/docs" className={navLinkClass}>
              {"Getting started & API reference"}
            </NavLink>
          </nav>
          <SignOutControl />
        </aside>
        <main className="flex-1 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </AuthProvider>
  );
}
