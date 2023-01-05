import React from "react"
import Link from "next/link"

type CityContainerProps = {
    sortedCities: any;
    letter: String;
}

function CityContainer(props: CityContainerProps) {
    const { sortedCities, letter } = props
    
    return (
        <div className="city-container">
            <span>{letter}</span>
            {sortedCities.filter((item: any) => item.city[0] == letter).map((item: any) => {
                return (
                    <h3 key={item.url}><Link href={item.url}>{item.city}</Link></h3>
                )
            })}
        </div>
    )
}

export default CityContainer