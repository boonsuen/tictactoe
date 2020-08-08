import { createGlobalStyle } from 'styled-components';

import './global.css';

import GilroyLightWoff2 from '../assets/fonts/Gilroy-Light.woff2';
import GilroyLightWoff from '../assets/fonts/Gilroy-Light.woff';

import GilroyExtraBoldWoff2 from '../assets/fonts/Gilroy-ExtraBold.woff2';
import GilroyExtraBoldWoff from '../assets/fonts/Gilroy-ExtraBold.woff';

// Why are the @font-face rules extracted to be used on its own? 
// GlobalStyle causes custom fonts to be re-requested when
// it get rerendered, or some other possible behaviors like
// rehyration, component state change.
// This will cause font loading problems like FOIT and FOUT. Bad bad.
export const fontFaceRules = `
  @font-face {
    font-family: "Gilroy";
    src: url(${GilroyLightWoff2}) format('woff2'),
         url(${GilroyLightWoff}) format('woff');
    font-weight: 300;
  }

  @font-face {
    font-family: "Gilroy";
    src: url(${GilroyExtraBoldWoff2}) format('woff2'),
         url(${GilroyExtraBoldWoff}) format('woff');
    font-weight: 800;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Gilroy", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  
  a {
    text-decoration: none;
  }

  button {
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .container {
    max-width: 90%;
    width: 800px;
    margin: auto;
  }
`;

export default GlobalStyle;