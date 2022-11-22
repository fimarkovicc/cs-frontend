import React from 'react'
import ChartMortgage from './ChartMortgage'

type Props = {
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void,
    mortgage: {
        principal: string,
        interestRate: string,
        years: string,
        payment: string
    }
}

function MortgageModal(props: Props) {
    const {isModalVisible, setIsModalVisible, mortgage} = props

    const osnovica = Number(mortgage.principal)
    const kamtatnaStopa = Number(mortgage.interestRate)*100*12
    const godineOtplate = Number(mortgage.years)/12
    const rata = Number(mortgage.payment)
    const ukupnaIsplata = Number(mortgage.payment)*Number(mortgage.years)

    const styles = {
        width: 80 + "%",
        minHeight: 300,
        backgroundColor: "gray",
        margin: "0 auto",
        display: isModalVisible ? "block" : "none"
    }

  return (
    <>
    <div style={styles}>
        <span onClick={() => setIsModalVisible(false)}>Close</span>
        <h3>Izračun kredita</h3>
        <ul>
            <li>Osnovica: {osnovica.toLocaleString('hr-HR')}€</li>
            <li>Kamatna stopa: {kamtatnaStopa.toLocaleString('hr-HR')}%</li>
            <li>Trajanje otplate: {godineOtplate} godina</li>
            <li>Mjesečna rata: {rata.toLocaleString('hr-HR')}€</li>
            <li>Ukupno za isplatiti: {ukupnaIsplata.toLocaleString('hr-HR')}€</li>
            <li>Ukupno kamata: {(ukupnaIsplata - osnovica).toLocaleString('hr-HR')}€</li>
        </ul>
        <ChartMortgage data={{osnovica, ukupnaIsplata}} />
    </div>
    </>
  )
}

export default MortgageModal