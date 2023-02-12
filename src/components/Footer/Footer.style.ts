import { colors } from "@global/styles"
import styled from "styled-components"

export const FooterStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50px;
    background: #fff;
    justify-content: center;
    border-top: 1px solid ${colors.semiDarkGray};
    margin-top: auto;

    footer {
        font-size: 12px;
    }

    a {
        margin-right: 10px;
    }
`