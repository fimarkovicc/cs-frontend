import React from "react"
import { BarChartStyled } from "./BarChart.styled"

type BarChartProps = {
    data: {
        name: string;
        value: number;
        id: string;
    }[]
}

function BarChart(props: BarChartProps) {
    const { data } = props

    const values = data.map(obj => obj.value)
    const maxValue = Math.max(...values)

    return (
        <BarChartStyled>
            <h2>Main Chart</h2>
            <ul className="chart">
                {data.map((item, i) => 
                    (
                        item.id && 
                            <li key={item.id} className="chart-item" style={{width: `${Math.round((item.value/maxValue)*100)}%`}}>
                                <span>{item.name}</span>
                                <span>{item.value} &#8364;/m<sup>2</sup></span>
                            </li>
                    )
                )}
            </ul>
        </BarChartStyled>
    )
}

export default BarChart