// ─────────────────────────────────────────────────────────
// PlayGround.jsx
// The main interactive code playground component.
//
// This file provides THREE levels of playground (inspired by Josh Comeau's
// progressive approach):
//
//   1. BasicPlayground    → Minimal: just editor + preview
//   2. TabbedPlayground   → Adds Console tab + Result/Console switcher
//   3. FullPlayground     → Custom toolbar with all action buttons
//                           (default export)
//
// The idea for the blog is to START with BasicPlayground,
// then progressively upgrade to FullPlayground as you teach each concept.
//
// All playgrounds use the Monokai Pro theme for consistency.
// ─────────────────────────────────────────────────────────

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

// ─── Shared Monokai Pro Color Palette ─────────────────────
// Extracted here so all playground variants use the same colors.
// If you swap themes later, you only change this one object.
const COLORS = {
  editorBg: "#2d2a2e", // Main editor background
  toolbarBg: "#221f22", // Dark toolbar/tab bar background
  border: "#3e3b3f", // Subtle border between panels
  consoleBg: "#19181a", // Console panel (even darker)
  textMuted: "#72696a", // Dimmed text (labels, hints)
  green: "#a9dc76", // Active tab indicator
  pink: "#ff6188", // Action button accent
  yellow: "#ffd866", // Warning/highlight accent
  tabActive: "#ffffff", // Active tab text color
  tabInactive: "#72696a", // Inactive tab text color
};

// ─── Shared tab button style generator ────────────────────
// Returns an inline style object for Result/Console tab buttons.
// Takes a boolean `isActive` to toggle visual state.
const getTabStyle = (isActive) => ({
  padding: "6px 16px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: isActive ? "600" : "400",
  color: isActive ? COLORS.tabActive : COLORS.tabInactive,
  // Green underline on active tab — subtle but clear indicator
  borderBottom: isActive
    ? `2px solid ${COLORS.green}`
    : "2px solid transparent",
  transition: "all 0.2s",
});

// ─── Shared action button style generator ─────────────────
// Returns an inline style object for toolbar action buttons.
// Used by the FullPlayground's CustomToolbar.
const getActionButtonStyle = (accentColor = COLORS.pink) => ({
  padding: "4px 14px",
  borderRadius: "6px",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.editorBg,
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: "600",
  color: accentColor,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.2s",
});

