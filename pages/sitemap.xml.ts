import { connectToDatabase } from "./../src/utils/mongodb"
import { GetServerSideProps } from "next"

const collection = process.env.COLLECTION
const BASE_PATH = "https://cijenestanova.com"

type stateAndCitiesProps =
    {
        _id: string;
        city: string[];
    }[]

function generateSiteMap(statesAndCities: stateAndCitiesProps) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_PATH}</loc>
     </url>
     <url>
       <loc>${BASE_PATH}/uvjeti-koristenja</loc>
     </url>
     ${statesAndCities
        .filter(item => item._id != null)
        .filter(item => item._id != "istra")
        .filter(item => item._id != "medimurje")
        .map(item => {
            const state = item._id
            return (
                `<url><loc>${BASE_PATH}/${state}/</loc></url>
            ${item.city.map(item => {
                    const city = item
                    return `<url><loc>${BASE_PATH}/${state}/${city}</loc></url>`
                }).join("")}`
            )
        }).join("")})
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { db } = await connectToDatabase()
    const {res} = context
    const statesAndCities = await db
        .collection(collection)
        .aggregate(
            [{
                "$group": {
                    _id: "$state_slug",
                    city: { $addToSet: "$city_slug" },
                }
            },]
        )
        .toArray()

    const sitemap = generateSiteMap(statesAndCities as stateAndCitiesProps)
  
    res.setHeader("Content-Type", "text/xml")
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default SiteMap