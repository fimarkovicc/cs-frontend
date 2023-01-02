import React from 'react'
import { cities } from '../utils/cities'
import Link from 'next/link'

function Cities(){

    function compare(a:{city: String}, b:{city: String}) {
        if (a.city < b.city){
          return -1;
        }
        if (a.city > b.city){
          return 1;
        }
        return 0;
    }

    let sortedCities = cities.map(item => {
        return {
            url: '/' + item._id.state_slug + '/' + item._id.city_slug,
            city: item._id.city
        }
    }) 

    sortedCities.sort(compare)

    return (
        <>
            <h3 id="gradovi">Gradovi</h3>
            <ul style={{display: "flex", flexWrap: "wrap"}}>{sortedCities.map((item, i, arr) => {
            if(i + 1 != arr.length){
                if(i == 0){
                    return (
                        <React.Fragment key={item.url}>
                        <li>{arr[i].city.charAt(0)}</li>
                        <li><h3><Link href={item.url}>{item.city}</Link></h3></li>
                        <li>{arr[i+1].city.charAt(0)}</li>
                        </React.Fragment>
                    )
                }
                if(arr[i].city.charAt(0) == arr[i+1].city.charAt(0)){
                    return (                    
                        <li key={item.url}><h3><Link href={item.url}>{item.city}</Link></h3></li>                    
                    )
                }else if(arr[i].city.charAt(0) != arr[i+1].city.charAt(0) && i != 0){
                    return (
                        <React.Fragment key={item.url}>
                        <li><h3><Link href={item.url}>{item.city}</Link></h3></li>
                        <li>{arr[i+1].city.charAt(0)}</li>
                        </React.Fragment>
                    )
                }
            }
        })}</ul>
        </>
    )
}

export default Cities;