import { colors, mixins } from "@global/styles"
import styled from "styled-components"

export const CitiesStyled = styled.div`
    ${mixins.componentMargin};

    ul {
        background: ${colors.semiDarkGray};
        padding: 16px;
        ${mixins.componentBorderRadius};
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
            background: #fff;
            padding: 16px;
            ${mixins.componentBorderRadius};
            border: 1px solid transparent;

            &:hover {
                border: 1px solid ${colors.blue};
            }

            a {
                color: ${colors.blue};
            }
        }
    }
`