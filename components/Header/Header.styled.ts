import styled from "styled-components"
import { colors } from "./../../styles"

export const HeaderStyled = styled.div`
    header {
        display: flex;
        align-items: center;
    }

    .header__home {
        color: ${colors.lightGray};
        font-family: 'Inter-Regular', sans-serif;
        font-size: 22px;
    }

    .header__menu {
        margin-left: 30px;

        a {
            text-decoration: none;
        }
    }
`