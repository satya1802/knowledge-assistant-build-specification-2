// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Checkbox, Table, THead, TBody, TR, TH, TD, Avatar, Separator } = UI;
const { Check, X, ChevronRight, Settings, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const ACCOUNT = {
  name: "Satya Ganaraju",
  email: "satya.ganaraju@quorq.ai",
  is_admin: true,
  is_enabled: true,
  created_at: "4 March 2026",
  session_started: "Today, 08:41 UTC",
  session_expires: "Today, 20:41 UTC",
};

const MIN_PASSWORD_LENGTH = 10;

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces for well-lit offices and shared screens.",
    swatch: { page: "#F7F9FA", panel: "#FFFFFF", bar: "#0E2A47", line: "#D7DEE4" },
  },
  {
    value: "dark",
    label: "Dark",
    description: "Low-glare surfaces for evening work and dim rooms.",
    swatch: { page: "#101A24", panel: "#17242F", bar: "#2E8B6B", line: "#2C3B49" },
  },
  {
    value: "system",
    label: "System",
    description: "Follows your operating system appearance as it changes.",
    swatch: { page: "#F7F9FA", panel: "#17242F", bar: "#0E2A47", line: "#8A98A5" },
  },
];

const INITIAL_ACTIVITY = [
  {
    id: "act-11",
    event: "Signed in",
    tone: "ok",
    detail: "Chrome 141 · macOS 15",
    ip: "10.4.22.118",
    when: "Today, 08:41",
  },
  {
    id: "act-10",
    event: "Signed in",
    tone: "ok",
    detail: "Safari 18 · iPhone",
    ip: "82.14.7.203",
    when: "Yesterday, 18:02",
  },
  {
    id: "act-09",
    event: "Sign-in failed",
    tone: "warn",
    detail: "Chrome 141 · macOS 15 — incorrect email or password",
    ip: "10.4.22.118",
    when: "Yesterday, 08:36",
  },
  {
    id: "act-08",
    event: "Password changed",
    tone: "info",
    detail: "Chrome 141 · macOS 15",
    ip: "10.4.22.118",
    when: "9 Oct 2026, 11:20",
  },
  {
    id: "act-07",
    event: "Email locked 15 minutes",
    tone: "warn",
    detail: "5 failed attempts within 15 minutes",
    ip: "203.0.113.44",
    when: "9 Oct 2026, 11:04",
  },
  {
    id: "act-06",
    event: "Signed out",
    tone: "info",
    detail: "Firefox 133 · Windows 11",
    ip: "10.4.22.91",
    when: "7 Oct 2026, 17:48",
  },
  {
    id: "act-05",
    event: "Signed in",
    tone: "ok",
    detail: "Firefox 133 · Windows 11",
    ip: "10.4.22.91",
    when: "7 Oct 2026, 09:12",
  },
];

const TONE_STYLES = {
  ok: { color: "#1F6B51", background: "#E6F2ED", border: "#BFDFD2" },
  warn: { color: "#8A4B00", background: "#FBEEDC", border: "#EFD3A8" },
  info: { color: "#0E2A47", background: "#E7ECF2", border: "#C7D2DE" },
};

