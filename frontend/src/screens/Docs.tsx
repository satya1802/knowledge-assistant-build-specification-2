// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardContent, Input, Label, Select, Table, THead, TBody, TR, TH, TD } = UI;
const { Search, Check, X, ChevronRight, ChevronDown, FileText, Filter, Download, Upload, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const NAVY = "#0E2A47";
const GREEN = "#2E8B6B";

const FILE_TYPES = [
  {
    ext: ".pdf",
    label: "PDF",
    how: "Text read page by page with pypdf. A page with almost no text is treated as a scan and read with local Tesseract OCR.",
    limit: "25 MB",
  },
  {
    ext: ".docx",
    label: "Word document",
    how: "Paragraphs and table cells are both extracted, so a fact that only appears in a table is still retrievable.",
    limit: "25 MB",
  },
  {
    ext: ".txt",
    label: "Plain text",
    how: "Read as UTF-8 and chunked directly.",
    limit: "25 MB",
  },
  {
    ext: ".md",
    label: "Markdown",
    how: "Read as UTF-8. Markdown structure is kept readable rather than stripped out.",
    limit: "25 MB",
  },
];

const STEPS = [
  {
    title: "Sign in with your work email",
    body:
      "Use the email and password your administrator gave you. There is no self-service password reset — if you are locked out, an admin sets a new password and passes it to you directly. Five wrong attempts in 15 minutes locks the address for 15 minutes.",
  },
  {
    title: "Add what the assistant should know",
    body:
      "Open Knowledge base and drop files on the dropzone, or focus it and press Enter to open the file picker. Uploads are shared with everyone in the company — there are no per-document permissions. Each file shows as Processing, then Ready, or Failed with a plain-English reason.",
  },
  {
    title: "Ask a question in your own words",
    body:
      "Your question is matched against every indexed passage before a single word is written. The answer streams back as it is generated, usually starting within about two seconds. Copy, Read aloud, Regenerate and Stop sit under each answer.",
  },
  {
    title: "Check the sources before you act on it",
    body:
      "Numbered chips such as [1] and [2] appear under an answer. Select one to open the source panel with the document name, page number and the exact passage used, plus a link to download the original file. Escape closes the panel and returns you to the chip.",
  },
];

const ENDPOINTS = [
  {
    id: "post-auth-login",
    group: "Authentication",
    method: "POST",
    path: "/api/auth/login",
    auth: "public",
    summary: "Verify credentials and start a server-side session.",
    notes:
      "Unknown email, wrong password, a disabled account and a locked-out address all return the identical 401 body, so account existence is never disclosed.",
    request:
      '{\n  "email": "dana.whitfield@northgate.example",\n  "password": "••••••••••"\n}',
    response:
      '200 OK\nSet-Cookie: ka_session=1f9c…; HttpOnly; SameSite=Lax; Path=/\n\n{\n  "id": 7,\n  "email": "dana.whitfield@northgate.example",\n  "is_admin": false,\n  "is_enabled": true,\n  "created_at": "2026-03-02T09:14:51Z"\n}',
    errors: [
      ["400", "invalid_request", "Email and password are required."],
      ["401", "invalid_credentials", "Incorrect email or password."],
      ["429", "too_many_attempts", "Incorrect email or password."],
    ],
  },
  {
    id: "post-auth-logout",
    group: "Authentication",
    method: "POST",
    path: "/api/auth/logout",
    auth: "session",
    summary: "Destroy the server-side session and clear the cookie.",
    notes: "Safe to call with an already-expired cookie; the response is the same.",
    request: null,
    response: '204 No Content\nSet-Cookie: ka_session=; Max-Age=0; Path=/',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "post-auth-signup",
    group: "Authentication",
    method: "POST",
    path: "/api/auth/signup",
    auth: "public",
    summary: "Create an account when self-service signup is enabled.",
    notes:
      "The very first account created on an empty user table becomes an admin. Every account after that is an ordinary user until an admin grants the role. When the signup setting is off this route is rejected even by direct POST.",
    request:
      '{\n  "email": "rafael.ortiz@northgate.example",\n  "password": "••••••••••"\n}',
    response:
      '201 Created\n\n{\n  "id": 24,\n  "email": "rafael.ortiz@northgate.example",\n  "is_admin": false,\n  "is_enabled": true\n}',
    errors: [
      ["403", "signup_disabled", "Account creation is disabled. Ask an administrator for an account."],
      ["409", "email_in_use", "An account already exists for this email. Sign in instead."],
      ["422", "password_too_short", "Password must be at least 10 characters."],
    ],
  },
  {
    id: "get-me",
    group: "Account",
    method: "GET",
    path: "/api/me",
    auth: "session",
    summary: "Return the signed-in user behind the current cookie.",
    notes: "The session id from the cookie is parsed as a UUID before lookup, so a well-formed cookie never raises a type error.",
    request: null,
    response:
      '200 OK\n\n{\n  "id": 7,\n  "email": "dana.whitfield@northgate.example",\n  "is_admin": false,\n  "is_enabled": true,\n  "theme": "system"\n}',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "post-me-password",
    group: "Account",
    method: "POST",
    path: "/api/me/password",
    auth: "session",
    summary: "Change your own password.",
    notes: "The new value is stored bcrypt-hashed. Other sessions for the same user are left intact.",
    request:
      '{\n  "current_password": "••••••••",\n  "new_password": "••••••••••••"\n}',
    response: '204 No Content',
    errors: [
      ["401", "wrong_current_password", "Your current password is not correct."],
      ["422", "password_too_short", "Password must be at least 10 characters."],
    ],
  },
  {
    id: "get-me-theme",
    group: "Account",
    method: "GET",
    path: "/api/me/theme",
    auth: "session",
    summary: "Read the stored appearance preference.",
    notes: null,
    request: null,
    response: '200 OK\n\n{ "theme": "system" }',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "put-me-theme",
    group: "Account",
    method: "PUT",
    path: "/api/me/theme",
    auth: "session",
    summary: "Save Light, Dark or System appearance against your account.",
    notes: "Stored server-side, so the choice follows you to another browser or machine.",
    request: '{ "theme": "dark" }',
    response: '200 OK\n\n{ "theme": "dark" }',
    errors: [["422", "invalid_theme", "Theme must be one of: light, dark, system."]],
  },
  {
    id: "get-admin-users",
    group: "Administration",
    method: "GET",
    path: "/api/admin/users",
    auth: "admin",
    summary: "List every account with its role and enabled state.",
    notes: "Password hashes are never included in any response.",
    request: null,
    response:
      '200 OK\n\n{\n  "users": [\n    { "id": 1, "email": "satya.ganaraju@northgate.example",\n      "is_admin": true,  "is_enabled": true,\n      "created_at": "2026-01-19T08:02:11Z" },\n    { "id": 7, "email": "dana.whitfield@northgate.example",\n      "is_admin": false, "is_enabled": true,\n      "created_at": "2026-03-02T09:14:51Z" },\n    { "id": 18, "email": "tom.brennan@northgate.example",\n      "is_admin": false, "is_enabled": false,\n      "created_at": "2026-07-28T13:40:02Z" }\n  ]\n}',
    errors: [
      ["401", "not_authenticated", "Sign in to continue."],
      ["403", "admin_required", "You do not have access to this resource."],
    ],
  },
  {
    id: "post-admin-users",
    group: "Administration",
    method: "POST",
    path: "/api/admin/users",
    auth: "admin",
    summary: "Create an account with an initial password.",
    notes: "Always created as an ordinary user; grant the admin role afterwards with PATCH.",
    request:
      '{\n  "email": "priya.raman@northgate.example",\n  "password": "••••••••••••"\n}',
    response:
      '201 Created\n\n{ "id": 25, "email": "priya.raman@northgate.example",\n  "is_admin": false, "is_enabled": true }',
    errors: [
      ["403", "admin_required", "You do not have access to this resource."],
      ["409", "email_in_use", "An account already exists for this email."],
    ],
  },
  {
    id: "patch-admin-user",
    group: "Administration",
    method: "PATCH",
    path: "/api/admin/users/{id}",
    auth: "admin",
    summary: "Enable, disable, promote or demote an account.",
    notes:
      "Disabling takes effect on that user's next request — their existing session stops working immediately. An admin cannot remove their own last admin role.",
    request: '{ "is_admin": true, "is_enabled": true }',
    response: '200 OK\n\n{ "id": 7, "is_admin": true, "is_enabled": true }',
    errors: [
      ["403", "admin_required", "You do not have access to this resource."],
      ["404", "not_found", "Resource not found."],
      ["409", "last_admin", "At least one enabled admin must remain."],
    ],
  },
  {
    id: "post-admin-reset",
    group: "Administration",
    method: "POST",
    path: "/api/admin/users/{id}/reset-password",
    auth: "admin",
    summary: "Set a new password and clear any lockout.",
    notes:
      "No email is sent. The new password is returned once in this response for the admin to pass on out of band, and the user's failed-attempt counter and active lock are cleared.",
    request: '{ "new_password": "••••••••••••" }',
    response: '200 OK\n\n{ "id": 18, "password_set": true, "lock_cleared": true }',
    errors: [
      ["403", "admin_required", "You do not have access to this resource."],
      ["404", "not_found", "Resource not found."],
      ["422", "password_too_short", "Password must be at least 10 characters."],
    ],
  },
  {
    id: "get-admin-settings",
    group: "Administration",
    method: "GET",
    path: "/api/admin/settings",
    auth: "admin",
    summary: "Read the runtime settings stored in the database.",
    notes: "The Gemini API key is never returned — only a boolean saying whether one is configured.",
    request: null,
    response:
      '200 OK\n\n{\n  "signup_enabled": false,\n  "general_knowledge_fallback": true,\n  "answer_model": "gemini-flash-lite",\n  "embedding_model": "text-embedding-768",\n  "similarity_threshold": 0.62,\n  "gemini_key_configured": true\n}',
    errors: [["403", "admin_required", "You do not have access to this resource."]],
  },
  {
    id: "put-admin-settings",
    group: "Administration",
    method: "PUT",
    path: "/api/admin/settings",
    auth: "admin",
    summary: "Update runtime settings without a redeploy.",
    notes: "Saved values are picked up by the next question asked — no restart.",
    request:
      '{\n  "signup_enabled": false,\n  "general_knowledge_fallback": true,\n  "similarity_threshold": 0.62\n}',
    response: '200 OK\n\n{ "updated_at": "2026-10-12T07:55:04Z" }',
    errors: [
      ["403", "admin_required", "You do not have access to this resource."],
      ["422", "invalid_threshold", "Similarity threshold must be between 0 and 1."],
    ],
  },
  {
    id: "post-documents",
    group: "Knowledge base",
    method: "POST",
    path: "/api/documents",
    auth: "session",
    summary: "Upload a file and queue it for background processing.",
    notes:
      "multipart/form-data. Returns immediately with status \"processing\"; extraction, chunking and embedding run in a background worker. Several files may be posted at once — each is accepted or rejected on its own.",
    request:
      'Content-Type: multipart/form-data\n\nfile: Expenses-Policy-2026.pdf (1.8 MB)',
    response:
      '202 Accepted\n\n{\n  "id": 142,\n  "filename": "Expenses-Policy-2026.pdf",\n  "file_type": "pdf",\n  "size_bytes": 1884160,\n  "uploader_id": 7,\n  "status": "processing",\n  "passage_count": 0,\n  "created_at": "2026-10-12T08:31:20Z"\n}',
    errors: [
      ["401", "not_authenticated", "Sign in to continue."],
      ["413", "file_too_large", "Files must be 25 MB or smaller."],
      ["415", "unsupported_type", "Accepted file types are PDF, DOCX, TXT and MD."],
    ],
  },
  {
    id: "get-documents",
    group: "Knowledge base",
    method: "GET",
    path: "/api/documents",
    auth: "session",
    summary: "List the shared knowledge base, with search and filters.",
    notes:
      "Query parameters: q (case-insensitive filename match), status (processing | ready | failed), file_type. The Knowledge base page polls this every few seconds while anything is processing, and stops polling when nothing is.",
    request: 'GET /api/documents?q=expenses&status=ready',
    response:
      '200 OK\n\n{\n  "documents": [\n    { "id": 139, "filename": "Expenses-Policy-2026.pdf",\n      "file_type": "pdf", "size_bytes": 1884160,\n      "uploader_id": 7, "status": "ready",\n      "passage_count": 86, "ocr_note": null,\n      "created_at": "2026-10-09T15:12:00Z" },\n    { "id": 141, "filename": "Scanned-Travel-Form.pdf",\n      "file_type": "pdf", "size_bytes": 6291456,\n      "uploader_id": 3, "status": "ready",\n      "passage_count": 24,\n      "ocr_note": "12 pages read with Tesseract OCR",\n      "created_at": "2026-10-11T10:04:33Z" },\n    { "id": 140, "filename": "Board-Pack-Q3.pdf",\n      "file_type": "pdf", "size_bytes": 9437184,\n      "uploader_id": 1, "status": "failed",\n      "status_reason": "Password-protected PDF could not be opened",\n      "passage_count": 0,\n      "created_at": "2026-10-10T11:48:19Z" }\n  ]\n}',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "get-documents-stats",
    group: "Knowledge base",
    method: "GET",
    path: "/api/documents/stats",
    auth: "session",
    summary: "Counts for the stat tiles above the document table.",
    notes: null,
    request: null,
    response:
      '200 OK\n\n{\n  "total": 148,\n  "ready": 141,\n  "processing": 3,\n  "failed": 4,\n  "indexed_passages": 11_642\n}',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "get-document-download",
    group: "Knowledge base",
    method: "GET",
    path: "/api/documents/{id}/download",
    auth: "session",
    summary: "Download the original file from the server's disk.",
    notes: "Returned with the original filename and the correct content type. Files are stored on the server's own disk, not in cloud storage.",
    request: null,
    response:
      '200 OK\nContent-Type: application/pdf\nContent-Disposition: attachment;\n  filename="Expenses-Policy-2026.pdf"',
    errors: [
      ["401", "not_authenticated", "Sign in to continue."],
      ["404", "not_found", "Resource not found."],
    ],
  },
  {
    id: "delete-document",
    group: "Knowledge base",
    method: "DELETE",
    path: "/api/documents/{id}",
    auth: "session",
    summary: "Delete a document, its file, its chunks and its embeddings.",
    notes:
      "Permitted for the uploader and for any admin. Deletion is outright — no retention copy — and the removed passages stop being returned as sources immediately.",
    request: null,
    response: '204 No Content',
    errors: [
      ["403", "not_your_document", "You do not have access to this resource."],
      ["404", "not_found", "Resource not found."],
    ],
  },
  {
    id: "post-chat-stream",
    group: "Chat",
    method: "POST",
    path: "/api/chat/stream",
    auth: "session",
    summary: "Ask a question and stream the answer over Server-Sent Events.",
    notes:
      "Passages are embedded and scored by cosine similarity; only those at or above the configured threshold (0.62 by default) are used. If nothing clears it and the fallback setting is on, the answer comes from general knowledge with from_documents = false. Keep-alive pings hold the connection open while retrieval runs.",
    request:
      '{\n  "conversation_id": 58,\n  "question": "How many days do I have to claim expenses?"\n}',
    response:
      'Content-Type: text/event-stream\n\nevent: ping\ndata: {}\n\nevent: token\ndata: {"text": "Expenses must be claimed "}\n\nevent: token\ndata: {"text": "within 30 days of being incurred"}\n\nevent: sources\ndata: {"sources": [\n  {"chip_number": 1, "document_id": 139,\n   "filename": "Expenses-Policy-2026.pdf",\n   "page_number": 4, "score": 0.81,\n   "passage_text": "Claims must be submitted …"}\n]}\n\nevent: done\ndata: {"message_id": 913, "from_documents": true,\n       "stopped": false}',
    errors: [
      ["401", "not_authenticated", "Sign in to continue."],
      ["429", "quota_exhausted", "The Gemini quota is exhausted. Try again later."],
      ["503", "model_unavailable", "Service unavailable, please try again."],
    ],
  },
  {
    id: "post-chat-stop",
    group: "Chat",
    method: "POST",
    path: "/api/chat/stop",
    auth: "session",
    summary: "Cancel generation for an open stream.",
    notes: "Streaming halts within about a second and the partial answer is kept in the thread with stopped = true.",
    request: '{ "message_id": 913 }',
    response: '200 OK\n\n{ "message_id": 913, "stopped": true }',
    errors: [["404", "not_found", "Resource not found."]],
  },
  {
    id: "get-conversations",
    group: "Conversations",
    method: "GET",
    path: "/api/conversations",
    auth: "session",
    summary: "List your own conversations, newest first.",
    notes:
      "Only ever returns the caller's own conversations. Timestamps are stored naive and treated as UTC, so sidebar date grouping never lands a conversation under the wrong day. Query parameter q searches titles and message text.",
    request: 'GET /api/conversations?q=expenses',
    response:
      '200 OK\n\n{\n  "conversations": [\n    { "id": 58, "title": "Expense claim deadline",\n      "updated_at": "2026-10-12T08:22:40Z" },\n    { "id": 55, "title": "Parental leave notice period",\n      "updated_at": "2026-10-11T16:09:02Z" },\n    { "id": 49, "title": "Laptop replacement cycle",\n      "updated_at": "2026-10-06T09:31:55Z" }\n  ]\n}',
    errors: [["401", "not_authenticated", "Sign in to continue."]],
  },
  {
    id: "get-conversation",
    group: "Conversations",
    method: "GET",
    path: "/api/conversations/{id}",
    auth: "session",
    summary: "Restore a full thread with its messages and sources.",
    notes:
      "Another user's conversation returns 404, not 403, so the existence of a conversation is never disclosed — not even to an admin.",
    request: null,
    response:
      '200 OK\n\n{\n  "id": 58,\n  "title": "Expense claim deadline",\n  "messages": [\n    { "id": 912, "role": "user",\n      "content": "How many days do I have to claim expenses?" },\n    { "id": 913, "role": "assistant",\n      "content": "Expenses must be claimed within 30 days …",\n      "from_documents": true, "stopped": false,\n      "sources": [ { "chip_number": 1, "document_id": 139,\n        "page_number": 4 } ] }\n  ]\n}',
    errors: [["404", "not_found", "Resource not found."]],
  },
  {
    id: "delete-conversation",
    group: "Conversations",
    method: "DELETE",
    path: "/api/conversations/{id}",
    auth: "session",
    summary: "Delete a conversation and all of its messages outright.",
    notes: "No retention copy is kept, so a later history search cannot return the deleted text.",
    request: null,
    response: '204 No Content',
    errors: [["404", "not_found", "Resource not found."]],
  },
];

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const AUTH_LABELS = {
  public: "No sign-in",
  session: "Session cookie",
  admin: "Admin role",
};

const GROUP_ORDER = [
  "Authentication",
  "Account",
  "Administration",
  "Knowledge base",
  "Chat",
  "Conversations",
];

function AuthPill({ level }) {
  const isPublic = level === "public";
  const isAdmin = level === "admin";
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium"
      style={{
        borderColor: isPublic ? "#CBD5E1" : isAdmin ? NAVY : GREEN,
        color: isPublic ? "#334155" : isAdmin ? NAVY : "#1F6B51",
        backgroundColor: isPublic ? "#F1F5F9" : isAdmin ? "#EAF0F6" : "#ECF6F1",
      }}
    >
      {isPublic ? "○" : isAdmin ? "★" : "●"}
      <span>{AUTH_LABELS[level]}</span>
    </span>
  );
}

