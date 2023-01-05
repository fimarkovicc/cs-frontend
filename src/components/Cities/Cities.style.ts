import styled from "styled-components"
import { mixins, colors } from "@global/styles"

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

        &:hover {
            cursor: pointer;
        }
    }
`