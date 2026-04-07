# Build, Break, Learn: Custom Code Playground with Sandpack

A blog post that teaches you to build a custom code playground — using the playground itself.

🔗 **Live:** [sand-pack.vercel.app](https://sand-pack.vercel.app/)

## What is this?

An interactive blog post that progressively builds a fully custom IDE using [Sandpack](https://sandpack.codesandbox.io/) — the same in-browser bundler that powers CodeSandbox.

Each phase has its own live playground, so you're literally playing with the thing you're learning to build.

## The Three Phases

**Phase 1: The Bare Minimum**
A `SandpackProvider` wrapping a `SandpackCodeEditor` and `SandpackPreview`. Editor on the left, live output on the right. That's it.

**Phase 2: Adding the Console**
Introduces a Result/Console tab switcher. Teaches the `display:none` pattern over conditional rendering to preserve component state (scroll position, console history, iframe state).

**Phase 3: Make It Yours**
Full custom toolbar powered by 5 custom hooks:

| Hook | What it does |
|---|---|
| `useResetCode()` | Reverts all files to original state via `sandpack.resetAllFiles()` |
| `usePrettifyCode()` | Formats active file using Prettier standalone |
| `useToggleLineNumbers()` | Toggles line numbers via the React `key` prop remount trick |
| `useRefreshPreview()` | Reloads the preview iframe via `useSandpackNavigation()` |
| `useCopyCode()` | Copies active file to clipboard with 2s feedback state |

**Bonus:** Multi-file playground support — pass a `files` object and Sandpack auto-generates tabs.

## Tech Stack

- **React 18** + **Vite**
- **@codesandbox/sandpack-react** — composable playground components + hooks
- **@codesandbox/sandpack-themes** — Monokai Pro theme
- **prettier/standalone** — real code formatting (not string.trim())
- **prism-react-renderer** — syntax highlighting for static code screenshots
- **Vercel** — deployment

## Project Structure

```
src/
├── App.jsx                    # Root — renders Blog
├── App.css                    # Layout styles
├── index.css                  # CSS variables, light/dark theme
├── components/
│   ├── Blog.jsx               # The blog post content (progressive phases)
│   ├── PlayGround.jsx         # BasicPlayground, TabbedPlayground, FullPlayground
│   ├── PlayGround.css         # Extracted playground styles
│   └── Typography.jsx         # H1, H2, H3, P, Code, Callout, CodeScreenshot
└── hooks/
    └── useSandpackActions.js  # 5 custom hooks for toolbar actions
```

## Run Locally

```bash
git clone https://github.com/<your-username>/sand-pack.git
cd sand-pack
npm install
npm run dev
```

## Key Patterns Worth Stealing

**The `display:none` trick** — Render both `SandpackPreview` and `SandpackConsole`, hide the inactive one with `display: none`. Conditional rendering (`&&`) destroys internal state on every tab switch.

**The `key` prop remount** — `SandpackCodeEditor` reads `showLineNumbers` only on mount. Changing the `key` prop forces React to destroy and recreate the editor with the updated value.

**Hooks inside Provider** — All custom hooks use `useSandpack()` internally, so they must be called inside `<SandpackProvider>`. That's why `CustomToolbar` is a separate component rendered inside the provider tree.

## Part of JustCodeDaily

This is part of the [JustCodeDaily](https://linkedin.com/in/harish-krish/) series — building, breaking, and learning React one concept at a time.

Previous posts: `useBattery` · `useEggs`

---

Built by [Harish Krishnan](https://linkedin.com/in/harish-krish/) · April 2026