function CodeBlock({ label, text }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <pre
        className="overflow-x-auto rounded-lg px-4 py-3 text-[13px] leading-relaxed text-slate-100"
        style={{ backgroundColor: NAVY }}
      >
        <code className="font-mono">{text}</code>
      </pre>
    </div>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const { Button, Card, CardContent, Input, Label, Table, THead, TBody, TR, TH, TD } = UI;
  const { Search, X, ChevronRight, ChevronDown, FileText, CheckCircle, AlertCircle, ArrowRight } = Icons;

  const [tab, setTab] = React.useState("start");
  const [query, setQuery] = React.useState("");
  const [method, setMethod] = React.useState("all");
  const [auth, setAuth] = React.useState("all");
  const [open, setOpen] = React.useState({ "post-chat-stream": true });
  const [copied, setCopied] = React.useState(null);

  const apiPanelRef = React.useRef(null);
  const tabRefs = { start: React.useRef(null), api: React.useRef(null) };

  const q = query.trim().toLowerCase();
  const results = ENDPOINTS.filter((e) => {
    if (method !== "all" && e.method !== method) return false;
    if (auth !== "all" && e.auth !== auth) return false;
    if (!q) return true;
    return (
      e.path.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.group.toLowerCase().includes(q) ||
      e.method.toLowerCase().includes(q)
    );
  });

  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: results.filter((e) => e.group === g),
  })).filter((g) => g.items.length > 0);

  const filtersActive = q !== "" || method !== "all" || auth !== "all";

  function clearFilters() {
    setQuery("");
    setMethod("all");
    setAuth("all");
  }

  function toggle(id) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    const next = {};
    results.forEach((e) => {
      next[e.id] = true;
    });
    setOpen(next);
  }

  function copyPath(path) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(path);
      }
    } catch (err) {
      /* clipboard unavailable — confirmation still shown */
    }
    setCopied(path);
  }

  function goToApi() {
    setTab("api");
    window.requestAnimationFrame(() => {
      if (apiPanelRef.current) apiPanelRef.current.focus();
    });
  }

  function onTabKeyDown(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tab === "start" ? "api" : "start";
    setTab(next);
    window.requestAnimationFrame(() => {
      const r = tabRefs[next].current;
      if (r) r.focus();
    });
  }

  const tabBtn = (id, label) => {
    const active = tab === id;
    return (
      <button
        type="button"
        role="tab"
        id={"tab-" + id}
        ref={tabRefs[id]}
        aria-selected={active}
        aria-controls={"panel-" + id}
        tabIndex={active ? 0 : -1}
        onClick={() => setTab(id)}
        onKeyDown={onTabKeyDown}
        className="-mb-px border-b-2 px-1 pb-3 pt-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2"
        style={{
          borderColor: active ? GREEN : "transparent",
          color: active ? NAVY : "#5A6B7B",
        }}
      >
        {label}
      </button>
    );
  };

  const filterBtn = (label, selected, onClick, key) => (
    <button
      key={key}
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2"
      style={{
        borderColor: selected ? NAVY : "#D7DEE5",
        backgroundColor: selected ? NAVY : "#FFFFFF",
        color: selected ? "#FFFFFF" : "#33414F",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8"
      style={{ fontFamily: brand.fontBody, color: "#1F2A36" }}
    >
      <header>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" style={{ color: GREEN }} />
          Public page — no sign-in required
        </p>
        <h1
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ fontFamily: brand.fontHeading, color: NAVY }}
        >
          Knowledge Assistant documentation
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Knowledge Assistant answers employees' questions from one shared company knowledge base and
          cites the passages it used. This page covers how to start using it and the REST API behind
          every screen.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={() => navigate("sign-in")} style={{ backgroundColor: NAVY, color: "#FFFFFF" }}>
            Sign in
          </Button>
          <Button variant="outline" onClick={goToApi}>
            Jump to the API reference
          </Button>
          <span className="text-sm text-slate-500">API v1 &middot; updated 8 October 2026</span>
        </div>
      </header>

      <div className="mt-10 border-b border-slate-200">
        <div role="tablist" aria-label="Documentation sections" className="flex gap-8">
          {tabBtn("start", "Getting started")}
          {tabBtn("api", "API reference")}
        </div>
      </div>

      {/* ---------------- Getting started ---------------- */}
      <section
        role="tabpanel"
        id="panel-start"
        aria-labelledby="tab-start"
        hidden={tab !== "start"}
        tabIndex={0}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-4"
      >
        {tab === "start" && (
          <div className="mt-8 space-y-12">
            <section aria-labelledby="h-steps">
              <h2
                id="h-steps"
                className="text-xl font-semibold"
                style={{ fontFamily: brand.fontHeading, color: NAVY }}
              >
                Getting started in four steps
              </h2>
              <ol className="mt-6 space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: NAVY }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: NAVY }}>
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="h-files">
              <h2
                id="h-files"
                className="text-xl font-semibold"
                style={{ fontFamily: brand.fontHeading, color: NAVY }}
              >
                What you can upload
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
                Four file types, up to 25 MB each. Anything else — a spreadsheet or an image, for
                example — is refused at upload with a message naming the accepted types. English-language
                documents only in this release.
              </p>
              <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <Table>
                  <THead>
                    <TR>
                      <TH scope="col">File type</TH>
                      <TH scope="col">Extension</TH>
                      <TH scope="col">How it is read</TH>
                      <TH scope="col">Size limit</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {FILE_TYPES.map((f) => (
                      <TR key={f.ext}>
                        <TD>
                          <span className="inline-flex items-center gap-2 font-medium" style={{ color: NAVY }}>
                            <FileText className="h-4 w-4" aria-hidden="true" style={{ color: "#5A6B7B" }} />
                            {f.label}
                          </span>
                        </TD>
                        <TD>
                          <code className="font-mono text-[13px] text-slate-700">{f.ext}</code>
                        </TD>
                        <TD>
                          <span className="block max-w-md text-sm leading-relaxed text-slate-600">{f.how}</span>
                        </TD>
                        <TD>
                          <span className="whitespace-nowrap text-sm text-slate-600">{f.limit}</span>
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            </section>

            <section aria-labelledby="h-citations">
              <h2
                id="h-citations"
                className="text-xl font-semibold"
                style={{ fontFamily: brand.fontHeading, color: NAVY }}
              >
                Reading an answer
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold" style={{ color: NAVY }}>
                      Answers with sources
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      When your question matches company material, the answer carries numbered chips.
                      Each chip opens a panel with the document, the page number where the format
                      provides one, and the exact passage — including passages recovered from scanned
                      pages by OCR.
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <span className="sr-only">Example source chips:</span>
                      {[1, 2, 3].map((n) => (
                        <span
                          key={n}
                          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                          style={{ borderColor: "#CBD9D2", backgroundColor: "#ECF6F1", color: "#1F6B51" }}
                        >
                          [{n}] {n === 1 ? "Expenses-Policy-2026.pdf" : n === 2 ? "Travel-Rules.docx" : "Finance-FAQ.md"}
                        </span>
                      ))}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold" style={{ color: NAVY }}>
                      The "not from your documents" badge
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      If no passage scores at or above the similarity threshold, the assistant may answer
                      from the model's general knowledge instead. That answer is marked with the badge
                      below and shows no source chips, so general knowledge is never mistaken for company
                      policy. An admin can switch the fallback off entirely.
                    </p>
                    <p className="mt-4">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                        style={{ borderColor: "#C8A227", backgroundColor: "#FDF6E3", color: "#6B5210" }}
                      >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Not from your documents
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section aria-labelledby="h-a11y">
              <h2
                id="h-a11y"
                className="text-xl font-semibold"
                style={{ fontFamily: brand.fontHeading, color: NAVY }}
              >
                Keyboard, screen readers and themes
              </h2>
              <ul className="mt-5 max-w-3xl space-y-3 text-[15px] leading-relaxed text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: GREEN }} />
                  <span>
                    Every control is reachable by Tab in reading order with a visible focus ring, and
                    operable with Enter or Space — including the upload dropzone, which opens the file
                    picker from the keyboard.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: GREEN }} />
                  <span>
                    The source panel and any dialog trap focus, close with Escape, and return focus to
                    the control that opened them.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: GREEN }} />
                  <span>
                    Read aloud uses the browser's own speech synthesis. Where a browser has none, the
                    control is disabled and says why.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: GREEN }} />
                  <span>
                    Light, Dark and System appearance are chosen on the Account page and stored against
                    your account, so the choice follows you between machines.
                  </span>
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="h-next"
              className="rounded-lg border border-slate-200 bg-white p-7"
            >
              <h2 id="h-next" className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading, color: NAVY }}>
                Ready to begin?
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
                Sign in with the credentials your administrator issued. If you do not have an account
                yet and self-service signup is switched off for your company, ask an admin to add you —
                they can set your password and pass it on directly.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => navigate("sign-in")} style={{ backgroundColor: NAVY, color: "#FFFFFF" }}>
                  Go to sign in
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" onClick={goToApi}>
                  Read the API reference
                </Button>
              </div>
            </section>
          </div>
        )}
      </section>

      {/* ---------------- API reference ---------------- */}
      <section
        role="tabpanel"
        id="panel-api"
        aria-labelledby="tab-api"
        hidden={tab !== "api"}
        tabIndex={-1}
        ref={apiPanelRef}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-4"
      >
        {tab === "api" && (
          <div className="mt-8">
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: brand.fontHeading, color: NAVY }}
            >
              API reference
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              Every screen in the product is driven by these endpoints — there is no private back
              channel. Requests and responses are JSON unless noted. Authentication is the HTTP-only
              session cookie set by{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800">
                POST /api/auth/login
              </code>
              . Calls without a valid session return 401; calls without the admin role return 403.
            </p>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-5">
                <div>
                  <Label htmlFor="api-search">Search endpoints</Label>
                  <div className="relative mt-1.5">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <Input
                      id="api-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="documents, chat, reset-password…"
                      className="pl-9 pr-10"
                    />
                    {query !== "" && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear endpoint search"
                        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div role="group" aria-label="Filter by HTTP method">
                    <p className="text-sm font-medium text-slate-700">Method</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {filterBtn("All", method === "all", () => setMethod("all"), "m-all")}
                      {METHODS.map((m) => filterBtn(m, method === m, () => setMethod(m), "m-" + m))}
                    </div>
                  </div>
                  <div role="group" aria-label="Filter by authentication requirement">
                    <p className="text-sm font-medium text-slate-700">Authentication</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {filterBtn("All", auth === "all", () => setAuth("all"), "a-all")}
                      {filterBtn("No sign-in", auth === "public", () => setAuth("public"), "a-public")}
                      {filterBtn("Session cookie", auth === "session", () => setAuth("session"), "a-session")}
                      {filterBtn("Admin role", auth === "admin", () => setAuth("admin"), "a-admin")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600" role="status">
                Showing {results.length} of {ENDPOINTS.length} endpoints
                {filtersActive ? " matching your filters" : ""}
              </p>
              <div className="flex gap-2">
                {results.length > 0 && (
                  <Button variant="outline" size="sm" onClick={expandAll}>
                    Expand all
                  </Button>
                )}
                {results.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setOpen({})}>
                    Collapse all
                  </Button>
                )}
                {filtersActive && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            {results.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold" style={{ color: NAVY }}>
                  No endpoints match
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                  Nothing in the API reference matches
                  {q ? ' “' + query.trim() + '”' : " these filters"}. Try a shorter term such as
                  "documents" or "chat".
                </p>
                <div className="mt-5">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-10">
                {grouped.map((g) => (
                  <section key={g.group} aria-labelledby={"grp-" + g.group.replace(/\s+/g, "-")}>
                    <h3
                      id={"grp-" + g.group.replace(/\s+/g, "-")}
                      className="text-sm font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {g.group}
                      <span className="sr-only"> endpoints</span>
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {g.items.map((e) => {
                        const isOpen = !!open[e.id];
                        return (
                          <li key={e.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                            <h4>
                              <button
                                type="button"
                                onClick={() => toggle(e.id)}
                                aria-expanded={isOpen}
                                aria-controls={"detail-" + e.id}
                                className="flex w-full items-start gap-3 px-4 py-4 text-left hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-800 sm:px-5"
                              >
                                {isOpen ? (
                                  <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                                ) : (
                                  <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    <span
                                      className="rounded border px-2 py-0.5 font-mono text-xs font-bold tracking-wide"
                                      style={{ borderColor: "#D7DEE5", color: NAVY, backgroundColor: "#F3F6F9" }}
                                    >
                                      {e.method}
                                    </span>
                                    <span className="break-all font-mono text-[14px] font-medium" style={{ color: NAVY }}>
                                      {e.path}
                                    </span>
                                    <AuthPill level={e.auth} />
                                  </span>
                                  <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                                    {e.summary}
                                  </span>
                                </span>
                              </button>
                            </h4>

                            <div id={"detail-" + e.id} hidden={!isOpen}>
                              {isOpen && (
                                <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-5 sm:px-5">
                                  {e.notes && (
                                    <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-700">
                                      {e.notes}
                                    </p>
                                  )}
                                  <div className="space-y-5">
                                    {e.request && <CodeBlock label="Request" text={e.request} />}
                                    <CodeBlock label="Response" text={e.response} />
                                    <div>
                                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Errors
                                      </p>
                                      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                                        <Table>
                                          <THead>
                                            <TR>
                                              <TH scope="col">Status</TH>
                                              <TH scope="col">Code</TH>
                                              <TH scope="col">Message returned</TH>
                                            </TR>
                                          </THead>
                                          <TBody>
                                            {e.errors.map((err) => (
                                              <TR key={e.id + err[1] + err[0]}>
                                                <TD>
                                                  <span className="font-mono text-sm font-semibold" style={{ color: NAVY }}>
                                                    {err[0]}
                                                  </span>
                                                </TD>
                                                <TD>
                                                  <code className="font-mono text-[13px] text-slate-700">{err[1]}</code>
                                                </TD>
                                                <TD>
                                                  <span className="block max-w-md text-sm text-slate-600">{err[2]}</span>
                                                </TD>
                                              </TR>
                                            ))}
                                          </TBody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-5 flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => copyPath(e.method + " " + e.path)}>
                                      Copy method and path
                                    </Button>
                                    <span className="text-sm text-slate-600" role="status">
                                      {copied === e.method + " " + e.path ? "Copied to clipboard" : ""}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            <p className="mt-10 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-500">
              This reference is generated from the backend's own OpenAPI schema, so it never drifts from
              the running API. Validation failures return a 4xx status with a readable JSON message the
              frontend displays directly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
