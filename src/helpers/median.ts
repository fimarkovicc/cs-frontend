type MedianProps = {
        name: string;
        value: number;
        id: string;
        count: number;
}[]

export const median = (values: MedianProps) => {
    const oneHalf = Math.floor(values.length / 2)
    return {medianValue: values[oneHalf].value, medianObjIndex: oneHalf}
}