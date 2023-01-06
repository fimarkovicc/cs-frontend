import React, { useState } from "react"
import { cities } from "../../utils/cities"
import { CitiesStyled } from "./Cities.style"
import CityContainer from "./CityContainer"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

function Cities(){

    const [isOpen, setIsOpen] = useState(false)

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

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <CitiesStyled>
            <h2 id="gradovi">Gradovi</h2>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 3, 900: 5}}
                className={["wrapper", isOpen ? "open" : ""].join(" ")}
            >
                <Masonry>
                    {
                        letters.map(letter => {
                            return (
                                <CityContainer key={letter} sortedCities={sortedCities} letter={letter} />
                            )
                        })
                    }
                </Masonry>
            </ResponsiveMasonry>
            <div className={["show-more", isOpen ? "open" : ""].join(" ")} onClick={handleClick} role="button">
            </div>
        </CitiesStyled>
    )
}

export default Cities