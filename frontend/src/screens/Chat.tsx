// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Input, Textarea, Label } = UI;
const { Plus, Search, Check, X, ChevronRight, Menu, Settings, Bell, FileText, Package, Trash, Download, ArrowRight, AlertCircle, CheckCircle } = Icons;

const NOW = new Date('2026-10-12T16:20:00');

const PALETTE = {
  navy: '#0E2A47',
  green: '#2E8B6B',
  neutral: '#5A6B7B',
  greenTintBg: '#E6F2EC',
  greenTintText: '#1C5942',
  amberTintBg: '#FDF2DF',
  amberTintText: '#7A4A06',
  redTintBg: '#FBEBEB',
  redTintText: '#8A1C1C',
  line: '#DFE5EA',
};

const INITIAL_CONVERSATIONS = [
  {
    id: 'c1',
    title: 'Parental leave top-up eligibility',
    created_at: '2026-10-12T09:44:00',
    updated_at: '2026-10-12T09:48:00',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'How long do I need to have worked here before the enhanced parental leave top-up applies?',
        created_at: '2026-10-12T09:44:00',
      },
      {
        id: 'm2',
        role: 'assistant',
        from_documents: true,
        created_at: '2026-10-12T09:48:00',
        content:
          'You qualify for the enhanced parental leave top-up once you have 26 weeks of continuous service at the date your leave begins [1].\n\nThe top-up pays the difference between statutory pay and 100% of your normal salary for the first 12 weeks, then 50% of salary for weeks 13 to 20 [2]. Anything after week 20 is statutory pay only, and annual leave keeps accruing for the whole period [1].\n\nNotice must reach your manager and People Ops at least 15 weeks before the expected week of birth or placement [2].',
        sources: [
          {
            chip_number: 1,
            document: 'Parental-Leave-Policy-v4.docx',
            page_number: 3,
            passage_text:
              'Eligibility. Employees with 26 weeks or more of continuous service as at the first day of leave are eligible for the enhanced top-up. Continuous service includes any period of TUPE-transferred employment. Annual leave continues to accrue for the full duration of parental leave, including the unpaid portion.',
          },
          {
            chip_number: 2,
            document: 'Employee-Handbook-2026.pdf',
            page_number: 14,
            passage_text:
              'Weeks 1-12 are paid at 100% of normal salary, inclusive of statutory pay. Weeks 13-20 are paid at 50% of normal salary, inclusive of statutory pay. Weeks 21-39 are statutory pay only. Notice of intention to take leave must be given no later than 15 weeks before the expected week of childbirth or placement.',
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'VPN access for contractors',
    created_at: '2026-10-12T08:09:00',
    updated_at: '2026-10-12T08:15:00',
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'Can a contractor get VPN access, and who signs it off?',
        created_at: '2026-10-12T08:09:00',
      },
      {
        id: 'm4',
        role: 'assistant',
        from_documents: true,
        created_at: '2026-10-12T08:11:00',
        content:
          'Yes, but only for the length of the engagement. A contractor VPN account needs a sponsoring employee at manager grade or above, and IT Security countersigns the request [1].\n\nAccounts are issued with hardware-key MFA, expire automatically on the contract end date recorded in the request, and are reviewed every 30 days [1]. Split tunnelling is not permitted on contractor profiles [2].',
        sources: [
          {
            chip_number: 1,
            document: 'IT-Security-Standard.md',
            page_number: null,
            passage_text:
              '### 4.2 Third-party remote access\nNon-employee accounts require a named sponsor at manager grade or above and countersignature by IT Security. All third-party accounts are provisioned with hardware-key MFA and an automatic expiry matching the contract end date. Access is re-attested every 30 days.',
          },
          {
            chip_number: 2,
            document: 'IT-Security-Standard.md',
            page_number: null,
            passage_text:
              '### 4.5 Tunnel configuration\nSplit tunnelling is disabled on the contractor VPN profile. All traffic, including general web browsing, is routed through the corporate gateway while the tunnel is active.',
          },
        ],
      },
      {
        id: 'm5',
        role: 'user',
        content: 'And how long does the sign-off usually take?',
        created_at: '2026-10-12T08:15:00',
      },
      {
        id: 'm6',
        role: 'assistant',
        error:
          'Gemini quota exhausted for this project key. The question above was not answered — try again shortly or ask an admin to check the key in Admin → Settings.',
        content: '',
        created_at: '2026-10-12T08:15:00',
      },
    ],
  },
  {
    id: 'c3',
    title: 'Client dinner expense limits',
    created_at: '2026-10-11T17:02:00',
    updated_at: '2026-10-11T17:05:00',
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: 'What is the per-head limit for a client dinner in London?',
        created_at: '2026-10-11T17:02:00',
      },
      {
        id: 'm8',
        role: 'assistant',
        from_documents: true,
        stopped: true,
        created_at: '2026-10-11T17:05:00',
        content:
          'Client entertainment in London is capped at £75 per head including service and VAT [1]. Anything above the cap needs written approval from a director before the booking, not after',
        sources: [
          {
            chip_number: 1,
            document: 'Travel-and-Expenses-Policy.pdf',
            page_number: 9,
            passage_text:
              'Client entertainment limits (inclusive of service and VAT): London £75 per head; rest of UK £55 per head; overseas, local equivalent of £75. Claims above these limits require written director approval obtained before the expense is incurred. Alcohol is reimbursable only as part of a meal.',
          },
        ],
      },
    ],
  },
  {
    id: 'c4',
    title: 'PPE required on client site visits',
    created_at: '2026-10-09T11:20:00',
    updated_at: '2026-10-09T11:23:00',
    messages: [
      {
        id: 'm9',
        role: 'user',
        content: 'What PPE do I need for a site visit to a live construction client?',
        created_at: '2026-10-09T11:20:00',
      },
      {
        id: 'm10',
        role: 'assistant',
        from_documents: true,
        created_at: '2026-10-09T11:23:00',
        content:
          'For any live construction site you must wear a hard hat, high-visibility vest, safety footwear with toe protection and eye protection as a minimum [1].\n\nHearing protection is added wherever posted noise exceeds 85 dB, and gloves are required for all manual handling [1]. The visiting employee signs the site induction register before entering the working area.',
        sources: [
          {
            chip_number: 1,
            document: 'Site-Safety-PPE-Policy-scanned.pdf',
            page_number: 2,
            ocr: true,
            passage_text:
              'MINIMUM PPE FOR ALL VISITORS TO LIVE SITES: safety helmet to EN 397; high-visibility upper body garment class 2 or above; safety footwear with protective toecap and midsole; impact-rated eye protection. Hearing protection mandatory where posted noise levels exceed 85 dB(A). Gloves required for all manual handling activity.',
          },
        ],
      },
    ],
  },
  {
    id: 'c5',
    title: 'Recommended Python style guide',
    created_at: '2026-10-09T09:05:00',
    updated_at: '2026-10-09T09:06:00',
    messages: [
      {
        id: 'm11',
        role: 'user',
        content: 'Is there a standard Python style guide we should follow?',
        created_at: '2026-10-09T09:05:00',
      },
      {
        id: 'm12',
        role: 'assistant',
        from_documents: false,
        created_at: '2026-10-09T09:06:00',
        content:
          'Nothing in the shared knowledge base scored above the 0.62 similarity threshold for this question, so the answer below is general knowledge rather than company policy.\n\nMost Python teams follow PEP 8 for layout and naming, PEP 257 for docstrings, and automate both with a formatter such as Black plus a linter such as Ruff so that review time goes on behaviour rather than whitespace. Type hints checked by mypy or pyright are a common addition on larger codebases.\n\nIf engineering has agreed something different internally, upload that document to the knowledge base and ask again.',
        sources: [],
      },
    ],
  },
  {
    id: 'c6',
    title: 'Laptop refresh cycle',
    created_at: '2026-10-06T14:40:00',
    updated_at: '2026-10-06T14:42:00',
    messages: [
      {
        id: 'm13',
        role: 'user',
        content: 'How often are laptops replaced and can I keep the old one?',
        created_at: '2026-10-06T14:40:00',
      },
      {
        id: 'm14',
        role: 'assistant',
        from_documents: true,
        created_at: '2026-10-06T14:42:00',
        content:
          'Standard laptops are refreshed on a 36-month cycle, counted from the asset registration date rather than your start date [1].\n\nThe old machine is returned to IT for secure wipe; staff purchase of retired hardware is not offered [1]. If a device fails before 36 months it is replaced at no cost to the team budget.',
        sources: [
          {
            chip_number: 1,
            document: 'Employee-Handbook-2026.pdf',
            page_number: 31,
            passage_text:
              'IT equipment. Laptops are refreshed 36 months after asset registration. Retired devices must be returned to IT within five working days of receiving a replacement for certified data erasure. The company does not operate a staff purchase scheme for retired hardware.',
          },
        ],
      },
    ],
  },
  {
    id: 'c7',
    title: 'Approval for a £12,000 purchase order',
    created_at: '2026-09-29T10:12:00',
    updated_at: '2026-09-29T10:14:00',
    messages: [
      {
        id: 'm15',
        role: 'user',
        content: 'Who approves a purchase order of £12,000?',
        created_at: '2026-09-29T10:12:00',
      },
      {
        id: 'm16',
        role: 'assistant',
        from_documents: true,
        created_at: '2026-09-29T10:14:00',
        content:
          'A purchase order of £12,000 sits in the £10,000–£50,000 band, which needs the budget holder plus the Finance Director [1].\n\nOrders are not valid until both approvals are recorded in the procurement system, and splitting an order to stay under a threshold is expressly prohibited [1].',
        sources: [
          {
            chip_number: 1,
            document: 'Procurement-Approval-Matrix.docx',
            page_number: 1,
            passage_text:
              'Approval bands: up to £2,500 line manager; £2,501-£9,999 budget holder; £10,000-£49,999 budget holder and Finance Director; £50,000 and above budget holder, Finance Director and CEO. Splitting a requirement across multiple orders to fall within a lower band is prohibited.',
          },
        ],
      },
    ],
  },
];

