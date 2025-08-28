import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Rocket,
  Settings,
  Github,
  ChevronRight,
  ChevronDown,
  Terminal,
  Laptop,
  Smartphone,
  Moon,
  Sun,
  FileCode,
  Folder,
  FolderOpen,
  Plus,
  Search,
} from "lucide-react";

// NOTE: This is a standalone UI/UX mock for a Lovable-like agent IDE.
// It focuses on branding (</> vina.dev), dark theme, CS2-orange accents, and realistic layout.
// You can wire real agent calls later by replacing the mock handlers (runBuild, deploy, sendMessage, etc.).

// --- Brand palette (CS2-like orange on carbon black) -------------------------
const colors = {
  bg: "#0b0b0c",
  bgMuted: "#111114",
  bgRaised: "#141419",
  border: "#1f1f28",
  text: "#e6e6eb",
  textDim: "#a2a2ad",
  accent: "#ff8c1a",
  accent2: "#ffd6a6",
  success: "#66e392",
  warn: "#ffd073",
  error: "#ff6363",
};

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", colors.bg);
    document.documentElement.style.setProperty("--bg-muted", colors.bgMuted);
    document.documentElement.style.setProperty("--bg-raised", colors.bgRaised);
    document.documentElement.style.setProperty("--border", colors.border);
    document.documentElement.style.setProperty("--text", colors.text);
    document.documentElement.style.setProperty("--text-dim", colors.textDim);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--accent2", colors.accent2);
    document.documentElement.style.setProperty("--success", colors.success);
    document.documentElement.style.setProperty("--warn", colors.warn);
    document.documentElement.style.setProperty("--error", colors.error);
  }, []);
  return { dark, setDark };
}

// --- Logo with typewriter effect --------------------------------------------
function VinaLogo() {
  const [step, setStep] = useState(0);
  const text = "</> vina.dev";
  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s < text.length ? s + 1 : s)),
      60,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-2 select-none">
      <motion.span
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="rounded-xl px-2 py-1 text-sm"
        style={{ background: "#1b1b21", color: colors.accent }}
      >
        {"</>"}
      </motion.span>
      <div
        className="font-semibold tracking-wide"
        style={{ color: colors.text }}
      >
        <span style={{ color: colors.text }}>{text.slice(0, 3)}</span>
        <span style={{ color: colors.accent }}>{text.slice(3, step)}</span>
        <span
          className="inline-block w-2 ml-0.5"
          style={{
            background: step < text.length ? "transparent" : colors.accent,
            height: 18,
          }}
        />
      </div>
    </div>
  );
}

// --- Topbar ------------------------------------------------------------------
function Topbar({
  onRun,
  onDeploy,
  dark,
  setDark,
}: {
  onRun: () => void;
  onDeploy: () => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 h-14 border-b"
      style={{ background: colors.bgMuted, borderColor: colors.border }}
    >
      <div className="flex items-center gap-3">
        <VinaLogo />
        <div
          className="text-xs px-2 py-1 rounded-lg"
          style={{ background: colors.bgRaised, color: colors.textDim }}
        >
          project:{" "}
          <span className="text-[13px]" style={{ color: colors.text }}>
            vina-agent
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          className="px-3 py-1.5 rounded-xl text-sm font-medium border flex items-center gap-2"
          style={{
            background: colors.bgRaised,
            borderColor: colors.border,
            color: colors.text,
          }}
        >
          <Play size={16} /> Run
        </button>
        <button
          onClick={onDeploy}
          className="px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          style={{ background: colors.accent, color: "#101010" }}
        >
          <Rocket size={16} /> Deploy
        </button>
        <div
          className="mx-2 w-px self-stretch"
          style={{ background: colors.border }}
        />
        <button
          className="px-2 py-1.5 rounded-xl border"
          onClick={() => setDark(!dark)}
          title="Toggle theme"
          style={{ background: colors.bgRaised, borderColor: colors.border }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="px-2 py-1.5 rounded-xl border"
          style={{ background: colors.bgRaised, borderColor: colors.border }}
        >
          <Settings size={16} />
        </button>
        <a
          className="px-2 py-1.5 rounded-xl border"
          style={{ background: colors.bgRaised, borderColor: colors.border }}
          href="https://github.com/filmarcelino"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} />
        </a>
      </div>
    </div>
  );
}

