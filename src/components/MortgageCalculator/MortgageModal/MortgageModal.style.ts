import styled from "styled-components"
import { sizes } from "@global/styles"

export const MortgageModalStyled = styled.div`
    width: 37.5%;

    @media (max-width: ${sizes.spBreakpoint}) {
        width: 100%;
    }

    .text {
        margin-left: 20%;

        @media (max-width: ${sizes.spBreakpoint}) {
            margin-left: 0;
        }

        li {
            margin-bottom: 6px;
        }
    }
`