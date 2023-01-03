import styled from "styled-components"
import { colors } from "@global/styles"

export const BarChartStyled = styled.div`
    .chart {
        list-style-type: none;
        padding: 0;

        li {
            &:hover {
                background: ${colors.semiLightGray};
            }
        }
    }

    .chart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: capitalize;
        padding: 8px 0;
    }

    .indicator {
        background-color: ${colors.semiLightGray};

        .indicator-line {
            height: 2px;
        }
    }

    .average {
        background-color: ${colors.semiDarkGray};

        &.indicator-line {
            background-color: transparent;
        }
    }
`