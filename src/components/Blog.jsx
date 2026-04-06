import React from "react";
import { H1, H2, H3, P, Code, Strong, List, ListItem } from "./Typography";
import PlayGround from "./PlayGround";

const Blog = () => {
  return (
    <article
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "left",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
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
          React & Performance
        </div>
        <H1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
          Real-time Interaction
        </H1>
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
          <span>Harish Krishnan</span>
          <span>•</span>
          <span>April 6, 2026</span>
        </div>
      </header>

      <P>
        Building interactive tools within a blog post can be a game-changer for
        educational content. Instead of just showing code snippets, we can
        provide a <Strong>live playground</Strong> where readers can experiment
        with the concepts in real-time.
      </P>

      <H2>The Power of Interactivity</H2>
      <P>
        When teaching complex React concepts like <Code>useMemo</Code> or{" "}
        <Code>useCallback</Code>, a static explanation often falls short. By
        integrating a playground directly into the flow of the article, we allow
        the reader to bridge the gap between theory and practice immediately.
      </P>

      <PlayGround
        code={`
          function App() {
  return (
    <>
      <h1>
        Hello World
      </h1>
      <p>
        You can play with me here!
      </p>
    </>
  );
}

export default App;
          `}
        title="HelloWorld.js"
      />

      <H3>Why this matters</H3>
      <P>
        Notice how the playground above updates instantly. This uses a custom
        implementation of <Code>@codesandbox/sandpack-react</Code> to provide a
        seamless editing experience. Here are a few reasons why this approach is
        superior:
      </P>

      <List>
        <ListItem>
          <Strong>Zero Friction:</Strong> Readers don't need to leave your site
          to try the code.
        </ListItem>
        <ListItem>
          <Strong>Contextual Learning:</Strong> The code is right next to the
          explanation.
        </ListItem>
        <ListItem>
          <Strong>Safe Environment:</Strong> It's a sandbox, so they can't break
          anything permanent.
        </ListItem>
      </List>

      <P>
        In the next section, we'll dive deeper into how to optimize these
        sandboxes for performance, ensuring that multiple playgrounds don't slow
        down the page load.
      </P>

      <footer
        style={{
          marginTop: "5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <P style={{ fontSize: "0.9rem", opacity: 0.6 }}>
          Thanks for reading! If you enjoyed this, feel free to share it or
          subscribe to the newsletter for more React deep dives.
        </P>
      </footer>
    </article>
  );
};

export default Blog;
export { H1, H2, H3, P, Code, Strong, List, ListItem };
