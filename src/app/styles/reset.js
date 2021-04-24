import { css } from 'styled-components';

export const ResetStyles = css`
  // resets adapted from https://piccalil.li/blog/a-modern-css-reset
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, p, li, figure, figcaption, blockquote, dl, dd {
    margin: 0;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration-skip-ink: auto;
  }

  img {
    max-width: 100%;
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  html, body, input, button, textarea, select, option, 
  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Roboto', sans-serif;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-normal);
  }
`;
