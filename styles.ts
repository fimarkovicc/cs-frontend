import { createGlobalStyle } from "styled-components"

export const colors = {
    lightGray: '#c0c2d3'
}

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    }

    header {
    min-height: 50px;
    }
    footer {
    min-height: 50px;
    margin-top: auto;
    }

    .container {
    /*max-width: 1200px;*/
    margin:0;
    }
`