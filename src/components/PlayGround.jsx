import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { monokaiPro } from "@codesandbox/sandpack-themes";

// Import our custom hooks for the full playground
import {
  useResetCode,
  usePrettifyCode,
  useToggleLineNumbers,
  useRefreshPreview,
  useCopyCode,
} from "../hooks/useSandpackActions";

// Import extracted styles (Fix 6)
import "./PlayGround.css";

// ─── COLORS kept for any remaining dynamic/JS-only usage ──
// e.g., passing backgroundColor to Sandpack's style prop
const COLORS = {
  editorBg: "#000000",
  toolbarBg: "#000000",
  consoleBg: "#000000",
};

// ═══════════════════════════════════════════════════════════
// LEVEL 1: BasicPlayground
// ═══════════════════════════════════════════════════════════
// The simplest possible playground — editor + preview.
// No tabs, no buttons, no extras.
//
// Props:
//   code  → string of React/JSX code to pre-fill the editor
//   title → filename label (not displayed, but useful for context)
export function BasicPlayground({ code, title = "App.js" }) {
  return (
    <div className="playground-wrapper">
      <SandpackProvider
        template="react"
        theme={{
          ...monokaiPro,
          colors: {
            ...monokaiPro.colors,
            surface1: COLORS.editorBg,
            surface2: COLORS.toolbarBg,
            surface3: COLORS.consoleBg,
          },
        }}
        files={{ "/App.js": code }}
        options={{ autorun: true }}
      >
        {/* className replaces the old inline borderRadius/border/boxShadow */}
        <SandpackLayout className="sp-layout-basic">
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            style={{ height: "350px", flex: 1 }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ height: "350px", flex: 1 }}
          />
        </SandpackLayout>
      </SandpackProvider>

      <p className="playground-hint">Edit the code and see changes live.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LEVEL 2: TabbedPlayground
// ═══════════════════════════════════════════════════════════
// Adds a Console tab next to the Result tab.
// Teaches the display:none vs conditional rendering pattern.
//
// Props:
//   code        → string of React/JSX code
//   title       → filename label
//   showPreview → which tab to show first (default: true = Result)
export function TabbedPlayground({
  code,
  title = "App.js",
  showPreview = true,
}) {
  const [activeTab, setActiveTab] = useState(
    showPreview ? "result" : "console",
  );

  return (
    <div className="playground-wrapper">
      <SandpackProvider
        template="react"
        theme={{
          ...monokaiPro,
          colors: {
            ...monokaiPro.colors,
            surface1: COLORS.editorBg,
            surface2: COLORS.toolbarBg,
            surface3: COLORS.consoleBg,
          },
        }}
        files={{ "/App.js": code }}
        options={{ autorun: true }}
      >
        {/* ── Header Bar ─────────────────────────────── */}
        <div className="playground-toolbar">
          <span className="playground-toolbar__label">
            ⚡️ INTERACTIVE PLAYGROUND
          </span>
          <span className="playground-toolbar__filename">{title}</span>
        </div>

        {/* ── Main Layout ────────────────────────────── */}
        <SandpackLayout className="sp-layout-rounded-bottom">
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            style={{ height: "400px", flex: 1 }}
          />

          {/* Right Panel: Tabbed Result/Console */}
          <div className="playground-right-panel" style={{ height: "400px" }}>
            {/* Tab Switcher */}
            <div className="tab-bar">
              <button
                onClick={() => setActiveTab("result")}
                className={`tab-btn ${activeTab === "result" ? "tab-btn--active" : ""}`}
              >
                Result
              </button>
              <button
                onClick={() => setActiveTab("console")}
                className={`tab-btn ${activeTab === "console" ? "tab-btn--active" : ""}`}
              >
                Console
              </button>
            </div>

            {/* Tab Content — display:none preserves internal state */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: activeTab === "result" ? "block" : "none",
              }}
            >
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: "100%", backgroundColor: "#ffffff" }}
              />
            </div>
            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: activeTab === "console" ? "block" : "none",
              }}
            >
              <SandpackConsole
                style={{ height: "100%", backgroundColor: COLORS.consoleBg }}
              />
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CUSTOM TOOLBAR (internal component)
// ═══════════════════════════════════════════════════════════
// Uses all custom hooks to provide action buttons.
// MUST be inside <SandpackProvider> — the hooks need context.
function CustomToolbar({ onToggleLines, showLineNumbers }) {
  const { handleReset } = useResetCode();
  const { handlePrettify } = usePrettifyCode();
  const { handleRefresh } = useRefreshPreview();
  const { handleCopy, copied } = useCopyCode();

  return (
    <div className="playground-toolbar">
      {/* Left side: label */}
      <span className="playground-toolbar__label">
        ⚡️ INTERACTIVE PLAYGROUND
      </span>

      {/* Right side: action buttons — now using CSS classes */}
      <div className="playground-actions">
        <button
          onClick={handleRefresh}
          className="action-btn action-btn--pink"
          title="Re-run the code"
        >
          ▶ Run
        </button>

        <button
          onClick={handleReset}
          className="action-btn action-btn--yellow"
          title="Reset to original code"
        >
          ↺ Reset
        </button>

        <button
          onClick={onToggleLines}
          className="action-btn action-btn--line-toggle"
          title="Toggle line numbers"
        >
          {showLineNumbers ? "# Hide Lines" : "# Show Lines"}
        </button>

        <button
          onClick={handlePrettify}
          className="action-btn action-btn--white"
          title="Format code"
        >
          ✨ Prettify
        </button>

        <button
          onClick={handleCopy}
          className={`action-btn ${copied ? "action-btn--green" : "action-btn--white"}`}
          title="Copy code to clipboard"
        >
          {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LEVEL 3: FullPlayground (DEFAULT EXPORT)
// ═══════════════════════════════════════════════════════════
// The final form — toolbar + tabbed preview.
//
// Props:
//   code        → string of React/JSX code
//   title       → filename label
//   showPreview → default tab (true = Result)
//   files       → optional object for multi-file (overrides code)
export default function FullPlayground({
  code,
  title = "App.js",
  showPreview = true,
  files,
}) {
  const [activeTab, setActiveTab] = useState(
    showPreview ? "result" : "console",
  );

  const { showLineNumbers, editorKey, toggleLineNumbers } =
    useToggleLineNumbers(true);

  // If `files` prop exists (multi-file), use it. Otherwise single file.
  const sandpackFiles = files || { "/App.js": code };
  const hasMultipleFiles = files && Object.keys(files).length > 1;

  return (
    <div className="playground-wrapper">
      <SandpackProvider
        template="react"
        theme={{
          ...monokaiPro,
          colors: {
            ...monokaiPro.colors,
            surface1: COLORS.editorBg,
            surface2: COLORS.toolbarBg,
            surface3: COLORS.consoleBg,
          },
        }}
        files={sandpackFiles}
        options={{ autorun: true }}
      >
        {/* ── Custom Toolbar ──────────────────────────── */}
        <CustomToolbar
          onToggleLines={toggleLineNumbers}
          showLineNumbers={showLineNumbers}
        />

        {/* ── Main Layout ────────────────────────────── */}
        <SandpackLayout className="sp-layout-rounded-bottom">
          {/*
            KEY PROP TRICK:
            editorKey changes on line-number toggle → React remounts
            the editor → new CodeMirror instance reads updated prop.
          */}
          <SandpackCodeEditor
            key={editorKey}
            showLineNumbers={showLineNumbers}
            showTabs={hasMultipleFiles}
            closableTabs={false}
            style={{ height: "450px", flex: 1 }}
          />

          {/* Right Panel */}
          <div className="playground-right-panel" style={{ height: "450px" }}>
            <div className="tab-bar">
              <button
                onClick={() => setActiveTab("result")}
                className={`tab-btn ${activeTab === "result" ? "tab-btn--active" : ""}`}
              >
                Result
              </button>
              <button
                onClick={() => setActiveTab("console")}
                className={`tab-btn ${activeTab === "console" ? "tab-btn--active" : ""}`}
              >
                Console
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: activeTab === "result" ? "block" : "none",
              }}
            >
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: "100%", backgroundColor: "#ffffff" }}
              />
            </div>
            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: activeTab === "console" ? "block" : "none",
              }}
            >
              <SandpackConsole
                style={{ height: "100%", backgroundColor: COLORS.consoleBg }}
              />
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>

      {/* 
        NOTE: The inline <style> block is GONE.
        Those Sandpack overrides now live in PlayGround.css
        alongside the rest of our extracted styles.
      */}
    </div>
  );
}
