import React from "react"
import { RecentlyAddedStyled } from "./RecentlyAdded.style"

type RecentlyAddedProps = {
    data: {
        _id: String,
        city: String,
        city_slug: String,
        area: number,
        price: number
    }[]
}

type dataFilteredTypes = {
    _id: String,
    city: String,
    area: number,
    price: number
}[]

function RecentlyAdded(props: RecentlyAddedProps){
    const data = props.data
    let cityHash: {}[] = []
    let dataFiltered: dataFilteredTypes = []

    data.forEach(item => {
        if(!cityHash.includes(item.city_slug)){
            dataFiltered.push(item)
            cityHash.push(item.city_slug)
        }            
    })

    return (
        <RecentlyAddedStyled>
            <h2>Nedavno dodano</h2>
            <ul>
                {dataFiltered.map((item, i) => (
                    i < 11 && <li key={item._id.toString()}><b>{item.city}</b>, stan od {item.area}m2, prodaje se za {item.price}€ ({Math.round(item.price/item.area)} €/m2).</li>
                ))}
            </ul>
        </RecentlyAddedStyled>
    )
}

export default RecentlyAdded

