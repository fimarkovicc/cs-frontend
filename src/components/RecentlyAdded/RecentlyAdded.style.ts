import styled from "styled-components"
import { mixins } from "@global/styles"

export const RecentlyAddedStyled = styled.div`
    ${mixins.componentBorderRadius};
    ${mixins.componentMargin};
    background-color: #fff;
    
    padding: 16px;

    h2 {
        margin-top: 0;
    }

    li {
        margin: 10px 0;
    }
`