const ANSWER_BANK = [
  {
    keywords: ['leave', 'parental', 'maternity', 'paternity', 'adoption', 'holiday'],
    content:
      'Enhanced parental leave applies after 26 weeks of continuous service at the date leave begins [1].\n\nWeeks 1 to 12 are paid at full salary, weeks 13 to 20 at half salary, and the remainder at statutory pay only [2]. Give notice to your manager and People Ops at least 15 weeks before the expected week of birth or placement [2].',
    sources: [
      {
        chip_number: 1,
        document: 'Parental-Leave-Policy-v4.docx',
        page_number: 3,
        passage_text:
          'Eligibility. Employees with 26 weeks or more of continuous service as at the first day of leave are eligible for the enhanced top-up. Annual leave continues to accrue for the full duration of parental leave.',
      },
      {
        chip_number: 2,
        document: 'Employee-Handbook-2026.pdf',
        page_number: 14,
        passage_text:
          'Weeks 1-12 at 100% of salary, weeks 13-20 at 50%, weeks 21-39 statutory only. Notice must be given no later than 15 weeks before the expected week of childbirth or placement.',
      },
    ],
  },
  {
    keywords: ['expense', 'dinner', 'travel', 'mileage', 'hotel', 'claim', 'receipt'],
    content:
      'Expenses are claimed in the finance portal within 30 days of the spend, with an itemised receipt for anything over £10 [1].\n\nClient entertainment is capped at £75 per head in London and £55 elsewhere in the UK, both inclusive of service and VAT [1]. Mileage is reimbursed at 45p per mile for the first 10,000 miles in a tax year [2].',
    sources: [
      {
        chip_number: 1,
        document: 'Travel-and-Expenses-Policy.pdf',
        page_number: 9,
        passage_text:
          'Client entertainment limits (inclusive of service and VAT): London £75 per head; rest of UK £55 per head. Claims must be submitted within 30 days with an itemised receipt for any item above £10.',
      },
      {
        chip_number: 2,
        document: 'Travel-and-Expenses-Policy.pdf',
        page_number: 11,
        passage_text:
          'Mileage in a private vehicle is reimbursed at 45p per mile for the first 10,000 business miles in a tax year and 25p per mile thereafter, in line with HMRC approved rates.',
      },
    ],
  },
  {
    keywords: ['vpn', 'security', 'password', 'mfa', 'access', 'laptop', 'device', 'phishing'],
    content:
      'Remote access runs through the corporate VPN with hardware-key MFA; shared accounts are not permitted [1].\n\nContractor accounts need a sponsoring manager, are countersigned by IT Security and expire automatically on the contract end date [1]. Suspected phishing goes to security@ as an attachment rather than a forward [2].',
    sources: [
      {
        chip_number: 1,
        document: 'IT-Security-Standard.md',
        page_number: null,
        passage_text:
          '### 4.2 Third-party remote access\nNon-employee accounts require a named sponsor at manager grade or above and countersignature by IT Security. All accounts are provisioned with hardware-key MFA and an automatic expiry matching the contract end date.',
      },
      {
        chip_number: 2,
        document: 'IT-Security-Standard.md',
        page_number: null,
        passage_text:
          '### 7.1 Reporting\nSuspected phishing must be reported to security@ as an .eml attachment. Do not forward the message inline and do not click any link to "check" it first.',
      },
    ],
  },
  {
    keywords: ['ppe', 'safety', 'site', 'helmet', 'hazard', 'induction'],
    content:
      'The minimum PPE for any live site is a safety helmet, high-visibility garment, protective footwear and impact-rated eye protection [1].\n\nHearing protection is required wherever posted noise passes 85 dB(A), and gloves are required for manual handling [1]. Sign the site induction register before entering the working area.',
    sources: [
      {
        chip_number: 1,
        document: 'Site-Safety-PPE-Policy-scanned.pdf',
        page_number: 2,
        ocr: true,
        passage_text:
          'MINIMUM PPE FOR ALL VISITORS TO LIVE SITES: safety helmet to EN 397; high-visibility upper body garment class 2 or above; safety footwear with protective toecap and midsole; impact-rated eye protection. Hearing protection mandatory above 85 dB(A).',
      },
    ],
  },
  {
    keywords: ['purchase', 'order', 'procurement', 'approval', 'supplier', 'invoice', 'budget'],
    content:
      'Approval depends on the value of the order. Up to £2,500 your line manager signs; £2,501 to £9,999 the budget holder; £10,000 to £49,999 the budget holder and the Finance Director; £50,000 and above adds the CEO [1].\n\nAn order is not valid until the approvals are recorded in the procurement system, and splitting a requirement to stay under a band is prohibited [1].',
    sources: [
      {
        chip_number: 1,
        document: 'Procurement-Approval-Matrix.docx',
        page_number: 1,
        passage_text:
          'Approval bands: up to £2,500 line manager; £2,501-£9,999 budget holder; £10,000-£49,999 budget holder and Finance Director; £50,000 and above budget holder, Finance Director and CEO.',
      },
    ],
  },
];

