import React from "react"
import { cities } from "../../utils/cities"
import Link from "next/link"
import { CitiesStyled } from "./Cities.style"

function Cities(){

    function compare(a:{city: String}, b:{city: String}) {
        if (a.city < b.city){
            return -1
        }
        if (a.city > b.city){
            return 1
        }
        return 0
    }

    function unique(value: any, index: any, self: any): any {
        return self.indexOf(value) === index
    }

    let sortedCities = cities.map(item => {
        return {
            url: "/" + item._id.state_slug + "/" + item._id.city_slug,
            city: item._id.city
        }
    }) 

    sortedCities.sort(compare)

    const letters = sortedCities.map(item => item.city[0]).filter(unique) 

    return (
        <CitiesStyled>
            <h2 id="gradovi">Gradovi</h2>
            <div className="cities-list-wrapper">
                {
                    letters.map((letter, i) => {
                        return (
                            <div key={letter}>
                                <span>{letter}</span>
                                {
                                    sortedCities.filter((item) => item.city[0] == letter).map((item, i) => {
                                        return (
                                            <h3 key={item.city}><Link href={item.url}>{item.city}</Link></h3>
                                        )
                                    })
                                }
                            </div>

                        )
                    })
                }
            </div>
        </CitiesStyled>
    )
}

export default Cities