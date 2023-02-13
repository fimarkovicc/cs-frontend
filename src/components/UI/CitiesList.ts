import { colors, mixins, sizes } from "@global/styles"
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

        @media (max-width: ${sizes.spBreakpoint}) {
            padding: 8px;
        }

        li {
            background: #fff;
            display: flex;
            ${mixins.componentBorderRadius};
            border: 1px solid transparent;

            @media (max-width: ${sizes.spBreakpoint}) {
                font-size: 12px;
            }

            &:hover {
                border: 1px solid ${colors.blue};
            }

            a {
                color: ${colors.blue};
                padding: 10px;

                @media (max-width: ${sizes.spBreakpoint}) {
                    padding: 6px;
                }
            }
        }
    }
`