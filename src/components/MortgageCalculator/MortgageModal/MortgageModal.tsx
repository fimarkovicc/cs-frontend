import React from "react"
import { MortgageModalStyled } from "./MortgageModal.style"
import { labels } from "@global/constants/labels.constants"

type Props = {
    mortgage: {
        principal: string,
        interestRate: string,
        years: string,
        payment: string
    }
}

function MortgageModal(props: Props) {
    const {mortgage} = props

    const osnovica = Number(mortgage.principal)
    const kamtatnaStopa = Number(mortgage.interestRate)*100*12
    const godineOtplate = Number(mortgage.years)/12
    const rata = Number(mortgage.payment)
    const ukupnaIsplata = Number(mortgage.payment)*Number(mortgage.years)

    return (
        <MortgageModalStyled>
            <div className="text">
                <ul>
                    <li>Osnovica: {osnovica.toLocaleString(labels.locale)}€</li>
                    <li>Kamatna stopa: {kamtatnaStopa.toLocaleString(labels.locale)}%</li>
                    <li>Trajanje otplate: {godineOtplate} godina</li>
                    <li>Mjesečna rata: {rata.toLocaleString(labels.locale)}€</li>
                    <li>Ukupno za isplatiti: {ukupnaIsplata.toLocaleString(labels.locale)}€</li>
                    <li>Ukupno kamata: {(ukupnaIsplata - osnovica).toLocaleString(labels.locale)}€</li>
                </ul>
            </div>
        </MortgageModalStyled>
    )
}

export default MortgageModal