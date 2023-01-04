import React from "react"
import { BarChartStyled } from "./BarChart.style"
import { median } from "@global/helpers/median"
import { colors } from "@global/styles"

type BarChartProps = {
    data: {
        name: string;
        value: number;
        id: string;
        count: number;
    }[],
    title?: string;
    avgBarPrice?: number;
    colorize?: boolean;
}

function BarChart(props: BarChartProps) {
    const { data, title, avgBarPrice = 0, colorize = false } = props

    const values = data.map(obj => obj.value)
    const maxValue = Math.max(...values)

    const medianTopIndex = Math.floor(median(data).medianObjIndex * 1.5)
    const medianBottomIndex = Math.floor(median(data).medianObjIndex * 0.5)

    const preparedItems = () => {
        let barColor = colors.lightGray

        return data.map((item, i) => 
        {
            if(colorize) {
                if(i > medianTopIndex) {
                    barColor = colors.green
                }else if(i > medianBottomIndex) {
                    barColor = colors.yellow
                }else{
                    barColor = colors.red
                }
            }

            return (
                item.id && 
                        (
                            (avgBarPrice && item.value > avgBarPrice && data[i+1].value < avgBarPrice && data.length > 3) ?
                                <div key={i}>
                                    <li>
                                        <div className="chart-item">
                                            <span>{item.name}{item.count < 5 && "*"}</span>
                                            <span>{item.value}</span>
                                        </div>
                                        <div className="indicator">
                                            <div className="indicator-line" style={{width: `${Math.round((item.value/maxValue)*100)}%`, backgroundColor: barColor}}></div>
                                        </div>
                                    </li>
                                    <li className="chart-item-average-wrapper">
                                        <div className="chart-item average">
                                            <span>Prosjek</span>
                                            <span>{avgBarPrice}</span>
                                        </div>
                                        <div className="indicator">
                                            <div className="indicator-line average" style={{width: `${Math.round((avgBarPrice/maxValue)*100)}%`, backgroundColor: ""}}></div>
                                        </div>
                                    </li>

                                </div>
                                :
                                <li key={i}>
                                    <div className="chart-item">
                                        <span>{item.name}{item.count < 5 && "*"}</span>
                                        <span>{item.value}</span>
                                    </div>
                                    <div className="indicator">
                                        <div className="indicator-line" style={{width: `${Math.round((item.value/maxValue)*100)}%`, backgroundColor: barColor}}></div>
                                    </div>
                                </li>
                        )
            )}
        )
    }

    return (
        <BarChartStyled>
            {title && <h2 dangerouslySetInnerHTML={{__html: title}}></h2>}
            <ul className="chart">
                {preparedItems()}
            </ul>
        </BarChartStyled>
    )
}

export default BarChart