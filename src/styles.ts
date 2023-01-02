import { createGlobalStyle, css } from "styled-components"

export const colors = {
    darkGray: "#212529",
    semiDarkGray: "#dee2e6",
    lightGray: "#c757d",
    veryLightGray: "#f8f9fa",
    blue: "#007bff"

}

export const sizes = {
    spBreakpoint: "768px",
    tbBreakpoint: "1024px",
    dtBreakpoint: "1280px"
}

export const mixins = {
    componentBorderRadius: css`
        border-radius: 8px;
    `,

    componentBorderRadiusSmall: css`
        border-radius: 5px;
    `
}

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
        background-color: ${colors.veryLightGray};
    }

    a {
        text-decoration: none;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 0 24px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
`