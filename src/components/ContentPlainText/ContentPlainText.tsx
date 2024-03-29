import React from "react"
import { ContentPlainTextStyled } from "@global/components/UI/ContentPlainTextStyled"
import { median } from "@global/helpers/median"

type ContentPlainTextProps = {
    avgPriceLastYearData: any, 
    barChartDataPrice: any,
    interest: number;
}

function ContentPlainText(props: ContentPlainTextProps) {
    const { interest, barChartDataPrice, avgPriceLastYearData } = props
    const medianValue = median(barChartDataPrice).medianValue

    return (
        <ContentPlainTextStyled>
            <h2>Ukratko</h2>
            <p>Prosječna cijena kvadrata stana u Hrvatskoj u zadnjih godinu dana je <em>{Math.round(avgPriceLastYearData[0].avgprice / avgPriceLastYearData[0].avgarea)} €/m<sup>2</sup>.</em></p>
            <p>U prosjeku veličina stana na prodaji u Hrvatskoj je <em>{avgPriceLastYearData[0].avgarea} m<sup>2</sup></em>, srednja tražena prodajna cijena iznosi <em>{avgPriceLastYearData[0].avgprice} €</em></p>
            <p>Prosječna kamatna stopa za stambeni kredit je <em>{interest}%</em>.</p>
            <p>Median cijene kvadrata u Hrvatskoj iznosi <em>{medianValue} €/m<sup>2</sup></em>. Što znači da polovica stanova ima veću ili manju cijenu kvadrata od navedene.</p>
        </ContentPlainTextStyled>
    )
}

export default ContentPlainText