export default function Screen() {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState("system");
  const [savedTheme, setSavedTheme] = React.useState("system");
  const [systemAppearance, setSystemAppearance] = React.useState("light");

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [revealed, setRevealed] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [formStatus, setFormStatus] = React.useState(null);
  const [passwordChangedOn, setPasswordChangedOn] = React.useState("9 October 2026");
  const [activity, setActivity] = React.useState(INITIAL_ACTIVITY);
  const [announcement, setAnnouncement] = React.useState("");

  const summaryRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setSystemAppearance(query.matches ? "dark" : "light");
    apply();
    if (query.addEventListener) {
      query.addEventListener("change", apply);
      return () => query.removeEventListener("change", apply);
    }
    return undefined;
  }, []);

  const requirements = [
    {
      id: "length",
      label: `At least ${MIN_PASSWORD_LENGTH} characters`,
      met: newPassword.length >= MIN_PASSWORD_LENGTH,
    },
    { id: "number", label: "Contains at least one number", met: /\d/.test(newPassword) },
    {
      id: "different",
      label: "Different from your current password",
      met: newPassword.length > 0 && newPassword !== currentPassword,
    },
  ];

  function handlePasswordSubmit(event) {
    event.preventDefault();
    const next = {};

    if (!currentPassword) {
      next.current = "Enter your current password.";
    } else if (currentPassword.length < 8) {
      next.current = "Incorrect current password. Your existing password is unchanged.";
    }

    if (!newPassword) {
      next.next = "Enter a new password.";
    } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
      next.next = `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    } else if (!/\d/.test(newPassword)) {
      next.next = "New password must include at least one number.";
    } else if (newPassword === currentPassword) {
      next.next = "New password must be different from your current password.";
    }

    if (!confirmPassword) {
      next.confirm = "Re-enter the new password to confirm it.";
    } else if (confirmPassword !== newPassword) {
      next.confirm = "The two new passwords do not match.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setFormStatus({ kind: "error", message: "Your password was not changed. Check the fields below." });
      window.requestAnimationFrame(() => {
        if (summaryRef.current) summaryRef.current.focus();
      });
      return;
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    setActivity((rows) => [
      {
        id: `act-${now.getTime()}`,
        event: "Password changed",
        tone: "info",
        detail: "Chrome 141 · macOS 15",
        ip: "10.4.22.118",
        when: `Today, ${hh}:${mm}`,
      },
      ...rows,
    ]);
    setPasswordChangedOn("Today");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setRevealed(false);
    setFormStatus({
      kind: "success",
      message: "Password changed. Use the new password the next time you sign in.",
    });
    window.requestAnimationFrame(() => {
      if (summaryRef.current) summaryRef.current.focus();
    });
  }

  function handleThemeSave() {
    setSavedTheme(theme);
    const option = THEME_OPTIONS.find((o) => o.value === theme);
    setAnnouncement(`Appearance saved. ${option ? option.label : theme} is now applied to Front Desk.`);
  }

  const themeDirty = theme !== savedTheme;
  const savedThemeLabel = (THEME_OPTIONS.find((o) => o.value === savedTheme) || {}).label || "System";
  const resolvedLabel =
    savedTheme === "system"
      ? `System · currently ${systemAppearance === "dark" ? "dark" : "light"}`
      : savedThemeLabel;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8" style={{ fontFamily: brand.fontBody }}>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <header className="mb-8">
        <h1
          className="text-3xl font-semibold tracking-tight"
          style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
        >
          Account
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>
          Change the password you use to sign in to Front Desk and choose how the interface looks on this
          machine.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Your details
                </h2>
              </CardTitle>
              <CardDescription>
                Your email address is managed by an administrator and cannot be changed here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar name={ACCOUNT.name} className="h-14 w-14 shrink-0" />
                <dl className="grid flex-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide" style={{ color: brand.neutralColor }}>
                      Signed in as
                    </dt>
                    <dd className="mt-1 text-[15px] font-medium" style={{ color: brand.primaryColor }}>
                      {ACCOUNT.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide" style={{ color: brand.neutralColor }}>
                      Role
                    </dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-2 text-[15px]">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          color: TONE_STYLES.info.color,
                          backgroundColor: TONE_STYLES.info.background,
                          borderColor: TONE_STYLES.info.border,
                        }}
                      >
                        <Icons.Settings className="h-3.5 w-3.5" aria-hidden="true" />
                        Administrator
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          color: TONE_STYLES.ok.color,
                          backgroundColor: TONE_STYLES.ok.background,
                          borderColor: TONE_STYLES.ok.border,
                        }}
                      >
                        <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Active
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide" style={{ color: brand.neutralColor }}>
                      Account created
                    </dt>
                    <dd className="mt-1 text-[15px]" style={{ color: brand.primaryColor }}>
                      {ACCOUNT.created_at}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide" style={{ color: brand.neutralColor }}>
                      Password last changed
                    </dt>
                    <dd className="mt-1 text-[15px]" style={{ color: brand.primaryColor }}>
                      {passwordChangedOn}
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Change password
                </h2>
              </CardTitle>
              <CardDescription>
                Replace a password an administrator issued, or one you think is compromised.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus ? (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  role={formStatus.kind === "error" ? "alert" : "status"}
                  className="mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    color: formStatus.kind === "error" ? "#8A1F1F" : TONE_STYLES.ok.color,
                    backgroundColor: formStatus.kind === "error" ? "#FBEAEA" : TONE_STYLES.ok.background,
                    borderColor: formStatus.kind === "error" ? "#EBC3C3" : TONE_STYLES.ok.border,
                  }}
                >
                  {formStatus.kind === "error" ? (
                    <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span className="font-medium">{formStatus.message}</span>
                </div>
              ) : null}

              <form onSubmit={handlePasswordSubmit} noValidate className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input
                    id="current-password"
                    name="current_password"
                    type={revealed ? "text" : "password"}
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    aria-invalid={errors.current ? "true" : undefined}
                    aria-describedby={errors.current ? "current-password-error" : undefined}
                  />
                  {errors.current ? (
                    <p id="current-password-error" className="text-sm font-medium" style={{ color: "#8A1F1F" }}>
                      {errors.current}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                      id="new-password"
                      name="new_password"
                      type={revealed ? "text" : "password"}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      aria-invalid={errors.next ? "true" : undefined}
                      aria-describedby={
                        errors.next ? "new-password-error password-requirements" : "password-requirements"
                      }
                    />
                    {errors.next ? (
                      <p id="new-password-error" className="text-sm font-medium" style={{ color: "#8A1F1F" }}>
                        {errors.next}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input
                      id="confirm-password"
                      name="confirm_password"
                      type={revealed ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={errors.confirm ? "true" : undefined}
                      aria-describedby={errors.confirm ? "confirm-password-error" : undefined}
                    />
                    {errors.confirm ? (
                      <p id="confirm-password-error" className="text-sm font-medium" style={{ color: "#8A1F1F" }}>
                        {errors.confirm}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="reveal-passwords"
                    checked={revealed}
                    onChange={(e) =>
                      setRevealed(e && e.target ? e.target.checked : !revealed)
                    }
                  />
                  <Label htmlFor="reveal-passwords" className="text-sm font-normal">
                    Show password text
                  </Label>
                </div>

                <div
                  id="password-requirements"
                  className="rounded-lg border px-4 py-3"
                  style={{ borderColor: "#DCE3E9", backgroundColor: "#FFFFFF" }}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: brand.neutralColor }}>
                    Requirements
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {requirements.map((req) => (
                      <li key={req.id} className="flex items-center gap-2 text-sm" style={{ color: brand.primaryColor }}>
                        {req.met ? (
                          <Icons.Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
                        ) : (
                          <Icons.X className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.neutralColor }} />
                        )}
                        <span>{req.label}</span>
                        <span className="sr-only">{req.met ? " — met" : " — not met yet"}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" style={{ backgroundColor: brand.primaryColor, color: "#FFFFFF" }}>
                    Save new password
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setErrors({});
                      setFormStatus(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Recent account activity
                </h2>
              </CardTitle>
              <CardDescription>
                The last sign-ins and security events recorded for {ACCOUNT.email}. Times are shown in UTC.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <THead>
                    <TR>
                      <TH scope="col">Event</TH>
                      <TH scope="col">Device and detail</TH>
                      <TH scope="col">IP address</TH>
                      <TH scope="col">When</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {activity.map((row) => {
                      const tone = TONE_STYLES[row.tone] || TONE_STYLES.info;
                      const Icon =
                        row.tone === "ok" ? Icons.CheckCircle : row.tone === "warn" ? Icons.AlertCircle : Icons.Clock;
                      return (
                        <TR key={row.id}>
                          <TH scope="row" className="whitespace-nowrap">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                              style={{
                                color: tone.color,
                                backgroundColor: tone.background,
                                borderColor: tone.border,
                              }}
                            >
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {row.event}
                            </span>
                          </TH>
                          <TD style={{ color: brand.neutralColor }}>{row.detail}</TD>
                          <TD className="whitespace-nowrap font-mono text-sm" style={{ color: brand.neutralColor }}>
                            {row.ip}
                          </TD>
                          <TD className="whitespace-nowrap" style={{ color: brand.primaryColor }}>
                            {row.when}
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Appearance
                </h2>
              </CardTitle>
              <CardDescription>
                Saved to your account, so it follows you to any browser you sign in from.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset className="space-y-3">
                <legend className="sr-only">Choose an appearance</legend>
                {THEME_OPTIONS.map((option) => {
                  const selected = theme === option.value;
                  return (
                    <label
                      key={option.value}
                      htmlFor={`theme-${option.value}`}
                      className="flex cursor-pointer items-start gap-3 border p-3 transition-colors"
                      style={{
                        borderRadius: brand.radius,
                        borderColor: selected ? brand.primaryColor : "#DCE3E9",
                        borderWidth: selected ? 2 : 1,
                        backgroundColor: selected ? "#F1F5F8" : "#FFFFFF",
                        padding: selected ? "calc(0.75rem - 1px)" : "0.75rem",
                      }}
                    >
                      <input
                        type="radio"
                        id={`theme-${option.value}`}
                        name="theme"
                        value={option.value}
                        checked={selected}
                        onChange={() => setTheme(option.value)}
                        className="mt-1 h-4 w-4"
                        style={{ accentColor: brand.primaryColor }}
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold" style={{ color: brand.primaryColor }}>
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-sm leading-snug" style={{ color: brand.neutralColor }}>
                          {option.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-10 w-12 shrink-0 flex-col overflow-hidden rounded border"
                        style={{ borderColor: option.swatch.line, backgroundColor: option.swatch.page }}
                      >
                        <span className="block h-2.5 w-full" style={{ backgroundColor: option.swatch.bar }} />
                        <span className="m-1 block flex-1 rounded-sm" style={{ backgroundColor: option.swatch.panel }} />
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              <p className="mt-4 text-sm" style={{ color: brand.neutralColor }}>
                Currently applied: <span className="font-semibold" style={{ color: brand.primaryColor }}>{resolvedLabel}</span>
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-3">
              <Button
                type="button"
                onClick={handleThemeSave}
                disabled={!themeDirty}
                style={
                  themeDirty
                    ? { backgroundColor: brand.accentColor, color: "#06251A" }
                    : undefined
                }
              >
                {themeDirty ? "Save appearance" : "Appearance saved"}
              </Button>
              {themeDirty ? (
                <span className="text-sm" style={{ color: brand.neutralColor }}>
                  Unsaved change
                </span>
              ) : null}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  This session
                </h2>
              </CardTitle>
              <CardDescription>Session cookies are HTTP-only and expire after 12 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt style={{ color: brand.neutralColor }}>Signed in</dt>
                  <dd className="font-medium" style={{ color: brand.primaryColor }}>
                    {ACCOUNT.session_started}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt style={{ color: brand.neutralColor }}>Expires</dt>
                  <dd className="font-medium" style={{ color: brand.primaryColor }}>
                    {ACCOUNT.session_expires}
                  </dd>
                </div>
              </dl>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate("admin")}
                >
                  Manage users and settings
                  <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate("docs")}
                >
                  Getting started &amp; API reference
                  <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => navigate("sign-in")}
                >
                  Sign out
                  <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Forgotten passwords
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                Front Desk does not send password emails. If you are locked out, an administrator resets your
                password on the Admin page and passes the new one to you directly. Five failed sign-ins within
                15 minutes lock an email address for 15 minutes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
