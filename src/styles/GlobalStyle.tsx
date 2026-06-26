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

        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100vh;
        }

        html {
          overflow-y: scroll;
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

        button,
        input,
        select,
        textarea {
          all: unset;
          appearance: none;
          -webkit-appearance: none;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-sizing: border-box;
          font: inherit;
          color: inherit;
        }

        button {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }

        input::placeholder,
        textarea::placeholder {
          opacity: 1;
        }

        button:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible,
        a:focus-visible {
          outline: 2px solid ${theme.colors.palette.primary};
          outline-offset: 3px;
        }

        img {
          display: block;
          max-width: 100%;
        }

        ul,
        ol {
          list-style: none;
        }
      `}
    />
  );
}
