const interestRates = {
    hpb: 2.99,
    erste: 2.95,
    zaba: 3.33,
    otp: 3.43,
    bks: 3.02,
    rba: 2.76
}

export default function avgInterestRates(){
    let sum = 0
    for(const [key, value] of Object.entries(interestRates)){
        sum += value
    }
    let avg = sum / Object.keys(interestRates).length
    avg = avg.toFixed(2)
    return avg
}