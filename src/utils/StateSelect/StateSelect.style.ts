import styled from "styled-components"
import { colors, mixins } from "@global/styles"

export const StateSelectStyled = styled.div`
    select {
        padding: 14px 20px;
        background-color: ${colors.blue};
        color: white;
        font-size: 18px;
        ${mixins.componentBorderRadius};
        text-transform: capitalize;
        appearance: none;
        background-image: url("/images/Ic_arrow_drop_down_36px.svg");
        background-repeat: no-repeat;
        background-position: center right;
        width: 85%;
    }
`