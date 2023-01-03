import styled from "styled-components"
import { colors, mixins } from "@global/styles"

export const ContentMainBannerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 78px 0;

    h1 {
        font-size: 64px;
        margin: 0;
        max-width: 640px;
    }

    p {
        font-size: 28px;
        margin-bottom: 34px;
        color: ${colors.lightGray};
    }

    select {
        padding: 14px 20px;
        background-color: ${colors.blue};
        color: white;
        font-size: 18px;
        ${mixins.componentBorderRadius};
        text-transform: capitalize;
    }
`