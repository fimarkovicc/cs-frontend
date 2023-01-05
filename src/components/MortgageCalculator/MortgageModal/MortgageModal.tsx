import React from "react"
import { MortgageModalStyled } from "./MortgageModal.style"

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
                    <li>Osnovica: {osnovica.toLocaleString("hr-HR")}€</li>
                    <li>Kamatna stopa: {kamtatnaStopa.toLocaleString("hr-HR")}%</li>
                    <li>Trajanje otplate: {godineOtplate} godina</li>
                    <li>Mjesečna rata: {rata.toLocaleString("hr-HR")}€</li>
                    <li>Ukupno za isplatiti: {ukupnaIsplata.toLocaleString("hr-HR")}€</li>
                    <li>Ukupno kamata: {(ukupnaIsplata - osnovica).toLocaleString("hr-HR")}€</li>
                </ul>
            </div>
        </MortgageModalStyled>
    )
}

export default MortgageModal