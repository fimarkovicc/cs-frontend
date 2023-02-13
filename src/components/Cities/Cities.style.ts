import styled from "styled-components"
import { mixins, colors, sizes } from "@global/styles"

export const CitiesStyled = styled.div`
    ${mixins.componentMargin};

    span {
        font-size: 20px;
        margin-bottom: 12px;
        display: block;
        font-weight: 500;
    }

    a {
        color: ${colors.blue};
        font-size: 16px;

        @media (max-width: ${sizes.spBreakpoint}) {
            font-size: 14px;
        }
    }

    h3 {
        margin: 0 0 10px 0;
    }

    .city-container {
        margin-bottom: 22px;
        padding-right: 12px;
    }

    .wrapper {
        height: 1000px;
        overflow: hidden;

        &.open {
            height: auto;
            overflow: inherit;
        }
    }

    .show-more {
        text-align: center;
        border-top: 1px solid ${colors.darkGray};
        height: 24px;

        &:hover {
            cursor: pointer;
        }

        &:before {
            content: "";
            height: 24px;
            content: "";
            background-image: url(/images/Arrow-down.svg);
            width: 24px;
            position: absolute;
            background-position: center center;
            background-size: 24px;
            background-repeat: no-repeat;
        }

        &.open {
            &:before {
                transform: rotate(180deg);
            }
        }
    }
`