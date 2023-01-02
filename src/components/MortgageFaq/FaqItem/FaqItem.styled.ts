import styled from 'styled-components'

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
`