// ═══════════════════════════════════════════════════════════
// LEVEL 1: BasicPlayground
// ═══════════════════════════════════════════════════════════
// The simplest possible playground — editor on the left,
// live preview on the right. No tabs, no buttons, no extras.
// This is what you show FIRST in the blog to introduce Sandpack.
//
// Props:
//   code  → string of React/JSX code to pre-fill the editor
//   title → filename label (not shown here, but useful for context)
//
// Usage:
//   <BasicPlayground code={`function App() { return <h1>Hi</h1>; }`} />
export function BasicPlayground({ code, title = "App.js" }) {
  return (
    <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
      <SandpackProvider
        template="react" // React template = JSX support + live preview
        theme={monokaiPro} // Monokai Pro dark theme
        files={{ "/App.js": code }} // Single file — the code prop goes here
        options={{ autorun: true }} // Preview updates as you type
      >
        <SandpackLayout
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* Left half: code editor */}
          <SandpackCodeEditor
            showLineNumbers // Show line numbers in the gutter
            showTabs={false} // No file tabs — we only have one file
            style={{ height: "350px", flex: 1 }}
          />

          {/* Right half: live preview */}
          <SandpackPreview
            showOpenInCodeSandbox={false} // Hide the "Open in CodeSandbox" button
            showRefreshButton={false} // We'll add our own later
            style={{ height: "350px", flex: 1 }}
          />
        </SandpackLayout>
      </SandpackProvider>

      {/* Hint text below the editor */}
      <p
        style={{
          fontSize: "11px",
          color: COLORS.textMuted,
          marginTop: "10px",
          textAlign: "right",
          fontStyle: "italic",
        }}
      >
        Edit the code and see changes live.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LEVEL 2: TabbedPlayground
// ═══════════════════════════════════════════════════════════
// Adds a Console tab next to the Result tab.
// Teaches the display:none vs conditional rendering pattern.
//
// KEY LEARNING POINT (for your blog):
//   We use display:none to hide the inactive tab instead of
//   conditional rendering (&&). Why?
//   → SandpackPreview and SandpackConsole maintain internal state.
//   → If you unmount them with &&, they lose state and re-initialize
//     every time you switch tabs.
//   → display:none keeps them mounted but invisible = state preserved.
//
// Props:
//   code       → string of React/JSX code
//   title      → filename label
//   showPreview → which tab to show by default (true = Result, false = Console)
//
// Usage:
//   <TabbedPlayground code={`console.log("test"); ...`} />
export function TabbedPlayground({
  code,
  title = "App.js",
  showPreview = true,
}) {
  // Track which tab is active: "result" shows preview, "console" shows logs
  const [activeTab, setActiveTab] = useState(
    showPreview ? "result" : "console",
  );

  return (
    <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
      <SandpackProvider
        template="react"
        theme={monokaiPro}
        files={{ "/App.js": code }}
        options={{ autorun: true }}
      >
        {/* ── Header Bar ────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.6rem 1rem",
            backgroundColor: COLORS.toolbarBg,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            border: `1px solid ${COLORS.border}`,
            borderBottom: "none",
          }}
        >
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            ⚡️ INTERACTIVE PLAYGROUND
          </span>
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: "11px",
            }}
          >
            {title}
          </span>
        </div>

        {/* ── Main Layout ───────────────────────────────── */}
        <SandpackLayout
          style={{
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            backgroundColor: COLORS.editorBg,
          }}
        >
          {/* Left Panel: Code Editor */}
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            style={{ height: "400px", flex: 1 }}
          />

          {/* Right Panel: Tabbed Result/Console */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "400px",
              borderLeft: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.editorBg,
              overflow: "hidden",
            }}
          >
            {/* Tab Switcher Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                backgroundColor: COLORS.toolbarBg,
                borderBottom: `1px solid ${COLORS.border}`,
                gap: "4px",
              }}
            >
              <button
                onClick={() => setActiveTab("result")}
                style={getTabStyle(activeTab === "result")}
              >
                Result
              </button>
              <button
                onClick={() => setActiveTab("console")}
                style={getTabStyle(activeTab === "console")}
              >
                Console
              </button>
            </div>

            {/* ── Tab Content ───────────────────────────── */}
            {/*
              DISPLAY:NONE PATTERN
              We render BOTH panels but hide the inactive one.
              This preserves the internal state of each Sandpack component.
              If we used {activeTab === "result" && <SandpackPreview />},
              switching tabs would destroy + recreate the component,
              losing scroll position, console history, etc.
            */}
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
// This component uses all our custom hooks to provide action buttons.
// It MUST be rendered inside a <SandpackProvider> because the hooks
// need access to Sandpack's React context.
//
// Why is this a separate component and not inline in FullPlayground?
// → Because useSandpack() can only be called inside SandpackProvider's
//   component tree. If we called it in FullPlayground directly,
//   it would be OUTSIDE the provider and crash.
function CustomToolbar({ onToggleLines, showLineNumbers }) {
  // Each hook gives us a clean action + optional state
  const { handleReset } = useResetCode();
  const { handlePrettify } = usePrettifyCode();
  const { handleRefresh } = useRefreshPreview();
  const { handleCopy, copied } = useCopyCode();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.6rem 1rem",
        backgroundColor: COLORS.toolbarBg,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        border: `1px solid ${COLORS.border}`,
        borderBottom: "none",
      }}
    >
      {/* Left side: label */}
      <span
        style={{
          color: COLORS.textMuted,
          fontSize: "12px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ⚡️ INTERACTIVE PLAYGROUND
      </span>

      {/* Right side: action buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        {/* Run / Refresh preview */}
        <button
          onClick={handleRefresh}
          style={getActionButtonStyle(COLORS.pink)}
          title="Re-run the code"
        >
          ▶ Run
        </button>

        {/* Reset all files to original code */}
        <button
          onClick={handleReset}
          style={getActionButtonStyle(COLORS.yellow)}
          title="Reset to original code"
        >
          ↺ Reset
        </button>

        {/* Toggle line numbers (uses key-based remount) */}
        <button
          onClick={onToggleLines}
          style={getActionButtonStyle(COLORS.green)}
          title="Toggle line numbers"
        >
          {showLineNumbers ? "# Hide Lines" : "# Show Lines"}
        </button>

        {/* Prettify the active file */}
        <button
          onClick={handlePrettify}
          style={getActionButtonStyle(COLORS.tabActive)}
          title="Format code"
        >
          ✨ Prettify
        </button>

        {/* Copy code to clipboard */}
        <button
          onClick={handleCopy}
          style={getActionButtonStyle(copied ? COLORS.green : COLORS.tabActive)}
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
// The final form — toolbar with all custom buttons + tabbed preview.
// This is what you show at the END of the blog as the "complete" version.
//
// Features:
//   ▶ Run       → Refreshes the preview iframe
//   ↺ Reset     → Reverts all files to original code
//   # Lines     → Toggles line numbers (key-based remount)
//   ✨ Prettify → Formats the active file
//   📋 Copy     → Copies code to clipboard
//   Result/Console tabs with display:none pattern
//
// Props:
//   code       → string of React/JSX code
//   title      → filename label
//   showPreview → default to Result tab (true) or Console tab (false)
//   files      → optional object for multi-file support
//                 (overrides `code` prop if provided)
//
// Usage (single file):
//   <FullPlayground code={`function App() { ... }`} title="App.js" />
//
// Usage (multi-file):
//   <FullPlayground
//     files={{
//       "/App.js": `import Btn from './Button'; ...`,
//       "/Button.js": `export default function Button() { ... }`,
//     }}
//   />
export default function FullPlayground({
  code,
  title = "App.js",
  showPreview = true,
  files,
}) {
  const [activeTab, setActiveTab] = useState(
    showPreview ? "result" : "console",
  );

  // useToggleLineNumbers returns state + a key for editor remounting
  const { showLineNumbers, editorKey, toggleLineNumbers } =
    useToggleLineNumbers(true);

  // Determine which files to pass to Sandpack:
  // If `files` prop is provided (multi-file), use that.
  // Otherwise, create a single-file object from the `code` prop.
  const sandpackFiles = files || { "/App.js": code };

  // Show tabs only when there are multiple files
  const hasMultipleFiles = files && Object.keys(files).length > 1;

  return (
    <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
      <SandpackProvider
        template="react"
        theme={monokaiPro}
        files={sandpackFiles}
        options={{ autorun: true }}
      >
        {/* ── Custom Toolbar with all action buttons ──── */}
        <CustomToolbar
          onToggleLines={toggleLineNumbers}
          showLineNumbers={showLineNumbers}
        />

        {/* ── Main Layout ───────────────────────────────── */}
        <SandpackLayout
          style={{
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            backgroundColor: COLORS.editorBg,
          }}
        >
          {/* Left Panel: Code Editor */}
          {/*
            KEY PROP TRICK:
            editorKey changes every time the user toggles line numbers.
            React sees a new key → destroys old editor → creates new one.
            The new editor reads the current `showLineNumbers` value.

            This is necessary because SandpackCodeEditor's CodeMirror
            instance only reads showLineNumbers on mount, not on updates.
          */}
          <SandpackCodeEditor
            key={editorKey}
            showLineNumbers={showLineNumbers}
            showTabs={hasMultipleFiles} // Only show tabs if multi-file
            closableTabs={false}
            style={{ height: "450px", flex: 1 }}
          />

          {/* Right Panel: Tabbed Result/Console */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "450px",
              borderLeft: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.editorBg,
              overflow: "hidden",
            }}
          >
            {/* Tab Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                backgroundColor: COLORS.toolbarBg,
                borderBottom: `1px solid ${COLORS.border}`,
                gap: "4px",
              }}
            >
              <button
                onClick={() => setActiveTab("result")}
                style={getTabStyle(activeTab === "result")}
              >
                Result
              </button>
              <button
                onClick={() => setActiveTab("console")}
                style={getTabStyle(activeTab === "console")}
              >
                Console
              </button>
            </div>

            {/* Tab Content — display:none pattern */}
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

      {/* ── Global CSS overrides for Sandpack internals ── */}
      {/*
        Sandpack uses CSS-in-JS (Stitches) with high specificity.
        To override its internal styles, we need !important + broad selectors.
        This is the "ugly but necessary" part of customizing Sandpack.
      */}
      <style>{`
        /* Fix console white background issue */
        .sp-console,
        .sp-console * {
          background-color: ${COLORS.consoleBg} !important;
        }
        .sp-console [class*="console-row"] {
          background-color: transparent !important;
          border-bottom: 1px solid ${COLORS.border} !important;
          padding: 8px 12px !important;
        }

        /* Hide cluttered stack traces in console */
        .sp-console [class*="console-row"] div div:nth-child(n+2) {
          opacity: 0.5;
          font-size: 10px;
        }

        /* Style error boundary to look clean */
        .sp-error-boundary {
          padding: 2rem !important;
          background-color: #fee2e2 !important;
          color: #991b1b !important;
        }

        /* White preview background */
        .sp-preview-container {
          background-color: #ffffff !important;
        }

        /* Transparent preview actions bar */
        .sp-preview-actions {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
