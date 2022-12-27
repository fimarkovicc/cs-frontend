export const percentDifference = (originalNum: number, newNum: number): number => {
    const diff = newNum - originalNum
    let pdiff = (diff / originalNum) * 100
    pdiff = parseInt(pdiff.toFixed(1))
    return pdiff
}