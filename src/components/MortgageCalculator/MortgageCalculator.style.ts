import styled from "styled-components"
import { colors, mixins, sizes } from "@global/styles"

export const MortgageCalculatorStyled = styled.div`
    ${mixins.componentBorderRadius};
    ${mixins.componentMargin};

    background-color: ${colors.blue};
    color: #fff;
    padding: 16px;

    h2 {
        margin-top: 0;
    }

    .mortgage-calculator-wrapper {
        display: flex;

        @media (max-width: ${sizes.spBreakpoint}) {
            flex-direction: column;
        }
    }

    form {
        width: 37.5%;

        @media (max-width: ${sizes.spBreakpoint}) {
            width: 100%;
            margin-bottom: 24px;
        }
    }

    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            input {
                height: 100%;
            }
        }
    }

    .submit-group {
        input {
            ${mixins.componentBorderRadiusSmall};
            background: #fff;
            color: ${colors.darkGray};
            border: 1px solid #fff;
            margin-right: 16px;
            padding: 6px 12px;
        }
    }
`