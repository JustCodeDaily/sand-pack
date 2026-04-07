import React from "react";

export const H1 = ({ children, ...props }) => (
  <h1
    style={{
      fontSize: "2.5rem",
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: "var(--text-h)",
      marginTop: "2rem",
      marginBottom: "1rem",
      lineHeight: 1.2,
      ...props.style,
    }}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, ...props }) => (
  <h2
    style={{
      fontSize: "1.875rem",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      color: "var(--text-h)",
      marginTop: "2.5rem",
      marginBottom: "0.75rem",
      lineHeight: 1.3,
      ...props.style,
    }}
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({ children, ...props }) => (
  <h3
    style={{
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      color: "var(--text-h)",
      marginTop: "1.5rem",
      marginBottom: "0.5rem",
      ...props.style,
    }}
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, ...props }) => (
  <p
    style={{
      fontSize: "1.125rem",
      lineHeight: 1.75,
      color: "var(--text)",
      marginBottom: "1.5rem",
      ...props.style,
    }}
    {...props}
  >
    {children}
  </p>
);

export const Code = ({ children, ...props }) => (
  <code
    style={{
      backgroundColor: "var(--code-bg)",
      padding: "0.2em 0.4em",
      borderRadius: "4px",
      fontSize: "0.875em",
      fontFamily:
        'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
      ...props.style,
    }}
    {...props}
  >
    {children}
  </code>
);

export const Strong = ({ children, ...props }) => (
  <strong
    style={{
      fontWeight: 700,
      color: "var(--text-h)",
      ...props.style,
    }}
    {...props}
  >
    {children}
  </strong>
);

export const List = ({ children, ...props }) => (
  <ul
    style={{
      listStyleType: "disc",
      paddingLeft: "1.5rem",
      marginBottom: "1.5rem",
      color: "var(--text)",
      textAlign: "left",
      ...props.style,
    }}
    {...props}
  >
    {children}
  </ul>
);

export const ListItem = ({ children, ...props }) => (
  <li
    style={{
      marginBottom: "0.5rem",
      lineHeight: 1.6,
      ...props.style,
    }}
    {...props}
  >
    {children}
  </li>
);

export const CodeScreenshot = ({ children, title = "App.js", ...props }) => (
  <div
    style={{
      marginBottom: "2rem",
      marginTop: "1rem",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #3e3b3f",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      ...props.style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        backgroundColor: "#221f22",
        borderBottom: "1px solid #3e3b3f",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#ff5f57",
          }}
        />
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#ffbd2e",
          }}
        />
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#28c840",
          }}
        />
      </div>
      <span
        style={{
          color: "#72696a",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {title}
      </span>

      <span
        style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#72696a",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Read Only
      </span>
    </div>

    <pre
      style={{
        margin: 0,
        padding: "1.5rem",
        backgroundColor: "#2d2a2e",
        color: "#f8f8f2", // Light text on dark bg
        fontSize: "14px",
        lineHeight: 1.6,
        fontFamily:
          'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
        overflowX: "auto",
      }}
    >
      <code>{children}</code>
    </pre>
  </div>
);
export const Callout = ({ children, type = "info", title, ...props }) => {
  // Define colors for each callout type
  const palette = {
    info: { bg: "#1e293b", border: "#3b82f6", icon: "💡" },
    warning: { bg: "#2d1f0e", border: "#f59e0b", icon: "⚠️" },
    tip: { bg: "#0f2922", border: "#10b981", icon: "✨" },
  };

  const colors = palette[type] || palette.info;

  return (
    <div
      style={{
        padding: "1.25rem 1.5rem",
        marginBottom: "2rem",
        borderRadius: "8px",
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
        ...props.style,
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            marginBottom: "0.5rem",
            color: colors.border,
          }}
        >
          {colors.icon} {title}
        </div>
      )}

      <div style={{ fontSize: "1rem", lineHeight: 1.6, color: "#d1d5db" }}>
        {children}
      </div>
    </div>
  );
};
