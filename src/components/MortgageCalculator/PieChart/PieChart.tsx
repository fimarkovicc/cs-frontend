import React from "react"
import { PieChartStyled } from "./PieChart.style"
import { colors } from "@global/styles"

type PieChartProps = {
    principalPercent: number;
}

function PieChart(props: PieChartProps) {
    const {principalPercent} = props

    return (
        <PieChartStyled principalPercent={principalPercent}>
            <figure className="pie-chart">
                <figcaption>
                    Osnovica<span style={{color: "#fff"}}></span><br/>
                    Kamata<span style={{color: colors.yellow}}></span>
                </figcaption>
            </figure>
        </PieChartStyled>
    )
}

export default PieChart