const FALLBACK_ANSWER = {
  from_documents: false,
  content:
    'Nothing in the shared knowledge base scored above the 0.62 similarity threshold for this question, so the answer below comes from general knowledge rather than from company documents.\n\nBroadly, the sensible starting point is to check whether a written policy exists with the team that owns the subject, then confirm the detail in writing before acting on it. Treat anything here as background only.\n\nIf the right document exists but was never uploaded, add it on the Knowledge base page and ask again — the answer will then come back with citations.',
  sources: [],
};

const dayLabel = (iso) => {
  const d = new Date(iso);
  const yesterday = new Date(NOW.getTime() - 86400000);
  if (d.toDateString() === NOW.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  const diffDays = (NOW - d) / 86400000;
  if (diffDays < 7) return d.toLocaleDateString('en-GB', { weekday: 'long' });
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};

const timeLabel = (iso) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

const buildAnswer = (question) => {
  const q = question.toLowerCase();
  const hit = ANSWER_BANK.find((entry) => entry.keywords.some((k) => q.includes(k)));
  if (!hit) return { ...FALLBACK_ANSWER };
  return { from_documents: true, content: hit.content, sources: hit.sources };
};

const tokenise = (text) => text.split(/(\s+)/);

export default function Screen() {
  const navigate = useNavigate();
  const [conversations, setConversations] = React.useState(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = React.useState('c1');
  const [historyQuery, setHistoryQuery] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [stream, setStream] = React.useState(null);
  const [panelSource, setPanelSource] = React.useState(null);
  const [panelNote, setPanelNote] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(null);
  const [speakingId, setSpeakingId] = React.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState(null);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [toast, setToast] = React.useState('');

  const idRef = React.useRef(100);
  const clockRef = React.useRef(0);
  const threadRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const composerRef = React.useRef(null);

  const speechSupported = React.useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  )[0];

  const nextId = (prefix) => `${prefix}${++idRef.current}`;
  const stamp = () => new Date(NOW.getTime() + ++clockRef.current * 60000).toISOString();

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  /* ---------- streaming simulation ---------- */
  React.useEffect(() => {
    if (!stream) return undefined;

    if (stream.phase === 'searching') {
      const t = setTimeout(
        () => setStream((s) => (s ? { ...s, phase: 'streaming' } : s)),
        900
      );
      return () => clearTimeout(t);
    }

    if (stream.cursor >= stream.tokens.length) {
      setConversations((cs) =>
        cs.map((c) =>
          c.id === stream.convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === stream.messageId ? { ...m, streaming: false } : m
                ),
              }
            : c
        )
      );
      setStream(null);
      return undefined;
    }

    const t = setTimeout(() => {
      const piece = stream.tokens.slice(stream.cursor, stream.cursor + 3).join('');
      setConversations((cs) =>
        cs.map((c) =>
          c.id === stream.convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === stream.messageId ? { ...m, content: m.content + piece } : m
                ),
              }
            : c
        )
      );
      setStream((s) => (s ? { ...s, cursor: s.cursor + 3 } : s));
    }, 34);
    return () => clearTimeout(t);
  }, [stream]);

  /* ---------- transient UI feedback ---------- */
  React.useEffect(() => {
    if (!copiedId) return undefined;
    const t = setTimeout(() => setCopiedId(null), 2200);
    return () => clearTimeout(t);
  }, [copiedId]);

  React.useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [activeId, conversations, stream]);

  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ---------- source panel keyboard behaviour ---------- */
  React.useEffect(() => {
    if (!panelSource) return undefined;
    const node = panelRef.current;
    if (node) {
      const first = node.querySelector('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (first) first.focus();
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closePanel();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [panelSource]);

  const openPanel = (source, event) => {
    returnFocusRef.current = event && event.currentTarget ? event.currentTarget : null;
    setPanelNote('');
    setPanelSource(source);
  };

  const closePanel = () => {
    setPanelSource(null);
    setPanelNote('');
    const target = returnFocusRef.current;
    if (target && typeof target.focus === 'function') target.focus();
  };

  /* ---------- asking ---------- */
  const startAnswer = (convId, questionText, assistantMessageId) => {
    const answer = buildAnswer(questionText);
    const msgId = assistantMessageId || nextId('m');
    setConversations((cs) =>
      cs.map((c) => {
        if (c.id !== convId) return c;
        const existing = c.messages.some((m) => m.id === msgId);
        const fresh = {
          id: msgId,
          role: 'assistant',
          content: '',
          streaming: true,
          stopped: false,
          error: null,
          from_documents: answer.from_documents,
          sources: answer.sources,
          question: questionText,
          created_at: stamp(),
        };
        return {
          ...c,
          updated_at: fresh.created_at,
          messages: existing
            ? c.messages.map((m) => (m.id === msgId ? fresh : m))
            : [...c.messages, fresh],
        };
      })
    );
    setStream({
      convId,
      messageId: msgId,
      tokens: tokenise(answer.content),
      cursor: 0,
      phase: 'searching',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = question.trim();
    if (!text || stream) return;

    let convId = activeId;
    const userMessage = {
      id: nextId('m'),
      role: 'user',
      content: text,
      created_at: stamp(),
    };

    if (!convId) {
      convId = nextId('c');
      const conv = {
        id: convId,
        title: text.length > 54 ? `${text.slice(0, 54)}…` : text,
        created_at: userMessage.created_at,
        updated_at: userMessage.created_at,
        messages: [userMessage],
      };
      setConversations((cs) => [conv, ...cs]);
      setActiveId(convId);
    } else {
      setConversations((cs) =>
        cs.map((c) =>
          c.id === convId
            ? { ...c, updated_at: userMessage.created_at, messages: [...c.messages, userMessage] }
            : c
        )
      );
    }
    setQuestion('');
    setHistoryOpen(false);
    startAnswer(convId, text);
  };

  const handleStop = () => {
    if (!stream) return;
    setConversations((cs) =>
      cs.map((c) =>
        c.id === stream.convId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === stream.messageId ? { ...m, streaming: false, stopped: true } : m
              ),
            }
          : c
      )
    );
    setStream(null);
    setToast('Generation stopped. The partial answer has been kept.');
  };

  const questionFor = (conv, message) => {
    if (message.question) return message.question;
    const index = conv.messages.findIndex((m) => m.id === message.id);
    for (let i = index - 1; i >= 0; i -= 1) {
      if (conv.messages[i].role === 'user') return conv.messages[i].content;
    }
    return conv.title;
  };

  const handleRegenerate = (conv, message) => {
    if (stream) return;
    if (speakingId) stopSpeaking();
    startAnswer(conv.id, questionFor(conv, message), message.id);
  };

  const handleCopy = (message) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(message.content).catch(() => {});
    }
    setCopiedId(message.id);
  };

  const stopSpeaking = () => {
    if (speechSupported) window.speechSynthesis.cancel();
    setSpeakingId(null);
  };

  const handleReadAloud = (message) => {
    if (!speechSupported) return;
    if (speakingId === message.id) {
      stopSpeaking();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(message.content);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleDelete = (conv) => {
    setConversations((cs) => cs.filter((c) => c.id !== conv.id));
    setConfirmDeleteId(null);
    if (activeId === conv.id) {
      setActiveId(null);
      if (stream && stream.convId === conv.id) setStream(null);
    }
    setToast(`Conversation “${conv.title}” deleted. No copy was kept.`);
  };

  const startNewChat = () => {
    setActiveId(null);
    setQuestion('');
    setConfirmDeleteId(null);
    setHistoryOpen(false);
    if (composerRef.current) composerRef.current.focus();
  };

  /* ---------- history filtering + grouping ---------- */
  const query = historyQuery.trim().toLowerCase();
  const filtered = conversations.filter((c) => {
    if (!query) return true;
    if (c.title.toLowerCase().includes(query)) return true;
    return c.messages.some((m) => (m.content || '').toLowerCase().includes(query));
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const groups = [];
  sorted.forEach((c) => {
    const label = dayLabel(c.updated_at);
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(c);
    else groups.push({ label, items: [c] });
  });

  /* ---------- rendering helpers ---------- */
  const renderInline = (text, message) =>
    text.split(/(\[\d+\])/g).map((part, i) => {
      const match = /^\[(\d+)\]$/.exec(part);
      if (!match) return <React.Fragment key={i}>{part}</React.Fragment>;
      const chip = Number(match[1]);
      const source = (message.sources || []).find((s) => s.chip_number === chip);
      if (!source) return <React.Fragment key={i}>{part}</React.Fragment>;
      return (
        <button
          key={i}
          type="button"
          onClick={(e) => openPanel(source, e)}
          className="mx-0.5 inline-flex h-5 min-w-[1.3rem] items-center justify-center rounded px-1 text-[0.7rem] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:brightness-95"
          style={{
            backgroundColor: PALETTE.greenTintBg,
            color: PALETTE.greenTintText,
            border: `1px solid ${PALETTE.green}`,
          }}
        >
          <span className="sr-only">Open source </span>
          {chip}
          <span className="sr-only">: {source.document}</span>
        </button>
      );
    });

  const statusBadge = (message) => {
    if (message.error) {
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold"
          style={{ backgroundColor: PALETTE.redTintBg, color: PALETTE.redTintText }}
        >
          <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Error
        </span>
      );
    }
    if (message.stopped) {
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold"
          style={{ backgroundColor: PALETTE.amberTintBg, color: PALETTE.amberTintText }}
        >
          <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />
          Stopped by you
        </span>
      );
    }
    if (message.from_documents === false) {
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold"
          style={{ backgroundColor: PALETTE.amberTintBg, color: PALETTE.amberTintText }}
        >
          <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Not from your documents
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold"
        style={{ backgroundColor: PALETTE.greenTintBg, color: PALETTE.greenTintText }}
      >
        <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
        From your documents
      </span>
    );
  };

  const controlClass =
    'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1';

  const renderAssistant = (conv, message) => {
    const isStreaming = Boolean(message.streaming);
    const searching = isStreaming && stream && stream.messageId === message.id && stream.phase === 'searching';
    return (
      <li key={message.id} className="flex gap-3">
        <span
          aria-hidden="true"
          className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:flex"
          style={{ backgroundColor: PALETTE.navy, border: `2px solid ${PALETTE.green}` }}
        >
          KA
        </span>
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 text-xs" style={{ color: PALETTE.neutral }}>
            Knowledge Assistant · {timeLabel(message.created_at)}
          </p>
          <div
            className="rounded-lg border bg-white p-4 sm:p-5"
            style={{ borderColor: PALETTE.line }}
            aria-busy={isStreaming ? 'true' : 'false'}
          >
            {searching && (
              <p
                role="status"
                className="flex items-center gap-2 text-sm"
                style={{ color: PALETTE.neutral }}
              >
                <Icons.Search className="h-4 w-4 animate-pulse" aria-hidden="true" />
                Searching the knowledge base at the 0.62 threshold…
              </p>
            )}

            {message.error ? (
              <div
                className="rounded-md p-3 text-sm"
                style={{ backgroundColor: PALETTE.redTintBg, color: PALETTE.redTintText }}
              >
                <p className="font-semibold">Answer could not be generated</p>
                <p className="mt-1">{message.error}</p>
              </div>
            ) : (
              <div aria-live={isStreaming ? 'polite' : 'off'}>
                {message.content.split('\n\n').map((para, i) =>
                  para ? (
                    <p
                      key={i}
                      className="mb-3 text-[0.95rem] leading-7 last:mb-0"
                      style={{ color: '#17222E' }}
                    >
                      {renderInline(para, message)}
                      {isStreaming && i === message.content.split('\n\n').length - 1 && (
                        <span
                          aria-hidden="true"
                          className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse"
                          style={{ backgroundColor: PALETTE.green }}
                        />
                      )}
                    </p>
                  ) : null
                )}
              </div>
            )}

            {!isStreaming && !message.error && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {statusBadge(message)}
                {message.ocrNote && (
                  <span className="text-xs" style={{ color: PALETTE.neutral }}>
                    {message.ocrNote}
                  </span>
                )}
              </div>
            )}

            {!isStreaming && message.sources && message.sources.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: PALETTE.neutral }}>
                  Sources
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {message.sources.map((source) => (
                    <li key={source.chip_number}>
                      <button
                        type="button"
                        onClick={(e) => openPanel(source, e)}
                        className="inline-flex max-w-full items-center gap-2 rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                        style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                      >
                        <span
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[0.7rem] font-semibold"
                          style={{ backgroundColor: PALETTE.greenTintBg, color: PALETTE.greenTintText }}
                        >
                          {source.chip_number}
                        </span>
                        <span className="truncate font-medium">{source.document}</span>
                        <span style={{ color: PALETTE.neutral }}>
                          {source.page_number ? `p. ${source.page_number}` : 'whole file'}
                          {source.ocr ? ' · OCR' : ''}
                        </span>
                        <Icons.ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!message.error && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className={controlClass}
                  style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                >
                  <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />
                  Stop
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopy(message)}
                    className={controlClass}
                    style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                  >
                    {copiedId === message.id ? (
                      <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Icons.FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copiedId === message.id ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReadAloud(message)}
                    disabled={!speechSupported}
                    title={
                      speechSupported
                        ? undefined
                        : 'Your browser does not support speech synthesis'
                    }
                    className={controlClass}
                    style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                  >
                    <Icons.Bell className="h-3.5 w-3.5" aria-hidden="true" />
                    {speakingId === message.id ? 'Stop reading' : 'Read aloud'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerate(conv, message)}
                    disabled={Boolean(stream)}
                    className={controlClass}
                    style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                  >
                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    Regenerate
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </li>
    );
  };

  const totalLabel = `${conversations.length} ${conversations.length === 1 ? 'conversation' : 'conversations'}`;

  return (
    <div
      className="flex h-full min-h-[40rem] flex-col gap-5"
      style={{ fontFamily: brand.fontBody, color: PALETTE.navy }}
    >
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]"
            style={{ fontFamily: brand.fontHeading, color: PALETTE.navy }}
          >
            Chat
          </h1>
          <p className="mt-1 text-sm" style={{ color: PALETTE.neutral }}>
            Ask anything about company material. Answers cite the shared knowledge base, and your
            history is private to you.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            aria-expanded={historyOpen}
            aria-controls="conversation-history"
            className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:hidden"
            style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
          >
            <Icons.Menu className="h-4 w-4" aria-hidden="true" />
            {historyOpen ? 'Hide history' : 'History'}
          </button>
          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: PALETTE.navy }}
          >
            <Icons.Plus className="h-4 w-4" aria-hidden="true" />
            New chat
          </button>
        </div>
      </header>

      <div aria-live="polite" className="sr-only">
        {toast}
      </div>
      {toast && (
        <p
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: PALETTE.line, backgroundColor: '#FFFFFF', color: PALETTE.neutral }}
        >
          {toast}
        </p>
      )}

      <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[19rem_minmax(0,1fr)]">
        {/* ---------------- history ---------------- */}
        <aside
          id="conversation-history"
          aria-label="Conversation history"
          className={`${historyOpen ? 'flex' : 'hidden'} min-h-0 flex-col overflow-hidden rounded-lg border bg-white lg:flex`}
          style={{ borderColor: PALETTE.line, borderRadius: brand.radius }}
        >
          <div className="border-b p-4" style={{ borderColor: PALETTE.line }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: brand.fontHeading }}>
              Your conversations
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: PALETTE.neutral }}>
              {totalLabel} · visible only to you
            </p>
            <div className="mt-3">
              <UI.Label htmlFor="history-search" className="sr-only">
                Search your conversations
              </UI.Label>
              <div className="relative">
                <Icons.Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  aria-hidden="true"
                  style={{ color: PALETTE.neutral }}
                />
                <UI.Input
                  id="history-search"
                  type="search"
                  value={historyQuery}
                  onChange={(e) => setHistoryQuery(e.target.value)}
                  placeholder="e.g. expenses"
                  className="w-full pl-9"
                />
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {conversations.length === 0 ? (
              <div className="px-2 py-10 text-center">
                <p className="text-sm font-medium">No conversations yet</p>
                <p className="mt-1 text-xs" style={{ color: PALETTE.neutral }}>
                  Ask your first question and it will be saved here.
                </p>
              </div>
            ) : groups.length === 0 ? (
              <div className="px-2 py-10 text-center">
                <p className="text-sm font-medium">No conversations found</p>
                <p className="mt-1 text-xs" style={{ color: PALETTE.neutral }}>
                  Nothing matches “{historyQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => setHistoryQuery('')}
                  className="mt-3 rounded-md border px-3 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                  style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                >
                  Clear search
                </button>
              </div>
            ) : (
              groups.map((group) => (
                <section key={group.label} className="mb-4 last:mb-0">
                  <h3
                    className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: PALETTE.neutral }}
                  >
                    {group.label}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((conv) => {
                      const isActive = conv.id === activeId;
                      return (
                        <li key={conv.id}>
                          <div
                            className="group flex items-start gap-1 rounded-md"
                            style={{
                              backgroundColor: isActive ? '#EEF3F8' : 'transparent',
                              boxShadow: isActive ? `inset 3px 0 0 ${PALETTE.green}` : 'none',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveId(conv.id);
                                setConfirmDeleteId(null);
                                setHistoryOpen(false);
                              }}
                              aria-current={isActive ? 'true' : undefined}
                              className="min-w-0 flex-1 rounded-md px-3 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:bg-slate-50"
                            >
                              <span className="block truncate text-sm font-medium">
                                {conv.title}
                              </span>
                              <span className="mt-0.5 block text-xs" style={{ color: PALETTE.neutral }}>
                                {timeLabel(conv.updated_at)} ·{' '}
                                {conv.messages.filter((m) => m.role === 'user').length} question
                                {conv.messages.filter((m) => m.role === 'user').length === 1 ? '' : 's'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmDeleteId((id) => (id === conv.id ? null : conv.id))
                              }
                              aria-expanded={confirmDeleteId === conv.id}
                              aria-label={`Delete conversation ${conv.title}`}
                              className="mt-2 mr-1 rounded-md p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:bg-slate-200"
                              style={{ color: PALETTE.neutral }}
                            >
                              <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                          {confirmDeleteId === conv.id && (
                            <div
                              className="mx-1 mt-1 rounded-md border p-3"
                              style={{ borderColor: PALETTE.line, backgroundColor: '#FBFCFD' }}
                            >
                              <p className="text-xs" style={{ color: PALETTE.navy }}>
                                Delete this conversation and all of its messages? No copy is kept.
                              </p>
                              <div className="mt-2 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(conv)}
                                  className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                                  style={{ backgroundColor: PALETTE.redTintText }}
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="rounded-md border bg-white px-2.5 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                                  style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))
            )}
          </div>
        </aside>

        {/* ---------------- thread ---------------- */}
        <main
          className="flex min-h-0 flex-col overflow-hidden rounded-lg border bg-white"
          style={{ borderColor: PALETTE.line, borderRadius: brand.radius }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4" style={{ borderColor: PALETTE.line }}>
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold" style={{ fontFamily: brand.fontHeading }}>
                {activeConversation ? activeConversation.title : 'New conversation'}
              </h2>
              <p className="mt-0.5 text-xs" style={{ color: PALETTE.neutral }}>
                {activeConversation
                  ? `Started ${dayLabel(activeConversation.created_at)} at ${timeLabel(activeConversation.created_at)}`
                  : 'Nothing asked yet'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('knowledge-base')}
              className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
            >
              <Icons.Package className="h-4 w-4" aria-hidden="true" />
              Knowledge base
            </button>
          </div>

          <div
            ref={threadRef}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6"
            style={{ backgroundColor: brand.backgroundColor }}
          >
            {!activeConversation ? (
              <div className="mx-auto max-w-xl py-12 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: PALETTE.navy, border: `2px solid ${PALETTE.green}` }}
                >
                  KA
                </span>
                <h3 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Ask your first question
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6" style={{ color: PALETTE.neutral }}>
                  The assistant searches every document in the shared knowledge base and answers with
                  numbered citations you can open. If nothing relevant is found, the answer is marked
                  “not from your documents”.
                </p>
                <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2">
                  {[
                    'What is the client dinner limit in London?',
                    'Who approves a £12,000 purchase order?',
                    'What PPE is required on a live site?',
                  ].map((example) => (
                    <li key={example}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuestion(example);
                          if (composerRef.current) composerRef.current.focus();
                        }}
                        className="w-full rounded-md border bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                        style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                      >
                        {example}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="mx-auto flex max-w-3xl flex-col gap-7">
                {activeConversation.messages.map((message) =>
                  message.role === 'user' ? (
                    <li key={message.id} className="flex flex-col items-end">
                      <p className="mb-1.5 text-xs" style={{ color: PALETTE.neutral }}>
                        You · {timeLabel(message.created_at)}
                      </p>
                      <p
                        className="max-w-[42rem] rounded-lg px-4 py-3 text-[0.95rem] leading-6 text-white"
                        style={{ backgroundColor: PALETTE.navy }}
                      >
                        {message.content}
                      </p>
                    </li>
                  ) : (
                    renderAssistant(activeConversation, message)
                  )
                )}
              </ul>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t px-4 py-4 sm:px-6"
            style={{ borderColor: PALETTE.line }}
          >
            <UI.Label htmlFor="question" className="text-sm font-medium">
              Your question
            </UI.Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
              <UI.Textarea
                id="question"
                ref={composerRef}
                rows={2}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask about a policy, a process or a document…"
                aria-describedby="composer-hint"
                className="w-full flex-1"
              />
              <div className="flex gap-2">
                {stream && (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
                  >
                    <Icons.X className="h-4 w-4" aria-hidden="true" />
                    Stop
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!question.trim() || Boolean(stream)}
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: PALETTE.navy }}
                >
                  <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                  {stream ? 'Answering…' : 'Ask'}
                </button>
              </div>
            </div>
            <p id="composer-hint" className="mt-2 text-xs" style={{ color: PALETTE.neutral }}>
              Press Enter to send, Shift + Enter for a new line. Answers are grounded in the shared
              knowledge base above a 0.62 similarity threshold.
            </p>
          </form>
        </main>
      </div>

      {/* ---------------- source panel ---------------- */}
      {panelSource && (
        <>
          <div
            aria-hidden="true"
            onClick={closePanel}
            className="fixed inset-0 z-40 bg-slate-900/30"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="source-panel-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl sm:w-[26rem]"
          >
            <div
              className="flex items-start justify-between gap-3 border-b px-5 py-4"
              style={{ borderColor: PALETTE.line }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: PALETTE.neutral }}>
                  Source {panelSource.chip_number}
                </p>
                <h2
                  id="source-panel-title"
                  className="mt-1 break-words text-base font-semibold"
                  style={{ fontFamily: brand.fontHeading }}
                >
                  {panelSource.document}
                </h2>
                <p className="mt-1 text-xs" style={{ color: PALETTE.neutral }}>
                  {panelSource.page_number
                    ? `Page ${panelSource.page_number}`
                    : 'Page number not applicable for this format'}
                  {panelSource.ocr ? ' · read with Tesseract OCR' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close source panel"
                className="rounded-md p-2 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{ color: PALETTE.navy }}
              >
                <Icons.X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              {panelSource.ocr && (
                <p
                  className="mb-4 rounded-md px-3 py-2 text-xs font-medium"
                  style={{ backgroundColor: PALETTE.amberTintBg, color: PALETTE.amberTintText }}
                >
                  This passage was recovered from a scanned page by local OCR, so spacing may differ
                  from the original.
                </p>
              )}
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: PALETTE.neutral }}>
                Cited passage
              </h3>
              <blockquote
                className="rounded-md border-l-4 bg-slate-50 p-4 text-sm leading-7"
                style={{ borderColor: PALETTE.green, color: '#17222E' }}
              >
                {panelSource.passage_text}
              </blockquote>
              {panelNote && (
                <p
                  role="status"
                  className="mt-4 rounded-md px-3 py-2 text-xs font-medium"
                  style={{ backgroundColor: PALETTE.greenTintBg, color: PALETTE.greenTintText }}
                >
                  {panelNote}
                </p>
              )}
            </div>

            <div
              className="flex flex-wrap gap-2 border-t px-5 py-4"
              style={{ borderColor: PALETTE.line }}
            >
              <button
                type="button"
                onClick={() => setPanelNote(`Download started — ${panelSource.document}`)}
                className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: PALETTE.navy }}
              >
                <Icons.Download className="h-4 w-4" aria-hidden="true" />
                Download original
              </button>
              <button
                type="button"
                onClick={() => {
                  closePanel();
                  navigate('knowledge-base');
                }}
                className="inline-flex items-center gap-2 rounded-md border bg-white px-3.5 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ borderColor: PALETTE.line, color: PALETTE.navy }}
              >
                <Icons.Package className="h-4 w-4" aria-hidden="true" />
                View in knowledge base
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
