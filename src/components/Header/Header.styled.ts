import styled, { css } from "styled-components"
import { colors, sizes, mixins } from "@global/styles"

type Props = {
    isHomePage: boolean;
}

export const HeaderStyled = styled.header<Props>`
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

    .header-nav {
        display: flex;
        align-items: flex-start;

        a {
            color: ${colors.blue};
            margin-left: 16px;
            font-weight: 400;

            &:hover {
                text-decoration: underline;
            }

            @media (max-width: ${sizes.spBreakpoint}) {
                margin: 8px 0;
            }
        }

        @media (max-width: ${sizes.spBreakpoint}) {
            display: none;
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
    select {
        ${props => !props.isHomePage &&
        css `
            background-color: #fff;
            color: ${colors.blue};
            border-color: ${colors.blue};
        `}
    }
`