// --- Sidebar -----------------------------------------------------------------
function Sidebar() {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: colors.bgMuted,
        borderRight: `1px solid ${colors.border}`,
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: colors.border }}
      >
        <Search size={16} className="opacity-70" />
        <input
          placeholder="Search files…"
          className="bg-transparent text-sm outline-none flex-1"
          style={{ color: colors.text }}
        />
        <button
          className="px-2 py-1 rounded-lg border"
          style={{ borderColor: colors.border }}
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="p-2 overflow-auto text-sm" style={{ color: colors.text }}>
        <Tree
          label="app"
          iconOpen={<FolderOpen size={16} />}
          iconClosed={<Folder size={16} />}
          defaultOpen
        >
          <Tree label="src" defaultOpen>
            <Tree label="components" defaultOpen>
              <TreeLeaf label="AgentChat.tsx" />
              <TreeLeaf label="Editor.tsx" />
              <TreeLeaf label="Preview.tsx" />
            </Tree>
            <TreeLeaf label="agent-graph.ts" />
            <TreeLeaf label="tools.ts" />
            <TreeLeaf label="index.tsx" />
          </Tree>
          <Tree label="public">
            <TreeLeaf label="favicon.svg" />
          </Tree>
          <TreeLeaf label="package.json" />
          <TreeLeaf label="README.md" />
        </Tree>
      </div>
      <div
        className="mt-auto p-3 border-t text-xs"
        style={{ borderColor: colors.border, color: colors.textDim }}
      >
        <div>
          Credits: <span style={{ color: colors.accent }}>1,240</span>
        </div>
        <div className="opacity-70 mt-1">Based on open-source components</div>
      </div>
    </div>
  );
}

function Tree({
  label,
  children,
  defaultOpen = false,
  iconOpen,
  iconClosed,
}: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 cursor-pointer hover:opacity-90"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="mr-1">
          {open
            ? (iconOpen ?? <FolderOpen size={14} />)
            : (iconClosed ?? <Folder size={14} />)}
        </span>
        <span>{label}</span>
      </div>
      {open && <div className="pl-6 py-1 space-y-1">{children}</div>}
    </div>
  );
}

function TreeLeaf({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pl-6 py-0.5 opacity-90 hover:opacity-100 cursor-default">
      <FileCode size={14} />
      <span>{label}</span>
    </div>
  );
}

// --- Editor Pane -------------------------------------------------------------
function EditorPane({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="h-full w-full">
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: colors.border }}
      >
        <div className="text-xs" style={{ color: colors.textDim }}>
          src/components/Editor.tsx
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className="px-2 py-1 rounded-lg"
            style={{ background: colors.bgRaised, color: colors.textDim }}
          >
            TSX
          </span>
          <span
            className="px-2 py-1 rounded-lg"
            style={{ background: colors.bgRaised, color: colors.textDim }}
          >
            LF
          </span>
        </div>
      </div>
      <textarea
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[calc(100%-36px)] p-3 font-mono text-sm outline-none resize-none"
        style={{ background: colors.bg, color: colors.text }}
        placeholder={`// Type here…\n// This is a mock editor. Swap for Monaco later.`}
      />
    </div>
  );
}

