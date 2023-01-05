import styled from "styled-components"

export const FaqItemStyled = styled.div`
    overflow: hidden;

    .content-hidden {
        height: 0;
        opacity: 0;
        transition: opacity 0.3s linear;
    }

    .content-visible {
        height: auto;
        transition: opacity 0.3s linear;
        opacity: 1;
    }

    p {
        line-height: 1.4;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        top: 8px;
    }

    .faq-btn {
        span {
            height: 2px;
            width: 16px;
            background-color: black;
            display: block;

            &:first-child {
                transform: rotate(90deg) translateX(2px);
                transition: all 100ms;
            }
        }

        &.active {
            span:first-child {
                transform: rotate(180deg) translateY(-2px);
            }
        }
    }
`