import styled from "styled-components"
import { colors, sizes } from "@global/styles"

type Props = {
    principalPercent?: number;
}

export const PieChartStyled = styled.div<Props>`
	width: 25%;

	@media (max-width: ${sizes.spBreakpoint}) {
		width: 100%;
	}

	.pie-chart {
		background:
			radial-gradient(
				circle closest-side,
				transparent 70%,
				${colors.blue} 0
			),
			conic-gradient(
				#fff 0,
				#fff ${props => props.principalPercent}%,
				${colors.yellow} 0,
				${colors.yellow} 100%
		);
		position: relative;
		width: 350px;
		min-height: 250px;
		margin: -52px 0 0 0;
		max-width: 100%;

		@media (max-width: ${sizes.spBreakpoint}) {
			margin: 0;
			width: 250px;
		}
	}

	.pie-chart figcaption {
		position: absolute;
		bottom: 1em;
		right: 1em;
		font-size: smaller;
		text-align: right;
	}
	.pie-chart span:after {
		display: inline-block;
		content: "";
		width: 0.8em;
		height: 0.8em;
		margin-left: 0.4em;
		height: 0.8em;
		border-radius: 0.2em;
		background: currentColor;
	}
`