import { percentDifference } from "../helpers/percentCalc"

type CompareMiscProps = {
    data: {
        _id: String,
        city: [String],
        price: number
    }[]
}

type citiesToCompareTypes = {
    _id: String,
    city: [String],
    price: number
}[]

function CompareMisc(props: CompareMiscProps){
    const cities = props.data
    const citiesToCompare: citiesToCompareTypes = []
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "split"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "donji-grad"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "rijeka"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "pula"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "osijek"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "dubrovnik"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "zadar"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "sibenik"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "vukovar"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "koprivnica"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "varazdin"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "cakovec"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "dubrovnik"))
    // @ts-ignore
    citiesToCompare.push(cities.find(o => o._id == "opatija"))

    // zagreb fix
    citiesToCompare[1].city[0] = "Zagreb"

    function prepareCityList(i: number){      
        if(i < citiesToCompare.length-1){
            if(citiesToCompare[i].price > citiesToCompare[i+1].price){
                return `${citiesToCompare[i].city[0]} je ${percentDifference(citiesToCompare[i+1].price, citiesToCompare[i].price)}% skuplji u odnosu na grad ${citiesToCompare[i+1].city[0]}`
            }else{
                return `Kvadrat u gradu ${citiesToCompare[i].city[0]} je ${percentDifference(citiesToCompare[i+1].price, citiesToCompare[i].price)}% jeftiniji u odnosu na ${citiesToCompare[i+1].city[0]}`
            } 
        }
    }

    return (
        <>
            <h2 id="usporedbe">Usporedbe</h2>
            <ul>
                {citiesToCompare.map((city, i) => {
                    if(i % 2 == 0){
                        return <li key={city._id.toString()}>{prepareCityList(i)}</li>
                    }})}
            </ul>
        </>
    )
}

export default CompareMisc