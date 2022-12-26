import React from "react"
import { BarChartStyled } from "./BarChart.styled"

type BarChartProps = {
    data: {
        state: string[];
        price: number;
        _id: string;
    }[]
}

function BarChart(props: BarChartProps) {
    const { data } = props

    const prices = data.map(obj => obj.price)
    const maxPrice = Math.max(...prices)

    return (
        <BarChartStyled>
            <h2>Main Chart</h2>
            <ul className="chart">
                {data.map((item, i) => 
                    (
                        item._id && 
                            <li key={item._id} className="chart-item" style={{width: `${Math.round((item.price/maxPrice)*100)}%`}}>
                                <span>{item.state[item.state.length - 1]}</span>
                                <span>{item.price} &#8364;/m<sup>2</sup></span>
                            </li>
                    )
                )}
            </ul>
        </BarChartStyled>
    )
}

export default BarChart