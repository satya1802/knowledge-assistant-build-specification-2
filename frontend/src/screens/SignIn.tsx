// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { useAuth } from "@/lib/auth";

const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Checkbox } = UI;
const { Search, Users, FileText, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const SIGNUP_ENABLED = true;
const MIN_PASSWORD_LENGTH = 10;

const HIGHLIGHTS = [
  {
    icon: "Search",
    title: "Answers from your own documents",
    body: "Policies, handbooks and process notes are searched before a single word is written.",
  },
  {
    icon: "FileText",
    title: "Every claim carries a citation",
    body: "Numbered source chips open the exact passage and page the answer came from.",
  },
  {
    icon: "Clock",
    title: "Your history stays private",
    body: "Conversations are visible to you alone, grouped by date and deletable at any time.",
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [tab, setTab] = React.useState("signin");

  // Sign in form
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [signInErrors, setSignInErrors] = React.useState({});
  const [formNotice, setFormNotice] = React.useState(null);
  const [signInBusy, setSignInBusy] = React.useState(false);

  // Create account form
  const [newEmail, setNewEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [signUpErrors, setSignUpErrors] = React.useState({});
  const [signUpNotice, setSignUpNotice] = React.useState(null);
  const [signUpBusy, setSignUpBusy] = React.useState(false);

  const signInTabRef = React.useRef(null);
  const signUpTabRef = React.useRef(null);

  const focusRing = {
    ["--tw-ring-color"]: brand.primaryColor,
  };

  const isEmailish = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());

  function selectTab(next) {
    setTab(next);
    setFormNotice(null);
    setSignUpNotice(null);
  }

  function onTabKeyDown(event) {
    if (!SIGNUP_ENABLED) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next = tab === "signin" ? "signup" : "signin";
      selectTab(next);
      const ref = next === "signin" ? signInTabRef : signUpTabRef;
      if (ref.current) ref.current.focus();
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Enter your work email address.";
    else if (!isEmailish(email)) nextErrors.email = "Enter a valid email address, for example name@northbridge.co.uk.";
    if (!password) nextErrors.password = "Enter your password.";
    setSignInErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormNotice(null);
      return;
    }

    setFormNotice(null);
    setSignInBusy(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigate("chat");
    } catch (err) {
      setFormNotice({ kind: "error", message: err && err.message ? err.message : "Sign in failed." });
    } finally {
      setSignInBusy(false);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!newEmail.trim()) nextErrors.email = "Enter your work email address.";
    else if (!isEmailish(newEmail)) nextErrors.email = "Enter a valid email address.";
    if (!newPassword) nextErrors.password = "Choose a password.";
    else if (newPassword.length < MIN_PASSWORD_LENGTH)
      nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    if (confirmPassword !== newPassword) nextErrors.confirm = "The two passwords do not match.";

    setSignUpErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSignUpNotice(null);
      return;
    }

    setSignUpNotice(null);
    setSignUpBusy(true);
    try {
      await signup(newEmail.trim().toLowerCase(), newPassword);
      navigate("chat");
    } catch (err) {
      setSignUpNotice({ kind: "error", message: err && err.message ? err.message : "Account creation failed." });
    } finally {
      setSignUpBusy(false);
    }
  }

  const checkboxChange = (setter) => (event) => {
    const value = typeof event === "boolean" ? event : event && event.target ? event.target.checked : undefined;
    setter((prev) => (value === undefined ? !prev : Boolean(value)));
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
        {/* Brand / context panel */}
        <section
          className="rounded-2xl p-8 text-white lg:p-10"
          style={{ backgroundColor: brand.primaryColor, borderRadius: "1rem" }}
          aria-labelledby="brand-heading"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold tracking-tight"
              style={{ backgroundColor: brand.accentColor, borderRadius: brand.radius }}
              aria-hidden="true"
            >
              FD
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold">Front Desk</span>
              <span className="block text-sm text-white/70">Knowledge Assistant</span>
            </span>
          </div>

          <h1 id="brand-heading" className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in to Front Desk
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
            Ask a question in plain English and get an answer drawn from Northbridge&rsquo;s shared knowledge
            base &mdash; with the passages it used cited underneath.
          </p>

          <h2 className="sr-only">What the assistant does</h2>
          <ul className="mt-8 space-y-5">
            {HIGHLIGHTS.map((item) => {
              const Icon = Icons[item.icon];
              return (
                <li key={item.title} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: "rgba(46,139,107,0.22)", borderRadius: brand.radius }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "#8FD9BE" }} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/70">{item.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 h-px w-full bg-white/15" />

          <p className="mt-8 text-sm text-white/70">
            New here?{" "}
            <button
              type="button"
              onClick={() => navigate("docs")}
              className="rounded font-semibold text-white underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{ ["--tw-ring-color"]: "#FFFFFF" }}
            >
              Read the getting started guide
            </button>
          </p>
        </section>

        {/* Form panel */}
        <section aria-labelledby="form-heading" className="w-full">
          <h2 id="form-heading" className="sr-only">
            Account access
          </h2>

          <UI.Card>
            <UI.CardContent>
              <div className="px-1 py-2 sm:px-2">
                {SIGNUP_ENABLED ? (
                  <div
                    role="tablist"
                    aria-label="Account access"
                    onKeyDown={onTabKeyDown}
                    className="mb-7 inline-flex gap-1 rounded-lg p-1"
                    style={{ backgroundColor: "#EDF1F4", borderRadius: brand.radius }}
                  >
                    <button
                      ref={signInTabRef}
                      type="button"
                      role="tab"
                      id="tab-signin"
                      aria-selected={tab === "signin"}
                      aria-controls="panel-signin"
                      tabIndex={tab === "signin" ? 0 : -1}
                      onClick={() => selectTab("signin")}
                      className="rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        ...focusRing,
                        backgroundColor: tab === "signin" ? "#FFFFFF" : "transparent",
                        color: tab === "signin" ? brand.primaryColor : brand.neutralColor,
                        boxShadow: tab === "signin" ? "0 1px 2px rgba(14,42,71,0.12)" : "none",
                        borderRadius: brand.radius,
                      }}
                    >
                      Sign in
                    </button>
                    <button
                      ref={signUpTabRef}
                      type="button"
                      role="tab"
                      id="tab-signup"
                      aria-selected={tab === "signup"}
                      aria-controls="panel-signup"
                      tabIndex={tab === "signup" ? 0 : -1}
                      onClick={() => selectTab("signup")}
                      className="rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        ...focusRing,
                        backgroundColor: tab === "signup" ? "#FFFFFF" : "transparent",
                        color: tab === "signup" ? brand.primaryColor : brand.neutralColor,
                        boxShadow: tab === "signup" ? "0 1px 2px rgba(14,42,71,0.12)" : "none",
                        borderRadius: brand.radius,
                      }}
                    >
                      Create account
                    </button>
                  </div>
                ) : (
                  <p className="mb-7 text-sm" style={{ color: brand.neutralColor }}>
                    Account creation is turned off. Ask an administrator to create your account.
                  </p>
                )}

                {/* Sign in panel */}
                <div
                  role="tabpanel"
                  id="panel-signin"
                  aria-labelledby="tab-signin"
                  hidden={tab !== "signin"}
                >
                  {tab === "signin" && (
                    <form onSubmit={handleSignIn} noValidate>
                      <h3 className="text-lg font-semibold" style={{ color: brand.primaryColor }}>
                        Sign in with your work email
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                        Sessions last 12 hours and are stored server-side.
                      </p>

                      {formNotice && (
                        <div
                          role="alert"
                          className="mt-5 flex gap-3 rounded-lg border p-4"
                          style={{
                            borderRadius: brand.radius,
                            borderColor: "#B42318",
                            backgroundColor: "#FEF3F2",
                          }}
                        >
                          <Icons.AlertCircle
                            className="mt-0.5 h-5 w-5 shrink-0"
                            style={{ color: "#8F1D16" }}
                            aria-hidden="true"
                          />
                          <div className="text-sm">
                            <p className="font-semibold" style={{ color: "#7A1611" }}>
                              {formNotice.message}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 space-y-5">
                        <div>
                          <UI.Label htmlFor="signin-email">Work email</UI.Label>
                          <UI.Input
                            id="signin-email"
                            name="email"
                            type="email"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={signInErrors.email ? "true" : undefined}
                            aria-describedby={signInErrors.email ? "signin-email-error" : undefined}
                            className="mt-2 w-full"
                          />
                          {signInErrors.email && (
                            <p id="signin-email-error" className="mt-2 text-sm" style={{ color: "#8F1D16" }}>
                              {signInErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="flex items-baseline justify-between gap-3">
                            <UI.Label htmlFor="signin-password">Password</UI.Label>
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              aria-pressed={showPassword}
                              aria-controls="signin-password"
                              className="rounded px-1 text-sm font-medium underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                              style={{ ...focusRing, color: brand.primaryColor }}
                            >
                              {showPassword ? "Hide password" : "Show password"}
                            </button>
                          </div>
                          <UI.Input
                            id="signin-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={signInErrors.password ? "true" : undefined}
                            aria-describedby={signInErrors.password ? "signin-password-error" : undefined}
                            className="mt-2 w-full"
                          />
                          {signInErrors.password && (
                            <p id="signin-password-error" className="mt-2 text-sm" style={{ color: "#8F1D16" }}>
                              {signInErrors.password}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <UI.Checkbox
                            id="remember-device"
                            checked={remember}
                            onChange={checkboxChange(setRemember)}
                            onCheckedChange={(v) => setRemember(Boolean(v))}
                          />
                          <UI.Label htmlFor="remember-device">Keep me signed in on this device</UI.Label>
                        </div>
                      </div>

                      <UI.Button
                        type="submit"
                        disabled={signInBusy}
                        className="mt-7 w-full justify-center"
                        style={{ backgroundColor: brand.primaryColor, color: "#FFFFFF" }}
                      >
                        {signInBusy ? "Signing in…" : "Sign in"}
                      </UI.Button>

                      <p className="mt-5 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                        Forgotten your password? There is no self-service reset in the pilot &mdash; an
                        administrator can set a new one for you from the Users page.
                      </p>
                    </form>
                  )}
                </div>

                {/* Create account panel */}
                {SIGNUP_ENABLED && (
                  <div
                    role="tabpanel"
                    id="panel-signup"
                    aria-labelledby="tab-signup"
                    hidden={tab !== "signup"}
                  >
                    {tab === "signup" && (
                      <form onSubmit={handleSignUp} noValidate>
                        <h3 className="text-lg font-semibold" style={{ color: brand.primaryColor }}>
                          Create your account
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                          Self-service sign-up is switched on. New accounts are created as ordinary users.
                        </p>

                        {signUpNotice && (
                          <div
                            role="alert"
                            className="mt-5 flex gap-3 rounded-lg border p-4"
                            style={{
                              borderRadius: brand.radius,
                              borderColor: "#B42318",
                              backgroundColor: "#FEF3F2",
                            }}
                          >
                            <Icons.AlertCircle
                              className="mt-0.5 h-5 w-5 shrink-0"
                              style={{ color: "#8F1D16" }}
                              aria-hidden="true"
                            />
                            <div className="text-sm" style={{ color: "#7A1611" }}>
                              <p className="font-semibold">{signUpNotice.message}</p>
                              <p className="mt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEmail(newEmail.trim().toLowerCase());
                                    selectTab("signin");
                                  }}
                                  className="rounded font-semibold underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                  style={{ ...focusRing, color: "#7A1611" }}
                                >
                                  Sign in instead
                                </button>
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="mt-6 space-y-5">
                          <div>
                            <UI.Label htmlFor="signup-email">Work email</UI.Label>
                            <UI.Input
                              id="signup-email"
                              name="new-email"
                              type="email"
                              autoComplete="username"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              aria-invalid={signUpErrors.email ? "true" : undefined}
                              aria-describedby={signUpErrors.email ? "signup-email-error" : undefined}
                              className="mt-2 w-full"
                            />
                            {signUpErrors.email && (
                              <p id="signup-email-error" className="mt-2 text-sm" style={{ color: "#8F1D16" }}>
                                {signUpErrors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <div className="flex items-baseline justify-between gap-3">
                              <UI.Label htmlFor="signup-password">Password</UI.Label>
                              <button
                                type="button"
                                onClick={() => setShowNewPassword((v) => !v)}
                                aria-pressed={showNewPassword}
                                aria-controls="signup-password"
                                className="rounded px-1 text-sm font-medium underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{ ...focusRing, color: brand.primaryColor }}
                              >
                                {showNewPassword ? "Hide password" : "Show password"}
                              </button>
                            </div>
                            <UI.Input
                              id="signup-password"
                              name="new-password"
                              type={showNewPassword ? "text" : "password"}
                              autoComplete="new-password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              aria-invalid={signUpErrors.password ? "true" : undefined}
                              aria-describedby={
                                signUpErrors.password ? "signup-password-error" : "signup-password-hint"
                              }
                              className="mt-2 w-full"
                            />
                            {signUpErrors.password ? (
                              <p id="signup-password-error" className="mt-2 text-sm" style={{ color: "#8F1D16" }}>
                                {signUpErrors.password}
                              </p>
                            ) : (
                              <p id="signup-password-hint" className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
                                At least {MIN_PASSWORD_LENGTH} characters. Stored bcrypt-hashed, never in plain text.
                              </p>
                            )}
                          </div>

                          <div>
                            <UI.Label htmlFor="signup-confirm">Confirm password</UI.Label>
                            <UI.Input
                              id="signup-confirm"
                              name="confirm-password"
                              type={showNewPassword ? "text" : "password"}
                              autoComplete="new-password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              aria-invalid={signUpErrors.confirm ? "true" : undefined}
                              aria-describedby={signUpErrors.confirm ? "signup-confirm-error" : undefined}
                              className="mt-2 w-full"
                            />
                            {signUpErrors.confirm && (
                              <p id="signup-confirm-error" className="mt-2 text-sm" style={{ color: "#8F1D16" }}>
                                {signUpErrors.confirm}
                              </p>
                            )}
                          </div>
                        </div>

                        <UI.Button
                          type="submit"
                          disabled={signUpBusy}
                          className="mt-7 w-full justify-center"
                          style={{ backgroundColor: brand.primaryColor, color: "#FFFFFF" }}
                        >
                          {signUpBusy ? "Creating account…" : "Create account and sign in"}
                        </UI.Button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </UI.CardContent>
          </UI.Card>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-sm" style={{ color: brand.neutralColor }}>
            <span className="inline-flex items-center gap-2">
              <Icons.CheckCircle className="h-4 w-4" style={{ color: brand.accentColor }} aria-hidden="true" />
              HTTP-only session cookie
            </span>
            <button
              type="button"
              onClick={() => navigate("docs")}
              className="rounded underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ ...focusRing, color: brand.primaryColor }}
            >
              Getting started &amp; API reference
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
