import React from 'react';

export const H1 = ({ children, ...props }) => (
  <h1
    style={{
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: 'var(--text-h)',
      marginTop: '2rem',
      marginBottom: '1rem',
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
      fontSize: '1.875rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: 'var(--text-h)',
      marginTop: '2rem',
      marginBottom: '0.75rem',
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
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: 'var(--text-h)',
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
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
      fontSize: '1.125rem',
      lineHeight: 1.75,
      color: 'var(--text)',
      marginBottom: '1.5rem',
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
      backgroundColor: 'var(--code-bg)',
      padding: '0.2em 0.4em',
      borderRadius: '4px',
      fontSize: '0.875em',
      fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
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
      color: 'var(--text-h)',
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
      listStyleType: 'disc',
      paddingLeft: '1.5rem',
      marginBottom: '1.5rem',
      color: 'var(--text)',
      textAlign: 'left',
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
      marginBottom: '0.5rem',
      lineHeight: 1.6,
      ...props.style,
    }}
    {...props}
  >
    {children}
  </li>
);
