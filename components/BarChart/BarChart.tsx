import React from "react"
import { BarChartStyled } from "./BarChart.styled"
import { averageCalc } from "@helpers/averageCalc"

type BarChartProps = {
    data: {
        name: string;
        value: number;
        id: string;
        count: number;
    }[],
    title?: string;
    avgBarPrice?: number;
}

function BarChart(props: BarChartProps) {
    const { data, title, avgBarPrice = 0 } = props

    const values = data.map(obj => obj.value)
    const maxValue = Math.max(...values)

    return (
        <BarChartStyled>
            {title && <h2 dangerouslySetInnerHTML={{__html: title}}></h2>}
            <ul className="chart">
                {data.map((item, i) => 
                    (
                        item.id && 
                            (
                                (avgBarPrice && item.value > avgBarPrice && data[i+1].value < avgBarPrice) ?
                                    <li key={i} className="chart-item average" style={{width: `${Math.round((avgBarPrice/maxValue)*100)}%`}}>
                                        <span>Prosjek</span>
                                        <span>{avgBarPrice}</span>
                                    </li>
                                    :
                                    <li key={i} className="chart-item" style={{width: `${Math.round((item.value/maxValue)*100)}%`}}>
                                        <span>{item.name}{item.count < 5 && "*"}</span>
                                        <span>{item.value}</span>
                                    </li>
                            )
                    )
                )}
            </ul>
        </BarChartStyled>
    )
}

export default BarChart