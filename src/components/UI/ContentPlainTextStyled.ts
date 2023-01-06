import styled from "styled-components"
import { colors, mixins } from "@global/styles"

export const ContentPlainTextStyled = styled.div`
    ${mixins.componentBorderRadius};
    ${mixins.componentMargin};
    background-color: ${colors.brightYellow};
    padding: 16px;

    h2 {
        margin-top: 0;
    }

    em {
        color: ${colors.blue};
        font-style: normal;
    }
`