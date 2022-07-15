//type Arr = Array<T>

export const myfn = <T>(numbers:Array<T>) => {

    return numbers[0]

}

let l = myfn([1, 4, 23])
let l2 = myfn(["word", "ball", "car"])
let l3 = myfn(["word", "ball", "car", 34])