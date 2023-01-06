import styled from "styled-components"
import { colors, mixins, sizes } from "@global/styles"

export const ContentMainBannerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 78px 0;

    @media (max-width: ${sizes.spBreakpoint}) {
        padding: 36px 0;
    }

    h1 {
        font-size: 64px;
        margin: 0;
        max-width: 640px;

        @media (max-width: ${sizes.spBreakpoint}) {
            font-size: 9vw;
        }
    }

    p {
        font-size: 28px;
        margin-bottom: 34px;
        color: ${colors.lightGray};

        @media (max-width: ${sizes.spBreakpoint}) {
            font-size: 5vw;
        }
    }
`