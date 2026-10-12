// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Label, Table, THead, TBody, TR, TH, TD, Tabs, Stat } = UI;
const { Plus, Search, Check, X, User, Users, Settings, Home, FileText, Edit, Filter, ArrowLeft, ArrowRight, AlertCircle, CheckCircle, MoreHorizontal } = Icons;

const CURRENT_USER_ID = 1;
const TODAY = "2026-10-12";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const INITIAL_USERS = [
  { id: 12, email: "ravi.nair@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-10-09", locked: false, last_seen: "2 hours ago" },
  { id: 11, email: "hannah.steiner@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-09-30", locked: false, last_seen: "Yesterday" },
  { id: 10, email: "lucas.ferreira@quorq.ai", is_admin: false, is_enabled: false, created_at: "2026-08-15", locked: false, last_seen: "22 Sep 2026" },
  { id: 9, email: "grace.mbeki@quorq.ai", is_admin: true, is_enabled: true, created_at: "2026-07-02", locked: false, last_seen: "Today" },
  { id: 8, email: "jonas.lindqvist@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-06-11", locked: true, last_seen: "6 Oct 2026" },
  { id: 7, email: "aisha.bello@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-05-27", locked: false, last_seen: "Today" },
  { id: 6, email: "tom.whitfield@quorq.ai", is_admin: false, is_enabled: false, created_at: "2026-04-08", locked: false, last_seen: "11 Jun 2026" },
  { id: 5, email: "priya.raghavan@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-03-19", locked: false, last_seen: "Yesterday" },
  { id: 4, email: "daniel.reyes@quorq.ai", is_admin: false, is_enabled: true, created_at: "2026-02-02", locked: false, last_seen: "3 days ago" },
  { id: 3, email: "maya.okonkwo@quorq.ai", is_admin: true, is_enabled: true, created_at: "2026-01-14", locked: false, last_seen: "Today" },
  { id: 2, email: "oliver.bennett@quorq.ai", is_admin: false, is_enabled: true, created_at: "2025-12-05", locked: false, last_seen: "1 Oct 2026" },
  { id: 1, email: "satya.ganaraju@quorq.ai", is_admin: true, is_enabled: true, created_at: "2025-11-03", locked: false, last_seen: "Now" }
];

const SAVED_SETTINGS = {
  signup_enabled: false,
  fallback_enabled: true,
  answer_model: "gemini-2.5-flash-lite",
  embedding_model: "text-embedding-004",
  similarity_threshold: "0.62",
  min_password_length: "10"
};

const SETTINGS_META = {
  updated_at: "9 Oct 2026, 16:40 UTC",
  updated_by: "maya.okonkwo@quorq.ai",
  key_configured: true
};

const PASSWORD_WORDS = ["harbour", "lantern", "meadow", "quartz", "cobalt", "thistle", "pelican", "juniper", "granite", "almanac"];

const COLORS = {
  navy: "#0E2A47",
  greenText: "#1F6B50",
  greenTint: "#E7F3EE",
  amberText: "#8A5A00",
  amberTint: "#FBF0DC",
  redText: "#9B2C2C",
  redTint: "#FBEAE9",
  neutral: "#5A6B7B",
  border: "#DCE3E9",
  navyTint: "#E8EDF3"
};

