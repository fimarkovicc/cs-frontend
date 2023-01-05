import { colors, mixins } from "@global/styles"
import styled from "styled-components"

export const MortgageFaqStyled = styled.div`
    ${mixins.componentMargin};

    ul {
        ${mixins.componentBorderRadius};
        background: ${colors.semiDarkGray};
        padding: 16px;

        li {
            ${mixins.componentBorderRadius};
            background-color: #fff;
            padding: 0 16px;
            margin-bottom: 12px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`