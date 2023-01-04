import { createGlobalStyle, css } from "styled-components"

export const colors = {
    darkGray: "#212529",
    semiDarkGray: "#dee2e6",
    veryLightGray: "#f8f9fa",
    lightGray: "#858585",
    semiLightGray: "#dee2e6",
    blue: "#007bff",
    green: "rgb(40, 167, 69)",
    yellow: "rgb(255, 193, 7)",
    red: "rgb(220, 53, 69)",
    brightYellow: "#fff7dd"

}

export const sizes = {
    spBreakpoint: "768px",
    tbBreakpoint: "1024px",
    dtBreakpoint: "1280px",
    marginBetweenComponentsDt: "60px",
    marginBetweenComponentsSp: "30px",
}

export const mixins = {
    componentBorderRadiusLarge: css`
        border-radius: 20px;
    `,
    componentBorderRadius: css`
        border-radius: 8px;
    `,
    componentBorderRadiusSmall: css`
        border-radius: 5px;
    `,
    componentMargin: css`
        margin-bottom: ${sizes.marginBetweenComponentsDt};

        @media (max-width: ${sizes.spBreakpoint}) {
            margin-bottom: ${sizes.marginBetweenComponentsSp};
        }
    `,
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

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
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

    h2 {
        font-size: 24px;
    }

    .component-container-2 {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 60px;

        @media(max-width: ${sizes.spBreakpoint}) {
            flex-direction: column;
            gap: 0;
            overflow: hidden;
        }

        div {
            flex: 1;

            @media(max-width: ${sizes.spBreakpoint}) {
                
            }
        }
    }
`