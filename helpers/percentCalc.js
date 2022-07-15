export const percentDifference = (originalNum, newNum) => {
    const diff = newNum - originalNum
    let pdiff = (diff / originalNum) * 100
    pdiff = pdiff.toFixed(1)
    return pdiff
}