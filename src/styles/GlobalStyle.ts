import { createGlobalStyle } from 'styled-components'
import fromTheme from 'utils/fromTheme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background-color: ${fromTheme('primary')};
    color: ${fromTheme('tertiary')}
  }

  a {
    color: ${fromTheme('primary')};
    text-decoration: none;

    &:hover {
      color: #408cff;
    }
  }

  ul {
    list-style: none;
  }

  button {
    font-size: 1.6rem;
    cursor: pointer;
  }
`
