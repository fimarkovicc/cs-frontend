import styled, { css } from "styled-components"
import { colors, sizes, mixins } from "@global/styles"

type Props = {
    isMenuOpen: boolean;
}

export const HeaderStyled = styled.header<any>`
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid ${colors.semiDarkGray};

    @media (max-width: ${sizes.tbBreakpoint}) {
        padding: 0 24px;
    }

    .logo {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
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

    .header-mobile-nav {
        display: none;
        align-items: flex-start;
        flex-direction: column;
        margin-top: 18px;

        @media (max-width: ${sizes.spBreakpoint}) {
            ${props => props.isMenuOpen ? "display: flex" : "display: none"};
        }

        a {
            color: ${colors.blue};
            margin-left: 16px;
            font-weight: 400;
            margin: 8px 0;

            &:hover {
                text-decoration: underline;
            }

            &:last-of-type {
                margin-bottom: 18px;
            }
        }
    }

    .header-desktop-nav {
        @media (max-width: ${sizes.spBreakpoint}) {
            display: none;
        }

        a {
            color: ${colors.blue};
            margin-left: 16px;
            font-weight: 400;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        span {
            display: block;
            height: 2px;
            width: 20px;
            margin: 3px 0;
            background-color: ${colors.darkGray};
        }

        &.open {
            span:first-child {
                transform: translate(0, 5px) rotate(-45deg);
            }
            span:nth-child(2) {
                display: none;
            }
            span:nth-child(3) {
                transform: translate(0, -3px) rotate(45deg);
            }
        }
    }
`