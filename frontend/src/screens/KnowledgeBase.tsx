// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Table, Stat } = UI;
const { Plus, Search, X, ChevronRight, FileText, Package, Clock, Trash, Filter, Download, Upload, AlertCircle, CheckCircle } = Icons;

const CURRENT_USER = {
  id: "u-7",
  name: "Satya Ganaraju",
  email: "satya.ganaraju@quorq.ai",
  is_admin: false,
};

const ACCEPTED_TYPES = ["pdf", "docx", "txt", "md"];
const MAX_BYTES = 25 * 1024 * 1024;

const TYPE_LABEL = { pdf: "PDF", docx: "DOCX", txt: "TXT", md: "MD" };

const INITIAL_DOCUMENTS = [
  {
    id: "d-317",
    filename: "Employee-Handbook-2026.pdf",
    file_type: "pdf",
    size_bytes: 4812332,
    uploader_id: "u-2",
    uploader_name: "Priya Raman",
    status: "ready",
    status_reason: null,
    passage_count: 214,
    ocr_note: null,
    created_at: "2026-10-12T08:42:00Z",
  },
  {
    id: "d-316",
    filename: "Expenses-Policy-v4.docx",
    file_type: "docx",
    size_bytes: 186441,
    uploader_id: "u-7",
    uploader_name: "Satya Ganaraju",
    status: "processing",
    status_reason: "Extracting paragraphs and tables",
    passage_count: 0,
    ocr_note: null,
    created_at: "2026-10-12T07:55:00Z",
    ticks: 0,
    ticksNeeded: 3,
    plannedPassages: 42,
  },
  {
    id: "d-315",
    filename: "Product-Roadmap-H1.docx",
    file_type: "docx",
    size_bytes: 1044992,
    uploader_id: "u-3",
    uploader_name: "Dana Okafor",
    status: "processing",
    status_reason: "Embedding passages (batch 2 of 4)",
    passage_count: 0,
    ocr_note: null,
    created_at: "2026-10-11T18:05:00Z",
    ticks: 0,
    ticksNeeded: 6,
    plannedPassages: 88,
  },
  {
    id: "d-314",
    filename: "Security-Awareness-Scan.pdf",
    file_type: "pdf",
    size_bytes: 18903552,
    uploader_id: "u-4",
    uploader_name: "Marcus Webb",
    status: "ready",
    status_reason: null,
    passage_count: 96,
    ocr_note: "Read with local Tesseract OCR — 11 scanned pages recovered.",
    created_at: "2026-10-11T16:20:00Z",
  },
  {
    id: "d-313",
    filename: "Vendor-Contract-Acme-Renewal.pdf",
    file_type: "pdf",
    size_bytes: 2441216,
    uploader_id: "u-7",
    uploader_name: "Satya Ganaraju",
    status: "failed",
    status_reason:
      "Gemini quota exceeded while embedding (batch 3 of 7). Retry once quota resets.",
    passage_count: 0,
    ocr_note: null,
    created_at: "2026-10-11T11:34:00Z",
  },
  {
    id: "d-312",
    filename: "Remote-Work-Policy.md",
    file_type: "md",
    size_bytes: 18332,
    uploader_id: "u-7",
    uploader_name: "Satya Ganaraju",
    status: "ready",
    status_reason: null,
    passage_count: 9,
    ocr_note: null,
    created_at: "2026-10-10T15:12:00Z",
  },
  {
    id: "d-311",
    filename: "Scanned-Invoices-Q3.pdf",
    file_type: "pdf",
    size_bytes: 12118784,
    uploader_id: "u-6",
    uploader_name: "Helen Zhou",
    status: "ready",
    status_reason: null,
    passage_count: 51,
    ocr_note:
      "Tesseract is not installed on this server — OCR unavailable for 4 pages.",
    created_at: "2026-10-10T09:48:00Z",
  },
  {
    id: "d-310",
    filename: "Benefits-Summary-2026.txt",
    file_type: "txt",
    size_bytes: 64211,
    uploader_id: "u-2",
    uploader_name: "Priya Raman",
    status: "ready",
    status_reason: null,
    passage_count: 27,
    ocr_note: null,
    created_at: "2026-10-09T14:03:00Z",
  },
  {
    id: "d-309",
    filename: "Office-Access-Guide.txt",
    file_type: "txt",
    size_bytes: 1204,
    uploader_id: "u-9",
    uploader_name: "Tom Brennan",
    status: "failed",
    status_reason: "No readable text found in this file.",
    passage_count: 0,
    ocr_note: null,
    created_at: "2026-10-09T08:17:00Z",
  },
  {
    id: "d-308",
    filename: "Travel-Policy-EMEA.docx",
    file_type: "docx",
    size_bytes: 341902,
    uploader_id: "u-5",
    uploader_name: "Lucia Marín",
    status: "ready",
    status_reason: null,
    passage_count: 38,
    ocr_note: null,
    created_at: "2026-10-08T16:44:00Z",
  },
  {
    id: "d-307",
    filename: "IT-Support-Runbook.md",
    file_type: "md",
    size_bytes: 88450,
    uploader_id: "u-4",
    uploader_name: "Marcus Webb",
    status: "ready",
    status_reason: null,
    passage_count: 63,
    ocr_note: null,
    created_at: "2026-10-08T10:02:00Z",
  },
  {
    id: "d-306",
    filename: "Data-Retention-Standard.pdf",
    file_type: "pdf",
    size_bytes: 1902336,
    uploader_id: "u-3",
    uploader_name: "Dana Okafor",
    status: "ready",
    status_reason: null,
    passage_count: 72,
    ocr_note: null,
    created_at: "2026-10-07T13:25:00Z",
  },
  {
    id: "d-305",
    filename: "Sales-Playbook-2026.docx",
    file_type: "docx",
    size_bytes: 5204992,
    uploader_id: "u-7",
    uploader_name: "Satya Ganaraju",
    status: "ready",
    status_reason: null,
    passage_count: 155,
    ocr_note: null,
    created_at: "2026-10-07T09:10:00Z",
  },
  {
    id: "d-304",
    filename: "Code-of-Conduct.pdf",
    file_type: "pdf",
    size_bytes: 902144,
    uploader_id: "u-2",
    uploader_name: "Priya Raman",
    status: "ready",
    status_reason: null,
    passage_count: 41,
    ocr_note: null,
    created_at: "2026-10-06T17:38:00Z",
  },
  {
    id: "d-303",
    filename: "Onboarding-Checklist.md",
    file_type: "md",
    size_bytes: 7820,
    uploader_id: "u-7",
    uploader_name: "Satya Ganaraju",
    status: "ready",
    status_reason: null,
    passage_count: 4,
    ocr_note: null,
    created_at: "2026-10-06T11:55:00Z",
  },
  {
    id: "d-302",
    filename: "Incident-Response-Plan.pdf",
    file_type: "pdf",
    size_bytes: 3117221,
    uploader_id: "u-9",
    uploader_name: "Tom Brennan",
    status: "failed",
    status_reason: "Password-protected PDF — the file could not be opened.",
    passage_count: 0,
    ocr_note: null,
    created_at: "2026-10-05T19:02:00Z",
  },
  {
    id: "d-301",
    filename: "Brand-Guidelines-2026.pdf",
    file_type: "pdf",
    size_bytes: 9441280,
    uploader_id: "u-5",
    uploader_name: "Lucia Marín",
    status: "ready",
    status_reason: null,
    passage_count: 118,
    ocr_note: null,
    created_at: "2026-10-05T12:41:00Z",
  },
];

