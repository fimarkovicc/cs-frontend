import React, { ReactEventHandler, useState } from 'react'
import MortgageModal from './MortgageModal'

function MortgageCalculator(){
    const [principal, setPrincipal] = useState('100000')
    const [interestRate, setInterestRate] = useState('3.08')
    const [years, setYears] = useState('30')
    const [mortgage, setMortgage] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    function handleChange(e: React.SyntheticEvent): void{
        let target = e.target as HTMLInputElement;
        target.name == 'principal' && setPrincipal(target.value)
        target.name == 'interest-rate' && setInterestRate(target.value)
        target.name == 'years' && setYears(target.value)
    }

    function resetFields(){
        setPrincipal('')
        setInterestRate('')
        setYears('')
    }

    function calculateMortgage(){
        let p = Number(principal)
        let i = (Number(interestRate) / 100) / 12
        let n = Number(years) * 12        
        let m = Math.round(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1))
        setMortgage({
            principal: p,
            interestRate: i,
            years: n,
            payment: m
        })
    }

    function handleSubmit(e: React.SyntheticEvent): void{
        calculateMortgage()
        // resetFields()
        setIsModalVisible(true)
        e.preventDefault()
    }

    return (
        <>
            <h2>Kreditni kalkulator</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Iznos kredita:
                <input type="number" name="principal" value={principal} onChange={handleChange} required />
            </label>
            <label>
                Godišnja kamatna stopa:
                <input type="number" name="interest-rate" value={interestRate} onChange={handleChange} required />
            </label>
            <label>
                Trajanje u godinama:
                <input type="number" name="years" value={years} onChange={handleChange} required />
            </label>
            <input type="submit" value="Izračunaj" />
            <input type="button" value="Reset" onClick={resetFields} />
            </form>
            <MortgageModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mortgage={mortgage as any} />
        </>
    )
}

export default MortgageCalculator