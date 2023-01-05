import React, { useState, useEffect } from "react"
import MortgageModal from "./MortgageModal/MortgageModal"
import avgInterestRates from "@constants/interstRates"
import { MortgageCalculatorStyled } from "./MortgageCalculator.style"
import PieChart from "./PieChart/PieChart"

type MortgageType = {
    principal: number;
    interestRate: number;
    years: number;
    payment: number;
}

function MortgageCalculator(){
    const avgInterestRate = avgInterestRates()

    const [principal, setPrincipal] = useState("120000")
    const [interestRate, setInterestRate] = useState(avgInterestRate as any)
    const [years, setYears] = useState("30")
    const [mortgage, setMortgage] = useState({} as MortgageType)

    useEffect(() => {
        calculateMortgage()
    }, [])

    function handleChange(e: React.SyntheticEvent): void{
        let target = e.target as HTMLInputElement
        target.name == "principal" && setPrincipal(target.value)
        target.name == "interest-rate" && setInterestRate(target.value)
        target.name == "years" && setYears(target.value)
    }

    function resetFields(){
        setPrincipal("")
        setInterestRate("")
        setYears("")
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
        e.preventDefault()
    }

    return (
        <MortgageCalculatorStyled>
            <h2 id="kalkulator">Kreditni kalkulator</h2>
            <div className="mortgage-calculator-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>
                Iznos kredita:
                            <input type="number" step="1000" name="principal" value={principal} onChange={handleChange} required />
                        </label>
                        <label>
                Godišnja kamatna stopa:
                            <input type="number" name="interest-rate" value={interestRate} onChange={handleChange} required />
                        </label>
                        <label>
                Trajanje u godinama:
                            <input type="number" name="years" value={years} onChange={handleChange} required />
                        </label>
                    </div>
                    <div className="submit-group">
                        <input type="submit" value="Izračunaj" />
                        <input type="button" value="Reset" onClick={resetFields} />
                    </div>
                </form>
                <MortgageModal mortgage={mortgage as any} />
                <PieChart principalPercent={(mortgage.principal/(mortgage.payment*mortgage.years))*100} />
            </div>
        </MortgageCalculatorStyled>
    )
}

export default MortgageCalculator