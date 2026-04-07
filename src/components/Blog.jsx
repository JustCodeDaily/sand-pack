// ─────────────────────────────────────────────────────────
// Blog.jsx
// The actual blog post content.
//
// STRUCTURE (inspired by Josh Comeau's progressive approach):
//   1. Hook the reader: Why code playgrounds matter
//   2. Show a static CodeScreenshot (read-only) — "here's what we're building"
//   3. Phase 1: BasicPlayground — minimal Sandpack
//   4. Phase 2: TabbedPlayground — add Console
//   5. Phase 3: FullPlayground — custom buttons, the works
//   6. Wrap up with "what's next"
//
// Each phase has its OWN live playground so the reader
// is literally playing with the playground that teaches them
// to build a playground. Very meta. Very JustCodeDaily.
// ─────────────────────────────────────────────────────────

import React from "react";
import {
  H1,
  H2,
  H3,
  P,
  Code,
  Strong,
  List,
  ListItem,
  CodeScreenshot,
  Callout,
} from "./Typography";

// Import all three playground levels
import { BasicPlayground, TabbedPlayground } from "./PlayGround";
import FullPlayground from "./PlayGround"; // default export = FullPlayground

const Blog = () => {
  return (
    <article
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "left",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* ═══════════════════════════════════════════════════ */}
      {/* HEADER                                             */}
      {/* ═══════════════════════════════════════════════════ */}
      <header style={{ marginBottom: "4rem" }}>
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}
        >
          The Architecture of Play: Building a Custom IDE with Sandpack
        </div>
        <H2 style={{ fontSize: "3.25rem", marginBottom: "1.5rem" }}>
          Build, Break, Learn: Creating Your Own Code Playground{" "}
        </H2>
        <P
          style={{ fontSize: "1.25rem", opacity: 0.8, marginBottom: "1.5rem" }}
        >
          From zero to a fully custom IDE — one layer at a time.
        </P>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "var(--text)",
            opacity: 0.7,
            fontSize: "1rem",
          }}
        >
          <span>10 min read</span>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════ */}
      {/* INTRO: WHY PLAYGROUNDS MATTER                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <P>
        Reading code is like reading sheet music; you can see the notes, but you
        miss the music. A live playground lets your readers{" "}
        <Strong>hear it</Strong>. It transforms a passive tutorial into an
        active laboratory.
      </P>

      <P>
        After the success of <Code>useBattery</Code> and <Code>useEggs</Code>, I
        wanted to peel back the curtain on the tool that makes those demos
        possible: <Strong>Sandpack</Strong>, the open-source in-browser bundler
        from CodeSandbox.{" "}
        <i>
          And again, devliated from my Portfolio, since I have this guy in mine
          :D
        </i>
      </P>

      <P>
        In this post, we'll build a code playground from scratch, layer by
        layer. By the end, you'll have a fully custom editor with a run button,
        reset, prettify, line number toggle, and a console — all inside your
        blog.
      </P>

      <Callout type="info" title="What is Sandpack?">
        Sandpack is the actual in-browser bundler that powers CodeSandbox. It
        can fetch NPM dependencies, transpile JSX, and even supports hot module
        reloading — all without a backend. The{" "}
        <Code>@codesandbox/sandpack-react</Code> package gives us composable
        React components and hooks to build custom playgrounds. <br />
        P.S Sandpack is the actual bundler used by CodeSandbox.
      </Callout>

      {/* ═══════════════════════════════════════════════════ */}
      {/* THE SCREENSHOT STAGE                                */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>First, Let's See What We're Building</H2>
      <P>
        Before we touch any Sandpack code, here's a static preview. This is
        read-only — just a screenshot of what our final playground looks like.
        Think of it as the album cover before you press play.
      </P>

      {/* Static code screenshot — not editable, just visual context */}
      <CodeScreenshot title="App.js">
        {`import { Sandpack } from "@codesandbox/sandpack-react";

<Sandpack template="react" />`}
      </CodeScreenshot>

      <P>
        Two lines of code. That's all it takes to get a working playground. But
        we're not stopping there — we're going to build something{" "}
        <Strong>custom</Strong>.
      </P>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PHASE 1: BASIC PLAYGROUND                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>Phase 1: The Bare Minimum</H2>
      <P>Install Sandpack and its themes package:</P>

      <CodeScreenshot title="Terminal">
        {`npm install @codesandbox/sandpack-react @codesandbox/sandpack-themes`}
      </CodeScreenshot>

      <P>
        Now let's render the simplest possible playground — a{" "}
        <Code>SandpackProvider</Code> wrapping a <Code>SandpackCodeEditor</Code>{" "}
        and a <Code>SandpackPreview</Code>. That's it. No tabs, no buttons, no
        extras.
      </P>

      {/* LIVE: BasicPlayground — reader can type and see output */}
      <BasicPlayground
        code={`export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello, Sandpack!</h1>
      <p>Try editing this text. It updates live.</p>
    </div>
  );
}`}
      />

      <Callout type="tip" title="Why SandpackProvider + SandpackLayout?">
        <Code>SandpackProvider</Code> is the brain — it manages code state,
        bundling, and communication. <Code>SandpackLayout</Code> is the body —
        it handles the side-by-side flex layout. Every Sandpack component you
        place inside the provider can read from and write to the same shared
        state via React Context.
      </Callout>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PHASE 2: TABBED PLAYGROUND (+ CONSOLE)             */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>Phase 2: Adding the Console</H2>
      <P>
        What good is a playground if you can't see your <Code>console.log</Code>
        ? Let's add a Console tab. This is where it gets interesting — and where
        we learn an important React pattern.
      </P>

      <H3>The display:none Trick</H3>
      <P>Your first instinct might be to conditionally render the tabs:</P>

      <CodeScreenshot title="Don't do this!">
        {`{activeTab === "result" && <SandpackPreview />}
{activeTab === "console" && <SandpackConsole />}`}
      </CodeScreenshot>

      <P>
        This <Strong>looks clean</Strong> but it's a trap.{" "}
        <Code>SandpackPreview</Code> and <Code>SandpackConsole</Code> maintain
        internal state — scroll position, console history, iframe state. When
        you unmount them with <Code>&&</Code>, that state is destroyed. When you
        mount them again, they re-initialize from scratch.
      </P>

      <P>
        Instead, render <Strong>both</Strong> and use <Code>display: none</Code>{" "}
        to hide the inactive one:
      </P>

      <CodeScreenshot title="Do this instead!">
        {`<div style={{ display: activeTab === "result" ? "block" : "none" }}>
  <SandpackPreview />
</div>
<div style={{ display: activeTab === "console" ? "block" : "none" }}>
  <SandpackConsole />
</div>`}
      </CodeScreenshot>

      <P>
        Now try it — type <Code>console.log("hello")</Code> in the editor below,
        then switch to the Console tab:
      </P>

      {/* LIVE: TabbedPlayground — reader can switch between Result/Console */}
      <TabbedPlayground
        code={`export default function App() {
  // Try adding console.log() calls here
  // then switch to the Console tab to see the output!
  console.log("Phase 2 is alive!");
  console.log("The console tab works!");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Check the Console tab →</h1>
      <p>Open the Console tab to see your logs.</p>
    </div>
  );
}`}
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* PHASE 3: FULL CUSTOM PLAYGROUND                    */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>Phase 3: Make It Yours</H2>
      <P>
        This is where the real fun begins. Sandpack exposes two powerful hooks —{" "}
        <Code>useSandpack()</Code> and <Code>useActiveCode()</Code> — that give
        you full programmatic control over the sandbox.
      </P>

      <List>
        <ListItem>
          <Strong>useSandpack()</Strong> — Access the entire sandbox state:
          files, active file, and methods like <Code>resetAllFiles()</Code> and{" "}
          <Code>runSandpack()</Code>.
        </ListItem>
        <ListItem>
          <Strong>useActiveCode()</Strong> — Get the current file's code as a
          string + an <Code>updateCode()</Code> function to replace it.
        </ListItem>
        <ListItem>
          <Strong>useSandpackNavigation()</Strong> — A <Code>refresh()</Code>{" "}
          function that reloads the preview iframe.
        </ListItem>
      </List>

      <P>With these hooks, we build custom action buttons:</P>

      <H3>Custom Hooks We Built</H3>

      <List>
        <ListItem>
          <Code>useResetCode()</Code> — Calls{" "}
          <Code>sandpack.resetAllFiles()</Code> to revert every file to its
          original code.
        </ListItem>
        <ListItem>
          <Code>usePrettifyCode()</Code> — Reads the active file via{" "}
          <Code>useActiveCode()</Code>, trims whitespace and collapses blank
          lines, then pushes it back via <Code>updateCode()</Code>.
        </ListItem>
        <ListItem>
          <Code>useToggleLineNumbers()</Code> — Since{" "}
          <Code>showLineNumbers</Code> isn't reactive after mount, we use a{" "}
          <Code>key</Code> prop trick to force the editor to remount with the
          new value.
        </ListItem>
        <ListItem>
          <Code>useCopyCode()</Code> — Uses the Clipboard API with a 2-second
          "Copied!" feedback state.
        </ListItem>
      </List>

      <Callout type="warning" title="The key Prop Trick">
        <Code>SandpackCodeEditor</Code> reads <Code>showLineNumbers</Code> only
        on mount — its internal CodeMirror instance doesn't re-read props. To
        toggle line numbers dynamically, we change the editor's <Code>key</Code>{" "}
        prop. React sees a new key, destroys the old editor, and creates a fresh
        one that reads the updated value. It's a common pattern for "resetting"
        components.
      </Callout>

      <P>
        Here's the complete playground with all custom buttons. Try them out:
      </P>

      {/* LIVE: FullPlayground — the final form with all buttons */}
      <FullPlayground
        code={`export default function App() {
  const features = [
    "▶ Run — refreshes the preview",
    "↺ Reset — reverts to original code",
    "# Lines — toggles line numbers",
    "✨ Prettify — formats the code",
    "📋 Copy — copies to clipboard",
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>The Full Playground</h1>
      <p>Try the buttons in the toolbar above!</p>
      <ul>
        {features.map((f, i) => (
          <li key={i} style={{ margin: "0.5rem 0" }}>{f}</li>
        ))}
      </ul>
    </div>
  );
}`}
        title="App.js"
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* BONUS: MULTI-FILE EXAMPLE                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>Bonus: Multi-File Playgrounds</H2>
      <P>
        Pass a <Code>files</Code> prop instead of <Code>code</Code>, and
        Sandpack automatically creates tabs for each file:
      </P>

      <FullPlayground
        files={{
          "/App.js": `import Greeting from "./Greeting";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <Greeting name="Sandpack" />
      <Greeting name="JustCodeDaily" />
    </div>
  );
}`,
          "/Greeting.js": `export default function Greeting({ name }) {
  return (
    <h2 style={{ color: "#ff6188" }}>
      Hello, {name}!
    </h2>
  );
}`,
        }}
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* WRAP UP                                             */}
      {/* ═══════════════════════════════════════════════════ */}
      <H2>What's Next?</H2>
      <P>
        We went from a two-line Sandpack to a fully custom playground with five
        action buttons and multi-file support. Here are some ideas to take it
        further:
      </P>

      <List>
        <ListItem>
          <Strong>localStorage persistence</Strong> — Save code changes so
          readers don't lose their work on refresh.
        </ListItem>
        <ListItem>
          <Strong>Real Prettier integration</Strong> — Import{" "}
          <Code>prettier/standalone</Code> for proper formatting (adds ~200KB).
        </ListItem>
        <ListItem>
          <Strong>Fullscreen mode</Strong> — Let the editor fill the screen for
          complex examples.
        </ListItem>
        <ListItem>
          <Strong>Theme switcher</Strong> — Let readers toggle between Monokai
          Pro, Night Owl, Dracula, etc.
        </ListItem>
      </List>

      <P>
        Sandpack's composable architecture means you can keep building forever.
      </P>

      {/* ═══════════════════════════════════════════════════ */}
      {/* FOOTER                                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <footer
        style={{
          marginTop: "5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      ></footer>
    </article>
  );
};

export default Blog;
