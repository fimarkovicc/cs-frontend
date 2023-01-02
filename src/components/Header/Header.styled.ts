import styled from "styled-components"
import { colors, sizes, mixins } from "@global/styles"

export const HeaderStyled = styled.header`
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid ${colors.semiDarkGray};

    @media (max-width: ${sizes.tbBreakpoint}) {
        padding: 0 24px;
    }

    .logo {
        margin: 0;
        font-size: 22px;
        font-weight: 500;
    }

    .header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;

        @media (max-width: ${sizes.spBreakpoint}) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .header-nav {
        a {
            color: ${colors.blue};
            margin-left: 16px;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }

            @media (max-width: ${sizes.spBreakpoint}) {
                margin: 8px 0;
            }
        }

        @media (max-width: ${sizes.spBreakpoint}) {
            display: flex;
            flex-direction: column;
            margin-top: 18px;
        }
    }

    .menu-btn {
        display: none;
        ${mixins.componentBorderRadius};
        border: 1px solid ${colors.darkGray};
        width: 32px;
        height: 32px;
        position: absolute;
        top: 14px;
        right: 24px;

        @media (max-width: ${sizes.spBreakpoint}) {
            display: block;
        }
    }
`