export const averageCalc = (arr: number[]): number => {
    return Math.round(arr.reduce((a,b) => a + b, 0) / arr.length)
}