const FOCUS = "outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("users");
  const [users, setUsers] = React.useState(INITIAL_USERS);
  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [menuFor, setMenuFor] = React.useState(null);
  const [dialog, setDialog] = React.useState(null);
  const [notice, setNotice] = React.useState(null);
  const [tempPassword, setTempPassword] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const [addEmail, setAddEmail] = React.useState("");
  const [addPassword, setAddPassword] = React.useState("");
  const [addErrors, setAddErrors] = React.useState({});

  const [resetValue, setResetValue] = React.useState("");
  const [resetError, setResetError] = React.useState("");

  const [saved, setSaved] = React.useState(SAVED_SETTINGS);
  const [draft, setDraft] = React.useState(SAVED_SETTINGS);
  const [settingsErrors, setSettingsErrors] = React.useState({});
  const [savedAt, setSavedAt] = React.useState(SETTINGS_META.updated_at);
  const [savedBy, setSavedBy] = React.useState(SETTINGS_META.updated_by);

  const dialogRef = React.useRef(null);
  const openerRef = React.useRef(null);
  const menuTriggerRef = React.useRef(null);
  const usersTabRef = React.useRef(null);
  const settingsTabRef = React.useRef(null);

  const fmtDate = (iso) => {
    const parts = String(iso).split("-");
    return Number(parts[2]) + " " + MONTHS[Number(parts[1]) - 1] + " " + parts[0];
  };

  const makePassword = () => {
    const w1 = PASSWORD_WORDS[Math.floor(Math.random() * PASSWORD_WORDS.length)];
    const w2 = PASSWORD_WORDS[Math.floor(Math.random() * PASSWORD_WORDS.length)];
    const n = Math.floor(Math.random() * 90) + 10;
    return w1 + "-" + w2 + "-" + n;
  };

  // ---- dialogs -------------------------------------------------------------
  React.useEffect(() => {
    if (!dialog) return;
    const node = dialogRef.current;
    if (!node) return;
    const target = node.querySelector("[data-autofocus]") || node.querySelector("input, button");
    if (target) target.focus();
  }, [dialog]);

  React.useEffect(() => {
    if (!menuFor) return;
    const onDocDown = (e) => {
      if (!e.target.closest("[data-row-menu]")) setMenuFor(null);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [menuFor]);

  const closeDialog = () => {
    const opener = openerRef.current;
    setDialog(null);
    setAddErrors({});
    setResetError("");
    if (opener && typeof opener.focus === "function") opener.focus();
  };

  const onDialogKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDialog();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = Array.prototype.slice.call(
      dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], textarea, select')
    );
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openAddDialog = (e) => {
    openerRef.current = e.currentTarget;
    setAddEmail("");
    setAddPassword(makePassword());
    setAddErrors({});
    setNotice(null);
    setDialog({ kind: "add" });
  };

  const openResetDialog = (user) => {
    openerRef.current = menuTriggerRef.current;
    setResetValue(makePassword());
    setResetError("");
    setMenuFor(null);
    setDialog({ kind: "reset", user: user });
  };

  // ---- user actions --------------------------------------------------------
  const minLen = Number(saved.min_password_length) || 10;

  const submitAddUser = (e) => {
    e.preventDefault();
    const errors = {};
    const email = addEmail.trim().toLowerCase();
    if (!email) errors.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    else if (users.some((u) => u.email === email)) errors.email = "An account with this email already exists.";
    if (addPassword.length < minLen) errors.password = "Password must be at least " + minLen + " characters.";
    setAddErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const nextId = users.reduce((m, u) => Math.max(m, u.id), 0) + 1;
    setUsers([
      { id: nextId, email: email, is_admin: false, is_enabled: true, created_at: TODAY, locked: false, last_seen: "Never signed in" },
      ...users
    ]);
    setTempPassword({ email: email, password: addPassword, kind: "new" });
    setNotice({ tone: "success", text: email + " was added as an ordinary user." });
    closeDialog();
  };

  const submitReset = (e) => {
    e.preventDefault();
    if (resetValue.length < minLen) {
      setResetError("Password must be at least " + minLen + " characters.");
      return;
    }
    const user = dialog.user;
    setUsers(users.map((u) => (u.id === user.id ? Object.assign({}, u, { locked: false }) : u)));
    setTempPassword({ email: user.email, password: resetValue, kind: "reset" });
    setNotice({ tone: "success", text: "Password reset for " + user.email + ". Lockout and failed-attempt counter cleared." });
    closeDialog();
  };

  const toggleAdmin = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? Object.assign({}, u, { is_admin: !u.is_admin }) : u)));
    setNotice({
      tone: "success",
      text: user.is_admin ? "Admin role removed from " + user.email + "." : user.email + " is now an admin."
    });
    setMenuFor(null);
    if (menuTriggerRef.current) menuTriggerRef.current.focus();
  };

  const toggleEnabled = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? Object.assign({}, u, { is_enabled: !u.is_enabled }) : u)));
    setNotice({
      tone: user.is_enabled ? "warning" : "success",
      text: user.is_enabled
        ? user.email + " was disabled. Their session stops working on its next request."
        : user.email + " was re-enabled and can sign in again."
    });
    setMenuFor(null);
    if (menuTriggerRef.current) menuTriggerRef.current.focus();
  };

  const copyPassword = () => {
    if (!tempPassword) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tempPassword.password);
      }
    } catch (err) {
      /* clipboard unavailable — the password is still visible on screen */
    }
    setCopied(true);
  };

  // ---- settings ------------------------------------------------------------
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  const saveSettings = (e) => {
    e.preventDefault();
    const errors = {};
    const threshold = Number(draft.similarity_threshold);
    if (draft.similarity_threshold === "" || Number.isNaN(threshold) || threshold < 0 || threshold > 1) {
      errors.similarity_threshold = "Similarity threshold must be a number between 0 and 1.";
    }
    if (!draft.answer_model.trim()) errors.answer_model = "Enter an answer model name.";
    if (!draft.embedding_model.trim()) errors.embedding_model = "Enter a 768-dimension embedding model name.";
    const pw = Number(draft.min_password_length);
    if (!Number.isInteger(pw) || pw < 8 || pw > 64) errors.min_password_length = "Minimum password length must be a whole number between 8 and 64.";
    setSettingsErrors(errors);
    if (Object.keys(errors).length > 0) {
      setNotice({ tone: "error", text: "Settings were not saved. Check the highlighted fields." });
      return;
    }
    setSaved(draft);
    setSavedAt("Just now");
    setSavedBy("satya.ganaraju@quorq.ai");
    setNotice({ tone: "success", text: "Settings saved. The next question uses them — no restart needed." });
  };

  const discard = () => {
    setDraft(saved);
    setSettingsErrors({});
    setNotice({ tone: "success", text: "Unsaved changes discarded." });
  };

  // ---- derived -------------------------------------------------------------
  const filtered = users.filter((u) => {
    if (query.trim() && u.email.toLowerCase().indexOf(query.trim().toLowerCase()) === -1) return false;
    if (roleFilter === "admin" && !u.is_admin) return false;
    if (roleFilter === "user" && u.is_admin) return false;
    if (statusFilter === "active" && !u.is_enabled) return false;
    if (statusFilter === "disabled" && u.is_enabled) return false;
    return true;
  });

  const stats = [
    { label: "Accounts", value: users.length, hint: "in this workspace" },
    { label: "Admins", value: users.filter((u) => u.is_admin).length, hint: "can manage users" },
    { label: "Disabled", value: users.filter((u) => !u.is_enabled).length, hint: "cannot sign in" },
    { label: "Locked out", value: users.filter((u) => u.locked).length, hint: "5 failed attempts" }
  ];

  const filtersActive = query.trim() !== "" || roleFilter !== "all" || statusFilter !== "all";

  const clearFilters = () => {
    setQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const onTabKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next = tab === "users" ? "settings" : "users";
    setTab(next);
    const ref = next === "users" ? usersTabRef : settingsTabRef;
    if (ref.current) ref.current.focus();
  };

  const chip = (active) =>
    "px-3 py-1.5 text-sm rounded-full border transition-colors " +
    FOCUS +
    (active ? " text-white border-transparent" : " bg-white hover:bg-slate-50");

  const chipStyle = (active) =>
    active ? { backgroundColor: COLORS.navy } : { borderColor: COLORS.border, color: COLORS.navy };

  const tabClass = (active) =>
    "relative px-1 pb-3 pt-1 text-sm font-medium border-b-2 -mb-px " +
    FOCUS +
    (active ? "" : " border-transparent hover:border-slate-300");

  const fieldClass = "w-full rounded-md border bg-white px-3 py-2 text-sm " + FOCUS;

  const renderSwitch = (id, on, onChange, labelId, descId) => (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={on}
      aria-labelledby={labelId}
      aria-describedby={descId}
      onClick={() => onChange(!on)}
      className={"relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors " + FOCUS}
      style={{ backgroundColor: on ? COLORS.greenText : "#FFFFFF", borderColor: on ? COLORS.greenText : COLORS.border }}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: on ? "translateX(24px)" : "translateX(4px)", backgroundColor: on ? "#FFFFFF" : COLORS.neutral }}
      />
    </button>
  );

  return (
    <div className="min-h-full" style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody }}>
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Heading */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight" style={{ color: COLORS.navy, fontFamily: brand.fontHeading }}>
              Admin
            </h1>
            <p className="mt-2 text-sm leading-6" style={{ color: COLORS.neutral }}>
              Manage who can reach Front Desk, and tune how the assistant answers. Changes to settings apply to the next
              question asked — no redeploy needed.
            </p>
          </div>
          <UI.Button
            type="button"
            onClick={openAddDialog}
            className={"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium " + FOCUS}
            style={{ backgroundColor: COLORS.navy, color: "#FFFFFF" }}
          >
            <Icons.Plus className="h-4 w-4" aria-hidden="true" />
            Add user
          </UI.Button>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b" style={{ borderColor: COLORS.border }}>
          <div role="tablist" aria-label="Admin sections" className="flex gap-8" onKeyDown={onTabKeyDown}>
            <button
              ref={usersTabRef}
              role="tab"
              id="tab-users"
              type="button"
              aria-selected={tab === "users"}
              aria-controls="panel-users"
              tabIndex={tab === "users" ? 0 : -1}
              onClick={() => setTab("users")}
              className={tabClass(tab === "users")}
              style={tab === "users" ? { color: COLORS.navy, borderColor: COLORS.navy } : { color: COLORS.neutral }}
            >
              Users <span className="ml-1 font-normal">({users.length})</span>
            </button>
            <button
              ref={settingsTabRef}
              role="tab"
              id="tab-settings"
              type="button"
              aria-selected={tab === "settings"}
              aria-controls="panel-settings"
              tabIndex={tab === "settings" ? 0 : -1}
              onClick={() => setTab("settings")}
              className={tabClass(tab === "settings")}
              style={tab === "settings" ? { color: COLORS.navy, borderColor: COLORS.navy } : { color: COLORS.neutral }}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Live region for action feedback */}
        <div role="status" aria-live="polite" className="mt-6 empty:mt-0">
          {notice ? (
            <div
              className="flex items-start gap-3 rounded-md border px-4 py-3 text-sm"
              style={{
                borderColor: notice.tone === "error" ? COLORS.redText : notice.tone === "warning" ? COLORS.amberText : COLORS.greenText,
                backgroundColor: notice.tone === "error" ? COLORS.redTint : notice.tone === "warning" ? COLORS.amberTint : COLORS.greenTint,
                color: notice.tone === "error" ? COLORS.redText : notice.tone === "warning" ? COLORS.amberText : COLORS.greenText
              }}
            >
              {notice.tone === "success" ? (
                <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <p className="flex-1">{notice.text}</p>
              <button
                type="button"
                onClick={() => setNotice(null)}
                aria-label="Dismiss this message"
                className={"rounded p-0.5 " + FOCUS}
              >
                <Icons.X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        {/* ---------------- Users panel ---------------- */}
        <div id="panel-users" role="tabpanel" aria-labelledby="tab-users" hidden={tab !== "users"} tabIndex={-1}>
          {tab === "users" ? (
            <div className="mt-6">
              <h2 className="sr-only">User accounts</h2>

              {tempPassword ? (
                <div
                  className="mb-6 rounded-lg border p-5"
                  style={{ borderColor: COLORS.navy, backgroundColor: "#FFFFFF" }}
                  aria-live="polite"
                >
                  <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    {tempPassword.kind === "reset" ? "New password for " : "Initial password for "}
                    {tempPassword.email}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: COLORS.neutral }}>
                    Shown once only. No email is sent — pass it on out of band, and ask them to change it on their Account
                    page.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <code
                      className="rounded-md border px-3 py-2 font-mono text-sm"
                      style={{ borderColor: COLORS.border, backgroundColor: brand.backgroundColor, color: COLORS.navy }}
                    >
                      {tempPassword.password}
                    </code>
                    <UI.Button
                      type="button"
                      onClick={copyPassword}
                      className={"inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium " + FOCUS}
                      style={{ borderColor: COLORS.border, backgroundColor: "#FFFFFF", color: COLORS.navy }}
                    >
                      {copied ? <Icons.Check className="h-4 w-4" aria-hidden="true" /> : <Icons.FileText className="h-4 w-4" aria-hidden="true" />}
                      {copied ? "Copied" : "Copy password"}
                    </UI.Button>
                    <UI.Button
                      type="button"
                      onClick={() => {
                        setTempPassword(null);
                        setCopied(false);
                      }}
                      className={"rounded-md px-3 py-2 text-sm font-medium " + FOCUS}
                      style={{ backgroundColor: "transparent", color: COLORS.neutral }}
                    >
                      Done
                    </UI.Button>
                  </div>
                </div>
              ) : null}

              {/* Stat tiles */}
              <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-lg border bg-white px-5 py-4" style={{ borderColor: COLORS.border }}>
                    <dt className="text-sm" style={{ color: COLORS.neutral }}>
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold" style={{ color: COLORS.navy }}>
                      {s.value}
                    </dd>
                    <p className="mt-1 text-xs" style={{ color: COLORS.neutral }}>
                      {s.hint}
                    </p>
                  </div>
                ))}
              </dl>

              {/* Filters */}
              <div className="mt-6 rounded-t-lg border border-b-0 bg-white p-5" style={{ borderColor: COLORS.border }}>
                <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
                  <div className="min-w-[16rem] flex-1">
                    <UI.Label htmlFor="user-search" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                      Search accounts
                    </UI.Label>
                    <div className="relative">
                      <Icons.Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        aria-hidden="true"
                        style={{ color: COLORS.neutral }}
                      />
                      <UI.Input
                        id="user-search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="name@quorq.ai"
                        className={"w-full rounded-md border bg-white py-2 pl-9 pr-3 text-sm " + FOCUS}
                        style={{ borderColor: COLORS.border, color: COLORS.navy }}
                      />
                    </div>
                  </div>

                  <div role="group" aria-label="Filter by role">
                    <p className="mb-1.5 text-sm font-medium" style={{ color: COLORS.navy }}>
                      Role
                    </p>
                    <div className="flex gap-2">
                      {[
                        { id: "all", label: "All" },
                        { id: "admin", label: "Admins" },
                        { id: "user", label: "Members" }
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={roleFilter === o.id}
                          onClick={() => setRoleFilter(o.id)}
                          className={chip(roleFilter === o.id)}
                          style={chipStyle(roleFilter === o.id)}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div role="group" aria-label="Filter by status">
                    <p className="mb-1.5 text-sm font-medium" style={{ color: COLORS.navy }}>
                      Status
                    </p>
                    <div className="flex gap-2">
                      {[
                        { id: "all", label: "All" },
                        { id: "active", label: "Active" },
                        { id: "disabled", label: "Disabled" }
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={statusFilter === o.id}
                          onClick={() => setStatusFilter(o.id)}
                          className={chip(statusFilter === o.id)}
                          style={chipStyle(statusFilter === o.id)}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm" style={{ color: COLORS.neutral }}>
                  Showing {filtered.length} of {users.length} accounts
                  {filtersActive ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className={"ml-3 rounded underline underline-offset-2 " + FOCUS}
                      style={{ color: COLORS.navy }}
                    >
                      Clear filters
                    </button>
                  ) : null}
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-b-lg border bg-white" style={{ borderColor: COLORS.border }}>
                <UI.Table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">
                    All accounts with their email address, role, status and the date they were added
                  </caption>
                  <UI.THead>
                    <UI.TR style={{ backgroundColor: brand.backgroundColor }}>
                      <UI.TH scope="col" className="px-5 py-3 font-semibold" style={{ color: COLORS.navy }}>
                        Email
                      </UI.TH>
                      <UI.TH scope="col" className="px-5 py-3 font-semibold" style={{ color: COLORS.navy }}>
                        Role
                      </UI.TH>
                      <UI.TH scope="col" className="px-5 py-3 font-semibold" style={{ color: COLORS.navy }}>
                        Status
                      </UI.TH>
                      <UI.TH scope="col" className="px-5 py-3 font-semibold" style={{ color: COLORS.navy }}>
                        Added
                      </UI.TH>
                      <UI.TH scope="col" className="px-5 py-3 text-right font-semibold" style={{ color: COLORS.navy }}>
                        Actions
                      </UI.TH>
                    </UI.TR>
                  </UI.THead>
                  <UI.TBody>
                    {filtered.length === 0 ? (
                      <UI.TR>
                        <UI.TD colSpan={5} className="px-5 py-16 text-center">
                          <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
                            No accounts match these filters
                          </p>
                          <p className="mx-auto mt-1 max-w-sm text-sm" style={{ color: COLORS.neutral }}>
                            Try a different search term, or clear the filters to see all {users.length} accounts.
                          </p>
                          <UI.Button
                            type="button"
                            onClick={clearFilters}
                            className={"mt-5 rounded-md border px-3 py-2 text-sm font-medium " + FOCUS}
                            style={{ borderColor: COLORS.border, backgroundColor: "#FFFFFF", color: COLORS.navy }}
                          >
                            Clear filters
                          </UI.Button>
                        </UI.TD>
                      </UI.TR>
                    ) : (
                      filtered.map((u) => {
                        const isSelf = u.id === CURRENT_USER_ID;
                        return (
                          <UI.TR key={u.id} className="border-t align-middle" style={{ borderColor: COLORS.border }}>
                            <UI.TH scope="row" className="px-5 py-4 text-left font-normal">
                              <div className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                                  style={{ backgroundColor: COLORS.navyTint, color: COLORS.navy }}
                                >
                                  {u.email.slice(0, 2).toUpperCase()}
                                </span>
                                <span>
                                  <span className="block font-medium" style={{ color: COLORS.navy }}>
                                    {u.email}
                                    {isSelf ? (
                                      <span
                                        className="ml-2 rounded px-1.5 py-0.5 align-middle text-[11px] font-semibold"
                                        style={{ backgroundColor: COLORS.navyTint, color: COLORS.navy }}
                                      >
                                        You
                                      </span>
                                    ) : null}
                                  </span>
                                  <span className="block text-xs" style={{ color: COLORS.neutral }}>
                                    Last seen {u.last_seen}
                                  </span>
                                </span>
                              </div>
                            </UI.TH>
                            <UI.TD className="px-5 py-4">
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                                style={
                                  u.is_admin
                                    ? { backgroundColor: COLORS.navyTint, color: COLORS.navy }
                                    : { backgroundColor: "#F1F4F7", color: COLORS.neutral }
                                }
                              >
                                {u.is_admin ? <Icons.Settings className="h-3.5 w-3.5" aria-hidden="true" /> : <Icons.User className="h-3.5 w-3.5" aria-hidden="true" />}
                                {u.is_admin ? "Admin" : "Member"}
                              </span>
                            </UI.TD>
                            <UI.TD className="px-5 py-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                                  style={
                                    u.is_enabled
                                      ? { backgroundColor: COLORS.greenTint, color: COLORS.greenText }
                                      : { backgroundColor: COLORS.redTint, color: COLORS.redText }
                                  }
                                >
                                  {u.is_enabled ? <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" /> : <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />}
                                  {u.is_enabled ? "Active" : "Disabled"}
                                </span>
                                {u.locked ? (
                                  <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                                    style={{ backgroundColor: COLORS.amberTint, color: COLORS.amberText }}
                                  >
                                    <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                    Locked 15 min
                                  </span>
                                ) : null}
                              </div>
                            </UI.TD>
                            <UI.TD className="px-5 py-4 whitespace-nowrap" style={{ color: COLORS.neutral }}>
                              {fmtDate(u.created_at)}
                            </UI.TD>
                            <UI.TD className="px-5 py-4 text-right">
                              <div className="relative inline-block text-left" data-row-menu>
                                <button
                                  type="button"
                                  aria-label={"Actions for " + u.email}
                                  aria-haspopup="menu"
                                  aria-expanded={menuFor === u.id}
                                  onClick={(e) => {
                                    menuTriggerRef.current = e.currentTarget;
                                    setMenuFor(menuFor === u.id ? null : u.id);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Escape" && menuFor === u.id) setMenuFor(null);
                                  }}
                                  className={"rounded-md border p-2 " + FOCUS}
                                  style={{ borderColor: COLORS.border, color: COLORS.navy, backgroundColor: "#FFFFFF" }}
                                >
                                  <Icons.MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                                </button>
                                {menuFor === u.id ? (
                                  <div
                                    role="menu"
                                    aria-label={"Actions for " + u.email}
                                    className="absolute right-0 z-20 mt-2 w-60 rounded-lg border bg-white py-1 text-left shadow-lg"
                                    style={{ borderColor: COLORS.border }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Escape") {
                                        e.stopPropagation();
                                        setMenuFor(null);
                                        if (menuTriggerRef.current) menuTriggerRef.current.focus();
                                      }
                                    }}
                                  >
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => openResetDialog(u)}
                                      className={"flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50 " + FOCUS}
                                      style={{ color: COLORS.navy }}
                                    >
                                      <Icons.Edit className="h-4 w-4" aria-hidden="true" />
                                      Reset password
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      disabled={isSelf}
                                      onClick={() => toggleAdmin(u)}
                                      className={"flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 " + FOCUS}
                                      style={{ color: COLORS.navy }}
                                      title={isSelf ? "You cannot change your own admin role" : undefined}
                                    >
                                      <Icons.Users className="h-4 w-4" aria-hidden="true" />
                                      {u.is_admin ? "Remove admin role" : "Make admin"}
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      disabled={isSelf}
                                      onClick={() => toggleEnabled(u)}
                                      className={"flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 " + FOCUS}
                                      style={{ color: u.is_enabled ? COLORS.redText : COLORS.navy }}
                                      title={isSelf ? "You cannot disable your own account" : undefined}
                                    >
                                      {u.is_enabled ? <Icons.X className="h-4 w-4" aria-hidden="true" /> : <Icons.Check className="h-4 w-4" aria-hidden="true" />}
                                      {u.is_enabled ? "Disable account" : "Enable account"}
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                            </UI.TD>
                          </UI.TR>
                        );
                      })
                    )}
                  </UI.TBody>
                </UI.Table>
              </div>

              <p className="mt-4 text-xs" style={{ color: COLORS.neutral }}>
                Disabling an account ends its session on the next request. New accounts are always created as ordinary
                users — grant admin explicitly.
              </p>
            </div>
          ) : null}
        </div>

        {/* ---------------- Settings panel ---------------- */}
        <div id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" hidden={tab !== "settings"} tabIndex={-1}>
          {tab === "settings" ? (
            <form className="mt-6 space-y-6" onSubmit={saveSettings} noValidate>
              <h2 className="sr-only">Runtime settings</h2>

              <section className="rounded-lg border bg-white p-6" style={{ borderColor: COLORS.border }} aria-labelledby="h-access">
                <h3 id="h-access" className="text-base font-semibold" style={{ color: COLORS.navy }}>
                  Sign-in and access
                </h3>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <span id="signup-label" className="block text-sm font-medium" style={{ color: COLORS.navy }}>
                      Self-service sign-up
                    </span>
                    <p id="signup-desc" className="mt-1 text-sm leading-6" style={{ color: COLORS.neutral }}>
                      When off, the create-account route is rejected and no sign-up link is shown on the sign-in page. Only
                      admins can add accounts.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: draft.signup_enabled ? COLORS.greenText : COLORS.neutral }}>
                      {draft.signup_enabled ? "On" : "Off"}
                    </span>
                    {renderSwitch("signup-switch", draft.signup_enabled, (v) => setDraft(Object.assign({}, draft, { signup_enabled: v })), "signup-label", "signup-desc")}
                  </div>
                </div>

                <hr className="my-6" style={{ borderColor: COLORS.border }} />

                <div className="max-w-sm">
                  <UI.Label htmlFor="min-password" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                    Minimum password length
                  </UI.Label>
                  <UI.Input
                    id="min-password"
                    type="number"
                    min="8"
                    max="64"
                    value={draft.min_password_length}
                    onChange={(e) => setDraft(Object.assign({}, draft, { min_password_length: e.target.value }))}
                    aria-invalid={settingsErrors.min_password_length ? "true" : "false"}
                    aria-describedby={settingsErrors.min_password_length ? "min-password-error" : "min-password-hint"}
                    className={fieldClass}
                    style={{ borderColor: settingsErrors.min_password_length ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                  />
                  {settingsErrors.min_password_length ? (
                    <p id="min-password-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                      <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {settingsErrors.min_password_length}
                    </p>
                  ) : (
                    <p id="min-password-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                      Applied to sign-up, admin-set passwords and password changes.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-lg border bg-white p-6" style={{ borderColor: COLORS.border }} aria-labelledby="h-answering">
                <h3 id="h-answering" className="text-base font-semibold" style={{ color: COLORS.navy }}>
                  Answering and retrieval
                </h3>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <span id="fallback-label" className="block text-sm font-medium" style={{ color: COLORS.navy }}>
                      General-knowledge fallback
                    </span>
                    <p id="fallback-desc" className="mt-1 text-sm leading-6" style={{ color: COLORS.neutral }}>
                      When no passage clears the similarity threshold, answer from Gemini's general knowledge and show a
                      "not from your documents" badge. When off, the assistant replies that it found nothing relevant.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: draft.fallback_enabled ? COLORS.greenText : COLORS.neutral }}>
                      {draft.fallback_enabled ? "On" : "Off"}
                    </span>
                    {renderSwitch("fallback-switch", draft.fallback_enabled, (v) => setDraft(Object.assign({}, draft, { fallback_enabled: v })), "fallback-label", "fallback-desc")}
                  </div>
                </div>

                <hr className="my-6" style={{ borderColor: COLORS.border }} />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <UI.Label htmlFor="answer-model" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                      Answer model
                    </UI.Label>
                    <UI.Input
                      id="answer-model"
                      type="text"
                      value={draft.answer_model}
                      onChange={(e) => setDraft(Object.assign({}, draft, { answer_model: e.target.value }))}
                      aria-invalid={settingsErrors.answer_model ? "true" : "false"}
                      aria-describedby={settingsErrors.answer_model ? "answer-model-error" : "answer-model-hint"}
                      className={fieldClass}
                      style={{ borderColor: settingsErrors.answer_model ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                    />
                    {settingsErrors.answer_model ? (
                      <p id="answer-model-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                        <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {settingsErrors.answer_model}
                      </p>
                    ) : (
                      <p id="answer-model-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                        Defaults to a Gemini Flash-Lite model.
                      </p>
                    )}
                  </div>

                  <div>
                    <UI.Label htmlFor="embedding-model" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                      Embedding model
                    </UI.Label>
                    <UI.Input
                      id="embedding-model"
                      type="text"
                      value={draft.embedding_model}
                      onChange={(e) => setDraft(Object.assign({}, draft, { embedding_model: e.target.value }))}
                      aria-invalid={settingsErrors.embedding_model ? "true" : "false"}
                      aria-describedby={settingsErrors.embedding_model ? "embedding-model-error" : "embedding-model-hint"}
                      className={fieldClass}
                      style={{ borderColor: settingsErrors.embedding_model ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                    />
                    {settingsErrors.embedding_model ? (
                      <p id="embedding-model-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                        <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {settingsErrors.embedding_model}
                      </p>
                    ) : (
                      <p id="embedding-model-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                        Must produce 768 dimensions. Changing it re-indexes nothing automatically.
                      </p>
                    )}
                  </div>

                  <div>
                    <UI.Label htmlFor="threshold" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                      Similarity threshold
                    </UI.Label>
                    <UI.Input
                      id="threshold"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={draft.similarity_threshold}
                      onChange={(e) => setDraft(Object.assign({}, draft, { similarity_threshold: e.target.value }))}
                      aria-invalid={settingsErrors.similarity_threshold ? "true" : "false"}
                      aria-describedby={settingsErrors.similarity_threshold ? "threshold-error" : "threshold-hint"}
                      className={fieldClass}
                      style={{ borderColor: settingsErrors.similarity_threshold ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                    />
                    {settingsErrors.similarity_threshold ? (
                      <p id="threshold-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                        <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {settingsErrors.similarity_threshold}
                      </p>
                    ) : (
                      <p id="threshold-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                        Cosine similarity between 0 and 1. Lower values retrieve more, loosely-related passages.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-lg border bg-white p-6" style={{ borderColor: COLORS.border }} aria-labelledby="h-key">
                <h3 id="h-key" className="text-base font-semibold" style={{ color: COLORS.navy }}>
                  Gemini API key
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: COLORS.greenTint, color: COLORS.greenText }}
                  >
                    <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Key configured
                  </span>
                  <p className="text-sm" style={{ color: COLORS.neutral }}>
                    Read from <code className="font-mono">backend/.env</code>. It is never displayed here, returned by the
                    API, or written to logs — change it on the server and restart.
                  </p>
                </div>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white px-6 py-4" style={{ borderColor: COLORS.border }}>
                <p className="text-sm" style={{ color: COLORS.neutral }}>
                  Last saved {savedAt} by {savedBy}
                </p>
                <div className="flex items-center gap-3">
                  <UI.Button
                    type="button"
                    onClick={discard}
                    disabled={!dirty}
                    className={"rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 " + FOCUS}
                    style={{ borderColor: COLORS.border, backgroundColor: "#FFFFFF", color: COLORS.navy }}
                  >
                    Discard changes
                  </UI.Button>
                  <UI.Button
                    type="submit"
                    disabled={!dirty}
                    className={"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 " + FOCUS}
                    style={{ backgroundColor: COLORS.navy, color: "#FFFFFF" }}
                  >
                    <Icons.Check className="h-4 w-4" aria-hidden="true" />
                    Save settings
                  </UI.Button>
                </div>
              </div>

              <p className="text-xs" style={{ color: COLORS.neutral }}>
                These values live in the <code className="font-mono">settings</code> table and are read per request. See the{" "}
                <button
                  type="button"
                  onClick={() => navigate("docs")}
                  className={"rounded underline underline-offset-2 " + FOCUS}
                  style={{ color: COLORS.navy }}
                >
                  API reference
                </button>{" "}
                for <code className="font-mono">GET</code> / <code className="font-mono">PUT /api/admin/settings</code>.
              </p>
            </form>
          ) : null}
        </div>
      </div>

      {/* ---------------- Dialogs ---------------- */}
      {dialog ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 sm:items-center">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onKeyDown={onDialogKeyDown}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            {dialog.kind === "add" ? (
              <form onSubmit={submitAddUser} noValidate>
                <div className="flex items-start justify-between gap-4">
                  <h2 id="dialog-title" className="text-lg font-semibold" style={{ color: COLORS.navy }}>
                    Add user
                  </h2>
                  <button type="button" onClick={closeDialog} aria-label="Close add user dialog" className={"rounded p-1 " + FOCUS} style={{ color: COLORS.neutral }}>
                    <Icons.X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-1 text-sm" style={{ color: COLORS.neutral }}>
                  The account is created as an ordinary user. You can grant admin afterwards from the row menu.
                </p>

                <div className="mt-5">
                  <UI.Label htmlFor="add-email" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                    Work email
                  </UI.Label>
                  <UI.Input
                    id="add-email"
                    data-autofocus
                    type="email"
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                    aria-invalid={addErrors.email ? "true" : "false"}
                    aria-describedby={addErrors.email ? "add-email-error" : undefined}
                    className={fieldClass}
                    style={{ borderColor: addErrors.email ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                  />
                  {addErrors.email ? (
                    <p id="add-email-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                      <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {addErrors.email}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4">
                  <UI.Label htmlFor="add-password" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                    Initial password
                  </UI.Label>
                  <UI.Input
                    id="add-password"
                    type="text"
                    value={addPassword}
                    onChange={(e) => setAddPassword(e.target.value)}
                    aria-invalid={addErrors.password ? "true" : "false"}
                    aria-describedby={addErrors.password ? "add-password-error" : "add-password-hint"}
                    className={fieldClass + " font-mono"}
                    style={{ borderColor: addErrors.password ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                  />
                  {addErrors.password ? (
                    <p id="add-password-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                      <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {addErrors.password}
                    </p>
                  ) : (
                    <p id="add-password-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                      At least {minLen} characters. Stored bcrypt-hashed and shown to you once.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setAddPassword(makePassword())}
                    className={"mt-2 rounded text-sm underline underline-offset-2 " + FOCUS}
                    style={{ color: COLORS.navy }}
                  >
                    Suggest another password
                  </button>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <UI.Button
                    type="button"
                    onClick={closeDialog}
                    className={"rounded-md border px-4 py-2 text-sm font-medium " + FOCUS}
                    style={{ borderColor: COLORS.border, backgroundColor: "#FFFFFF", color: COLORS.navy }}
                  >
                    Cancel
                  </UI.Button>
                  <UI.Button
                    type="submit"
                    className={"rounded-md px-4 py-2 text-sm font-medium " + FOCUS}
                    style={{ backgroundColor: COLORS.navy, color: "#FFFFFF" }}
                  >
                    Create account
                  </UI.Button>
                </div>
              </form>
            ) : (
              <form onSubmit={submitReset} noValidate>
                <div className="flex items-start justify-between gap-4">
                  <h2 id="dialog-title" className="text-lg font-semibold" style={{ color: COLORS.navy }}>
                    Reset password
                  </h2>
                  <button type="button" onClick={closeDialog} aria-label="Close reset password dialog" className={"rounded p-1 " + FOCUS} style={{ color: COLORS.neutral }}>
                    <Icons.X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-1 text-sm" style={{ color: COLORS.neutral }}>
                  Setting a new password for <span className="font-medium" style={{ color: COLORS.navy }}>{dialog.user.email}</span>.
                  Their failed-attempt counter and any active lock are cleared. No email is sent.
                </p>

                <div className="mt-5">
                  <UI.Label htmlFor="reset-password" className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.navy }}>
                    New password
                  </UI.Label>
                  <UI.Input
                    id="reset-password"
                    data-autofocus
                    type="text"
                    value={resetValue}
                    onChange={(e) => setResetValue(e.target.value)}
                    aria-invalid={resetError ? "true" : "false"}
                    aria-describedby={resetError ? "reset-password-error" : "reset-password-hint"}
                    className={fieldClass + " font-mono"}
                    style={{ borderColor: resetError ? COLORS.redText : COLORS.border, color: COLORS.navy }}
                  />
                  {resetError ? (
                    <p id="reset-password-error" className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: COLORS.redText }}>
                      <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {resetError}
                    </p>
                  ) : (
                    <p id="reset-password-hint" className="mt-1.5 text-sm" style={{ color: COLORS.neutral }}>
                      At least {minLen} characters. Shown to you once after saving.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setResetValue(makePassword())}
                    className={"mt-2 rounded text-sm underline underline-offset-2 " + FOCUS}
                    style={{ color: COLORS.navy }}
                  >
                    Suggest another password
                  </button>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <UI.Button
                    type="button"
                    onClick={closeDialog}
                    className={"rounded-md border px-4 py-2 text-sm font-medium " + FOCUS}
                    style={{ borderColor: COLORS.border, backgroundColor: "#FFFFFF", color: COLORS.navy }}
                  >
                    Cancel
                  </UI.Button>
                  <UI.Button
                    type="submit"
                    className={"rounded-md px-4 py-2 text-sm font-medium " + FOCUS}
                    style={{ backgroundColor: COLORS.navy, color: "#FFFFFF" }}
                  >
                    Set password
                  </UI.Button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
