import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100vh;
        }

        body {
          font-family: ${theme.typography.body1.fontFamily};
          color: ${theme.colors.text.primary};
          background-color: ${theme.colors.palette.white};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
        }

        ul,
        ol {
          list-style: none;
        }
      `}
    />
  );
}