const STATUS_META = {
  ready: { label: "Ready", bg: "#E8F3EE", fg: "#15624A", icon: "CheckCircle" },
  processing: { label: "Processing", bg: "#E9EEF4", fg: "#0E2A47", icon: "Clock" },
  failed: { label: "Failed", bg: "#FDECEA", fg: "#A3231A", icon: "AlertCircle" },
};

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

function clockNow() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function Screen() {
  const navigate = useNavigate();
  const [documents, setDocuments] = React.useState(INITIAL_DOCUMENTS);
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [dragging, setDragging] = React.useState(false);
  const [rejections, setRejections] = React.useState([]);
  const [notice, setNotice] = React.useState(null);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [quotaBannerOpen, setQuotaBannerOpen] = React.useState(true);
  const [lastSync, setLastSync] = React.useState(() => clockNow());

  const fileInputRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const dialogRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);
  const idRef = React.useRef(400);

  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900";

  const hasProcessing = documents.some((d) => d.status === "processing");

  /* ---- live polling: runs only while something is processing ---- */
  React.useEffect(() => {
    if (!hasProcessing) return undefined;
    const handle = setInterval(() => {
      setLastSync(clockNow());
      setDocuments((prev) =>
        prev.map((d) => {
          if (d.status !== "processing") return d;
          const ticks = (d.ticks || 0) + 1;
          const needed = d.ticksNeeded || 3;
          if (ticks < needed) {
            return {
              ...d,
              ticks,
              status_reason:
                ticks === needed - 1
                  ? "Embedding passages (768-dim, batches of 100)"
                  : d.status_reason,
            };
          }
          return {
            ...d,
            ticks,
            status: "ready",
            status_reason: null,
            passage_count:
              d.plannedPassages ||
              Math.max(1, Math.round(d.size_bytes / 1400)),
          };
        })
      );
    }, 2600);
    return () => clearInterval(handle);
  }, [hasProcessing]);

  const stats = React.useMemo(() => {
    const total = documents.length;
    const ready = documents.filter((d) => d.status === "ready").length;
    const processing = documents.filter((d) => d.status === "processing").length;
    const failed = documents.filter((d) => d.status === "failed").length;
    const passages = documents.reduce((sum, d) => sum + (d.passage_count || 0), 0);
    return { total, ready, processing, failed, passages };
  }, [documents]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (q && !d.filename.toLowerCase().includes(q)) return false;
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (typeFilter !== "all" && d.file_type !== typeFilter) return false;
      return true;
    });
  }, [documents, query, statusFilter, typeFilter]);

  const filtersActive =
    query.trim() !== "" || statusFilter !== "all" || typeFilter !== "all";

  function clearFilters() {
    setQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    if (searchRef.current) searchRef.current.focus();
  }

  function canDelete(doc) {
    return CURRENT_USER.is_admin || doc.uploader_id === CURRENT_USER.id;
  }

  /* ---- upload ---- */
  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    const accepted = [];
    const rejected = [];
    files.forEach((file) => {
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!ACCEPTED_TYPES.includes(ext)) {
        rejected.push({
          key: file.name + "-" + rejected.length,
          filename: file.name,
          reason:
            'Unsupported file type ".' +
            ext +
            '". Accepted types are PDF, DOCX, TXT and MD.',
        });
      } else if (file.size > MAX_BYTES) {
        rejected.push({
          key: file.name + "-" + rejected.length,
          filename: file.name,
          reason:
            formatBytes(file.size) +
            " exceeds the 25 MB limit, so it was not uploaded.",
        });
      } else {
        idRef.current += 1;
        accepted.push({
          id: "d-" + idRef.current,
          filename: file.name,
          file_type: ext,
          size_bytes: file.size,
          uploader_id: CURRENT_USER.id,
          uploader_name: CURRENT_USER.name,
          status: "processing",
          status_reason: "Queued — extracting text",
          passage_count: 0,
          ocr_note: null,
          created_at: new Date().toISOString(),
          ticks: 0,
          ticksNeeded: 3,
          plannedPassages: Math.max(1, Math.round(file.size / 1400)),
        });
      }
    });

    if (accepted.length > 0) setDocuments((prev) => [...accepted, ...prev]);
    setRejections(rejected);
    setNotice(
      accepted.length > 0
        ? accepted.length +
            (accepted.length === 1
              ? " file uploaded and queued for processing."
              : " files uploaded and queued for processing.")
        : null
    );
    setLastSync(clockNow());
  }

  function onDrop(event) {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer ? event.dataTransfer.files : []);
  }

  function requestDelete(doc, event) {
    returnFocusRef.current = event.currentTarget;
    setDeleteTarget(doc);
  }

  function closeDialog() {
    setDeleteTarget(null);
    const node = returnFocusRef.current;
    if (node && typeof node.focus === "function") node.focus();
  }

  function confirmDelete() {
    const doc = deleteTarget;
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    setDeleteTarget(null);
    setNotice(
      doc.filename +
        " was deleted. Its file, chunks and embeddings have been removed."
    );
    if (searchRef.current) searchRef.current.focus();
  }

  function handleDownload(doc) {
    setNotice(
      "Downloading " + doc.filename + " (" + formatBytes(doc.size_bytes) + ")."
    );
  }

  /* ---- dialog: escape, focus trap, initial focus ---- */
  React.useEffect(() => {
    if (!deleteTarget) return undefined;
    const node = dialogRef.current;
    if (node) {
      const first = node.querySelector("[data-autofocus]");
      if (first) first.focus();
    }
    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key === "Tab" && node) {
        const focusable = node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [deleteTarget]);

  const statTiles = [
    { label: "Documents", value: stats.total, hint: "in the shared base" },
    { label: "Ready", value: stats.ready, hint: "searchable now" },
    { label: "Processing", value: stats.processing, hint: "being indexed" },
    { label: "Failed", value: stats.failed, hint: "need attention" },
    {
      label: "Indexed passages",
      value: stats.passages.toLocaleString("en-GB"),
      hint: "~1,000 chars each",
    },
  ];

  return (
    <div
      className="min-h-full w-full"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <h1
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
            >
              Knowledge base
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              One shared library for everyone at the company. Upload PDF, DOCX, TXT
              or MD files up to 25 MB and the assistant will cite them in its
              answers.
            </p>
          </div>
          <div
            role="status"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: hasProcessing ? brand.accentColor : "#94A3B8",
              }}
            />
            {hasProcessing
              ? "Live · " +
                stats.processing +
                " processing · updated " +
                lastSync
              : "Up to date · polling paused at " + lastSync}
          </div>
        </header>

        {/* Quota warning */}
        {quotaBannerOpen && (
          <div
            className="mt-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4"
            role="status"
          >
            <Icons.AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div className="flex-1 text-sm">
              <p className="font-medium text-amber-900">
                Gemini quota was exhausted at 11:34 today
              </p>
              <p className="mt-1 leading-6 text-amber-900">
                One document stopped mid-embedding and is marked Failed. Re-upload
                it once the daily quota resets — nothing half-indexed was kept.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setQuotaBannerOpen(false)}
              aria-label="Dismiss quota warning"
              className={
                "rounded-md p-1 text-amber-900 hover:bg-amber-100 " + focusRing
              }
            >
              <Icons.X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Stat tiles */}
        <section aria-labelledby="stats-heading" className="mt-6">
          <h2 id="stats-heading" className="sr-only">
            Knowledge base overview
          </h2>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {statTiles.map((tile) => (
              <li
                key={tile.label}
                className="rounded-lg border border-slate-200 bg-white px-4 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {tile.label}
                </p>
                <p
                  className="mt-2 text-2xl font-semibold tabular-nums"
                  style={{ color: brand.primaryColor }}
                >
                  {tile.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{tile.hint}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Upload */}
        <section aria-labelledby="upload-heading" className="mt-8">
          <h2
            id="upload-heading"
            className="text-base font-semibold"
            style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
          >
            Add documents
          </h2>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className="mt-3 rounded-lg border-2 border-dashed bg-white px-6 py-10 text-center transition-colors"
            style={{
              borderColor: dragging ? brand.accentColor : "#CBD5E1",
              backgroundColor: dragging ? "#F1F8F5" : "#FFFFFF",
            }}
          >
            <Icons.Upload
              className="mx-auto h-8 w-8 text-slate-400"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-medium text-slate-800">
              Drag files here, or choose them from your computer
            </p>
            <p className="mt-1 text-sm text-slate-500">
              PDF, DOCX, TXT or MD · up to 25 MB each · scanned PDFs are read with
              OCR
            </p>
            <div className="mt-5">
              <label htmlFor="kb-file-input" className="sr-only">
                Choose documents to upload
              </label>
              <input
                ref={fileInputRef}
                id="kb-file-input"
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.md"
                className="sr-only"
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className={
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-95 " +
                  focusRing
                }
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Icons.Plus className="h-4 w-4" aria-hidden="true" />
                Browse files
              </button>
            </div>
          </div>

          {rejections.length > 0 && (
            <div
              role="alert"
              className="mt-3 rounded-lg border border-red-300 bg-red-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-red-900">
                  {rejections.length === 1
                    ? "1 file was not uploaded"
                    : rejections.length + " files were not uploaded"}
                </h3>
                <button
                  type="button"
                  onClick={() => setRejections([])}
                  aria-label="Dismiss upload errors"
                  className={
                    "rounded-md p-1 text-red-900 hover:bg-red-100 " + focusRing
                  }
                >
                  <Icons.X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-red-900">
                {rejections.map((r) => (
                  <li key={r.key}>
                    <span className="font-medium">{r.filename}</span> — {r.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Documents */}
        <section aria-labelledby="documents-heading" className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="documents-heading"
              className="text-base font-semibold"
              style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
            >
              Documents
            </h2>
            <p className="text-sm text-slate-600" aria-live="polite">
              Showing {filtered.length} of {documents.length} documents
            </p>
          </div>

          {/* Toolbar */}
          <div className="mt-4 flex flex-col gap-4 rounded-t-lg border border-b-0 border-slate-200 bg-white p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="kb-search"
                className="block text-sm font-medium text-slate-700"
              >
                Search by file name
              </label>
              <div className="relative mt-1.5">
                <Icons.Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  id="kb-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. handbook"
                  className={
                    "w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 " +
                    focusRing
                  }
                />
              </div>
            </div>
            <div className="sm:w-44">
              <label
                htmlFor="kb-status"
                className="block text-sm font-medium text-slate-700"
              >
                Status
              </label>
              <select
                id="kb-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={
                  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
                  focusRing
                }
              >
                <option value="all">All statuses</option>
                <option value="ready">Ready</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="sm:w-40">
              <label
                htmlFor="kb-type"
                className="block text-sm font-medium text-slate-700"
              >
                File type
              </label>
              <select
                id="kb-type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={
                  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
                  focusRing
                }
              >
                <option value="all">All types</option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="txt">TXT</option>
                <option value="md">MD</option>
              </select>
            </div>
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className={
                  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 " +
                  focusRing
                }
              >
                <Icons.X className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-3 border-x border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              <span className="flex items-start gap-2">
                <Icons.CheckCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: brand.accentColor }}
                  aria-hidden="true"
                />
                {notice}
              </span>
              <button
                type="button"
                onClick={() => setNotice(null)}
                aria-label="Dismiss message"
                className={"rounded-md p-1 hover:bg-slate-200 " + focusRing}
              >
                <Icons.X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Table / empty states */}
          <div className="overflow-hidden rounded-b-lg border border-slate-200 bg-white">
            {documents.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <Icons.Package
                  className="mx-auto h-8 w-8 text-slate-300"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  Your knowledge base is empty
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
                  Upload the first document and the assistant will start answering
                  from it, with citations, as soon as it is indexed.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className={
                    "mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-95 " +
                    focusRing
                  }
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  <Icons.Upload className="h-4 w-4" aria-hidden="true" />
                  Upload a document
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <Icons.Filter
                  className="mx-auto h-8 w-8 text-slate-300"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  No documents match these filters
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
                  Try a different file name, or clear the filters to see all{" "}
                  {documents.length} documents again.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={
                    "mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 " +
                    focusRing
                  }
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Shared knowledge base documents, newest first
                  </caption>
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Document
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Type
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Size
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Uploaded by
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Uploaded
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-semibold text-slate-700"
                      >
                        Passages
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((doc) => {
                      const meta = STATUS_META[doc.status];
                      const StatusIcon = Icons[meta.icon];
                      const when = formatDate(doc.created_at);
                      return (
                        <tr
                          key={doc.id}
                          className="border-b border-slate-100 align-top last:border-b-0 hover:bg-slate-50"
                        >
                          <th
                            scope="row"
                            className="max-w-xs px-4 py-4 font-medium text-slate-900"
                          >
                            <span className="flex items-start gap-2">
                              <Icons.FileText
                                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                                aria-hidden="true"
                              />
                              <span>
                                <span className="block break-words">
                                  {doc.filename}
                                </span>
                                {doc.ocr_note && (
                                  <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
                                    OCR: {doc.ocr_note}
                                  </span>
                                )}
                              </span>
                            </span>
                          </th>
                          <td className="px-4 py-4">
                            <span className="inline-flex rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold tracking-wide text-slate-600">
                              {TYPE_LABEL[doc.file_type]}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 tabular-nums text-slate-600">
                            {formatBytes(doc.size_bytes)}
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {doc.uploader_id === CURRENT_USER.id
                              ? "You"
                              : doc.uploader_name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                            <span className="block">{when.date}</span>
                            <span className="block text-xs text-slate-500">
                              {when.time}
                            </span>
                          </td>
                          <td className="max-w-xs px-4 py-4">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                              style={{ backgroundColor: meta.bg, color: meta.fg }}
                            >
                              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                              {meta.label}
                            </span>
                            {doc.status_reason && (
                              <span className="mt-1.5 block text-xs leading-5 text-slate-600">
                                {doc.status_reason}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right tabular-nums text-slate-700">
                            {doc.status === "ready"
                              ? doc.passage_count.toLocaleString("en-GB")
                              : "—"}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              {doc.status === "ready" && (
                                <button
                                  type="button"
                                  onClick={() => navigate("chat")}
                                  className={
                                    "inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 " +
                                    focusRing
                                  }
                                >
                                  Ask
                                  <Icons.ChevronRight
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">
                                    the assistant about {doc.filename}
                                  </span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDownload(doc)}
                                aria-label={"Download " + doc.filename}
                                className={
                                  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 " +
                                  focusRing
                                }
                              >
                                <Icons.Download className="h-4 w-4" aria-hidden="true" />
                              </button>
                              {canDelete(doc) && (
                                <button
                                  type="button"
                                  onClick={(e) => requestDelete(doc, e)}
                                  aria-label={"Delete " + doc.filename}
                                  className={
                                    "inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-700 " +
                                    focusRing
                                  }
                                >
                                  <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Every signed-in employee can read and upload to this shared base. You can
            delete documents you uploaded; admins can delete any document. Deleting
            removes the file, its chunks and its embeddings outright.
          </p>
        </section>
      </div>

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <h2
              id="delete-title"
              className="text-lg font-semibold"
              style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
            >
              Delete this document?
            </h2>
            <p id="delete-description" className="mt-3 text-sm leading-6 text-slate-600">
              <span className="font-medium text-slate-900">
                {deleteTarget.filename}
              </span>{" "}
              and its {deleteTarget.passage_count || 0} indexed passages will be
              removed from the shared knowledge base. Answers will stop citing it
              straight away. This cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                data-autofocus
                onClick={closeDialog}
                className={
                  "rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 " +
                  focusRing
                }
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className={
                  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-95 " +
                  focusRing
                }
                style={{ backgroundColor: "#A3231A" }}
              >
                <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                Delete document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