// --- Preview Pane ------------------------------------------------------------
function PreviewPane({
  html,
  device,
}: {
  html: string;
  device: "desktop" | "mobile";
}) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (!frameRef.current) return;
    const doc = frameRef.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset='utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1' /><style>body{margin:0;background:#0b0b0c;color:#e6e6eb;font-family:Inter,ui-sans-serif,system-ui} .hero{padding:20px;border:1px solid #1f1f28;border-radius:16px;background:#111114} .btn{padding:10px 14px;border-radius:12px;border:1px solid #1f1f28;background:#141419;color:#e6e6eb} .btn.primary{background:#ff8c1a;color:#101010;border-color:#ff8c1a}</style></head><body>${html}</body></html>`,
    );
    doc.close();
  }, [html]);

  const frameStyles =
    device === "mobile"
      ? {
          width: 390,
          height: 800,
          border: `1px solid ${colors.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }
      : ({ width: "100%", height: "100%", border: "none" } as any);

  return (
    <div className="h-full w-full flex flex-col">
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: colors.border }}
      >
        <button
          className="px-2 py-1 rounded-lg text-xs"
          style={{ background: colors.bgRaised, color: colors.textDim }}
        >
          <Laptop size={14} />
        </button>
        <button
          className="px-2 py-1 rounded-lg text-xs"
          style={{ background: colors.bgRaised, color: colors.textDim }}
        >
          <Smartphone size={14} />
        </button>
        <div className="ml-auto text-xs" style={{ color: colors.textDim }}>
          Live Preview
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-3">
        <iframe ref={frameRef} style={frameStyles as any} />
      </div>
    </div>
  );
}

// --- Console Pane ------------------------------------------------------------
function ConsolePane({ logs }: { logs: string[] }) {
  return (
    <div
      className="h-full w-full font-mono text-xs overflow-auto p-3"
      style={{ background: colors.bgRaised, color: colors.text }}
    >
      {logs.length === 0 ? (
        <div style={{ color: colors.textDim }}>
          No logs yet. Hit Run to see build output…
        </div>
      ) : (
        logs.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <span style={{ color: colors.accent }}>$</span> {l}
          </div>
        ))
      )}
    </div>
  );
}

// --- Chat Pane ---------------------------------------------------------------
function ChatPane({ onSend }: { onSend: (msg: string) => void }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-auto p-3"
        style={{ color: colors.textDim }}
      >
        <div className="opacity-80 text-sm">
          Say hi to your agent. Ask for a landing page with CTA and pricing
          grid, for example.
        </div>
      </div>
      <div
        className="flex items-center gap-2 p-2 border-t"
        style={{ borderColor: colors.border }}
      >
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && msg.trim()) {
              onSend(msg);
              setMsg("");
            }
          }}
          placeholder="Describe what to build…"
          className="flex-1 px-3 py-2 rounded-xl outline-none"
          style={{
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        />
        <button
          onClick={() => {
            if (msg.trim()) {
              onSend(msg);
              setMsg("");
            }
          }}
          className="px-3 py-2 rounded-xl font-medium"
          style={{ background: colors.accent, color: "#101010" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// --- Main Layout -------------------------------------------------------------
export default function VinaAgentShell() {
  const { dark, setDark } = useTheme();
  const [code, setCode] = useState(
    `export default function Button(){\n  return (<button className="btn primary">Click me</button>)\n}`,
  );
  const [html, setHtml] = useState(
    `<div class='hero'>\n  <h1>Vina Agent</h1>\n  <p>Build full-stack apps from a prompt. Powered by your own keys.</p>\n  <button class='btn primary'>Get Started</button>\n</div>`,
  );
  const [logs, setLogs] = useState<string[]>([]);

  function runBuild() {
    setLogs((ls) => [
      ...ls,
      "pnpm install",
      "✔ installed 428 packages in 21.4s",
      "pnpm build",
      "✔ compiled successfully (tsc) in 5.8s",
      "Running e2e:playwright",
      "✔ 14 passed, 0 failed",
    ]);
  }
  function deploy() {
    setLogs((ls) => [
      ...ls,
      "Deploying to Vercel…",
      "✔ Preview URL: https://vina-agent-preview.vercel.app",
      "Promote to production: vercel --prod",
    ]);
  }
  function onSend(msg: string) {
    setLogs((ls) => [
      ...ls,
      `agent: planning → "${msg}"`,
      "tools: fs.write many (3 diffs)",
      "tools: run tests (all green)",
      "agent: update preview",
    ]);
    const title = msg.replace(/\.$/, "");
    setHtml(
      `<div class='hero'>\n  <h1>${title || "Vina Agent"}</h1>\n  <p>Build full-stack apps from a prompt. Powered by your own keys.</p>\n  <button class='btn primary'>Get Started</button>\n</div>`,
    );
  }

  return (
    <div
      className="w-full h-full"
      style={{ background: colors.bg, color: colors.text }}
    >
      <Topbar
        onRun={runBuild}
        onDeploy={deploy}
        dark={dark}
        setDark={setDark}
      />
      <div
        className="grid"
        style={{
          gridTemplateColumns: "260px 1fr 1fr",
          gridTemplateRows: "1fr 220px",
          height: "calc(100vh - 56px)",
        }}
      >
        <div
          className="row-span-2"
          style={{ borderRight: `1px solid ${colors.border}` }}
        >
          <Sidebar />
        </div>
        <div
          className="col-span-1"
          style={{ borderRight: `1px solid ${colors.border}` }}
        >
          <EditorPane value={code} onChange={setCode} />
        </div>
        <div className="col-span-1">
          <PreviewPane html={html} device="desktop" />
        </div>
        <div
          className="col-span-1"
          style={{
            borderTop: `1px solid ${colors.border}`,
            borderRight: `1px solid ${colors.border}`,
          }}
        >
          <ChatPane onSend={onSend} />
        </div>
        <div
          className="col-span-2"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ borderColor: colors.border, background: colors.bgMuted }}
          >
            <Terminal size={16} />
            <div className="text-xs" style={{ color: colors.textDim }}>
              Console
            </div>
          </div>
          <ConsolePane logs={logs} />
        </div>
      </div>
      <div
        className="text-[11px] opacity-70 px-4 py-2 border-t"
        style={{ borderColor: colors.border }}
      >
        Built by Clutch Studios — based on open-source components. “Vina Agent”
        is a customized UI. © 2025.
      </div>
    </div>
  );
}
