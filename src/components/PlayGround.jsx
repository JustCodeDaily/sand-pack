// JSPlayground.jsx
// A React-powered interactive playground with Editor | Result/Console layout
// Uses Sandpack's React template so users can write JSX and see live preview

import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { monokaiPro } from "@codesandbox/sandpack-themes";

// ─── Custom Run Button ─────────────────────────────────────
// Lives inside SandpackProvider so it can access the sandpack context
// Triggers code re-execution on click
function RunButton() {
  const { sandpack } = useSandpack();

  return (
    <button
      onClick={() => sandpack.runSandpack()}
      style={{
        padding: "4px 14px",
        borderRadius: "6px",
        border: "1px solid #3e3b3f",
        backgroundColor: "#2d2a2e",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: "600",
        color: "#ff6188", // Monokai pink for the run action
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#3e3b3f";
        e.target.style.borderColor = "#ff6188";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#2d2a2e";
        e.target.style.borderColor = "#3e3b3f";
      }}
    >
      ▶ Run
    </button>
  );
}

// ─── Main Playground Component ─────────────────────────────
// Props:
//   code     → string of JSX/React code to pre-fill the editor
//   title    → optional tab/file name shown in the editor (default: "App.js")
//   showPreview → whether to default to Result tab (default: true)
export default function JSPlayground({
  code,
  title = "App.js",
  showPreview = true,
}) {
  // "result" = live preview tab, "console" = console.log output tab
  const [activeTab, setActiveTab] = useState(
    showPreview ? "result" : "console",
  );

  // ─── Theme Colors (Monokai Pro) ─────────────────────────
  const colors = {
    editorBg: "#2d2a2e",
    toolbarBg: "#221f22",
    border: "#3e3b3f",
    consoleBg: "#19181a",
    textMuted: "#72696a",
    green: "#a9dc76",
    pink: "#ff6188",
    yellow: "#ffd866",
    tabActive: "#ffffff",
    tabInactive: "#72696a",
  };

  // ─── Shared button style for the Result/Console tabs ────
  const tabStyle = (isActive) => ({
    padding: "6px 16px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: isActive ? "600" : "400",
    color: isActive ? colors.tabActive : colors.tabInactive,
    // Underline effect for the active tab
    borderBottom: isActive
      ? `2px solid ${colors.green}`
      : "2px solid transparent",
    transition: "all 0.2s",
  });

  return (
    <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
      <SandpackProvider
        // "react" template gives us JSX support + live preview
        // (your old "vanilla" template only ran plain JS)
        template="react"
        theme={monokaiPro}
        files={{
          // The key here becomes the filename shown in the editor tab
          "/App.js": code,
        }}
        options={{
          // autorun: true means preview updates as you type
          // Change to false + "manual" if you want run-button-only execution
          autorun: true,
        }}
      >
        {/* ─── Top Toolbar ─────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.6rem 1rem",
            backgroundColor: colors.toolbarBg,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            border: `1px solid ${colors.border}`,
            borderBottom: "none",
          }}
        >
          {/* Left side: playground label */}
          <span
            style={{
              color: colors.textMuted,
              fontSize: "12px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ⚡️ INTERACTIVE PLAYGROUND
          </span>

          {/* Right side: Run button */}
          <RunButton />
        </div>

        {/* ─── Main Layout: Editor (left) + Preview/Console (right) ── */}
        <SandpackLayout
          style={{
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            backgroundColor: colors.editorBg,
          }}
        >
          {/* ── Left Panel: Code Editor ────────────────────── */}
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            closableTabs={false}
            style={{
              height: "450px",
              flex: 1, // Takes up left half
            }}
          />

          {/* ── Right Panel: Tabbed Result/Console ─────────── */}
          <div
            style={{
              flex: 1, // Takes up right half
              display: "flex",
              flexDirection: "column",
              height: "450px",
              borderLeft: `1px solid ${colors.border}`,
              backgroundColor: colors.editorBg,
              overflow: "hidden", // Keep errors contained
            }}
          >
            {/* Tab Bar: Result | Console */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                backgroundColor: colors.toolbarBg,
                borderBottom: `1px solid ${colors.border}`,
                gap: "4px",
              }}
            >
              <button
                onClick={() => setActiveTab("result")}
                style={tabStyle(activeTab === "result")}
              >
                Result
              </button>
              <button
                onClick={() => setActiveTab("console")}
                style={tabStyle(activeTab === "console")}
              >
                Console
              </button>
            </div>

            {/* Tab Content: show one, hide the other */}
            {/* 
              Why not conditional rendering (&&)? 
              Because SandpackPreview/Console lose their state when unmounted.
              Using display:none keeps them mounted but hidden.
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
                style={{
                  height: "100%",
                  backgroundColor: "#ffffff", // White preview like the screenshot
                }}
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
                style={{
                  height: "100%",
                  backgroundColor: colors.consoleBg,
                }}
              />
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>

      {/* ─── Footer hint ──────────────────────────────────── */}
      <p
        style={{
          fontSize: "11px",
          color: "var(--ifm-color-emphasis-600)",
          marginTop: "10px",
          textAlign: "right",
          fontStyle: "italic",
        }}
      >
        Edit the code and see changes live.
      </p>

      {/* ─── Global CSS overrides for Sandpack internals ─── */}
      {/* Sandpack uses CSS-in-JS (stitches) with high specificity,
          so we need !important + broad selectors to override */}
      <style>{`
        /* Fix console white background issue */
        .sp-console,
        .sp-console * {
          background-color: ${colors.consoleBg} !important;
        }
        .sp-console [class*="console-row"] {
          background-color: transparent !important;
          border-bottom: 1px solid ${colors.border} !important;
          padding: 8px 12px !important;
        }

        /* Hide cluttered stack traces in console for 'neatness' */
        .sp-console [class*="console-row"] div div:nth-child(n+2) {
          opacity: 0.5;
          font-size: 10px;
        }

        /* Ensure Error Boundary looks like the 'neat' version */
        .sp-error-boundary {
          padding: 2rem !important;
          background-color: #fee2e2 !important;
          color: #991b1b !important;
        }

        /* Remove default Sandpack preview padding if needed */
        .sp-preview-container {
          background-color: #ffffff !important;
        }

        /* Make the refresh button blend with the dark theme */
        .sp-preview-actions {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}