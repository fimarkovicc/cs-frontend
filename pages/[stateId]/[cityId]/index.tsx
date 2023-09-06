import { GetStaticPaths, GetStaticProps } from "next"
import { connectToDatabase } from "src/utils/mongodb"
const citiesList = require("@constants/statesAndCities.json")
import { states } from "src/utils/states"
import BarChart from "src/components/BarChart/BarChart"
import { averageCalc } from "src/helpers/averageCalc"
import { useRouter } from "next/router"
import Link from "next/link"
import { ContentPlainTextStyled } from "@global/components/UI/ContentPlainTextStyled"
import { labels } from "@global/constants/labels.constants"
import Head from "next/head"

type CityProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    city: string[];
    count: number;
  }[];
};

type PathsData = {
  _id: {
    state_slug: string;
    city_slug: string;
  };
};

type StatesAndCities = {
  params: {
    stateId: string;
    cityId: string;
  }
}

export default function City({ data }: CityProps) {
    const router = useRouter()
    if (data.length == 0) return null    

    const barChartDataPrice = data.map(item => {
        return {
            name: item._id,
            value: Math.round(item.price),
            id: item._id,
            count: item.count
        }
    })

    const barChartDataSumPrice = data.map(item => {
        return {
            name: item._id,
            value: Math.round(item.price * item.area),
            id: item._id,
            count: item.count
        }
    })

    const barChartDataArea = data.map(item => {
        return {
            name: item._id,
            value: Math.round(item.area),
            id: item._id,
            count: item.count
        }
    })

    const avgPrice = averageCalc(barChartDataPrice.map(obj => obj.value))
    const avgPriceSum = averageCalc(barChartDataSumPrice.map(obj => obj.value))
    const avgArea = averageCalc(barChartDataArea.map(obj => obj.value))
    const stateNameObj = states.find(item => item.url == router.query.stateId)
    const stateName = stateNameObj?.url == "grad-zagreb" ? stateNameObj.name : `Županija ${stateNameObj?.name}` 
    
    return (
        <div className="container">
            <Head>
                <title>Cijene stanova - {data[0].city[0]}</title>
                <meta name="description" content={`Cijene stanova u ${data[0].city[0]}`} />
            </Head>
            <div className="neighbourhood-page-heading"><h1><Link href={`/${stateNameObj?.url}`}>{stateName}</Link> / {data[0].city[0]}</h1></div>

            <BarChart data={barChartDataPrice} title="Prosječna cijena po kvadratu (&#8364;/m<sup>2</sup>)" avgBarPrice={avgPrice} colorize={true} />
            <BarChart data={barChartDataSumPrice} title="Prosječna ukupna cijena (&#8364;)" />
            <BarChart data={barChartDataArea} title="Prosječna veličina stana (m<sup>2</sup>)" />

            <p className="notice">{labels.lowSampleNotification}</p>

            <ContentPlainTextStyled>
                <h2>Ukratko</h2>
                <p>Prosječna cijena kvadrata stana za {data[0].city[0]} je <em>{avgPrice} €/m2</em>.
            U prosjeku veličina stana na prodaji je <em>{avgArea} m2</em>, srednja tražena prodajna cijena iznosi <em>{avgPriceSum} €</em></p>
            </ContentPlainTextStyled>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const stateNames = states.map(item => item.url)
    const paths = citiesList.filter((item: StatesAndCities) => stateNames.includes(item.params.stateId))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const aggregation = [
        {
            $match: {
                city_slug: params?.cityId
            }
        },
        {
            $group: {
                _id: "$neighbourhood",
                count: { $sum: 1 },
                slug: { $addToSet: "$neighbourhood_slug" },
                city: { $addToSet: "$city" },
                area: { $avg: "$area" },
                price: { $avg: { $divide: ["$price", "$area"] } },
            },
        },
        { $sort: { price: -1 } },
    ]

    const { db } = await connectToDatabase()

    const data = await db
        .collection("stanovi_njuskalo")
        .aggregate(aggregation)
        .toArray()

    return {
        props: { data },
        revalidate: 86400
    }
}
