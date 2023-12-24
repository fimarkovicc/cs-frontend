import { GetStaticProps, GetStaticPaths } from "next"
import { states } from "src/utils/states"
import { connectToDatabase } from "src/utils/mongodb"
import Link from "next/link"
import BarChart from "src/components/BarChart/BarChart"
import { averageCalc } from "src/helpers/averageCalc"
import { capitalize } from "src/helpers/capitalize"
import { ContentPlainTextStyled } from "@global/components/UI/ContentPlainTextStyled"
import { CitiesStyled } from "@global/components/UI/CitiesList"
import { labels } from "@global/constants/labels.constants"
import Head from "next/head"

type StateProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    city: string;
    state: string;
    state_slug: string;
    count: number;
  }[];
  state: string;
};

export default function State({ data }: StateProps) {    
    const barChartDataPrice = data.map(item => {
        return {
            name: item.city[item.city.length-1],
            value: Math.round(item.price),
            id: item._id,
            count: item.count
        }
    })

    const barChartDataSumPrice = data.map(item => {
        return {
            name: item.city[item.city.length-1],
            value: Math.round(item.price * item.area),
            id: item._id,
            count: item.count
        }
    })

    const barChartDataArea = data.map(item => {
        return {
            name: item.city[item.city.length-1],
            value: Math.round(item.area),
            id: item._id,
            count: item.count
        }
    })

    const avgPrice = averageCalc(barChartDataPrice.map(obj => obj.value))
    const avgPriceSum = averageCalc(barChartDataSumPrice.map(obj => obj.value))
    const avgArea = averageCalc(barChartDataArea.map(obj => obj.value))

    const state = data[0].state[0] != "grad zagreb" ? 
        "Županija " + capitalize(data[0].state[0])
        :
        capitalize(data[0].state[0].split(" ")[0]) + " " + capitalize(data[0].state[0].split(" ")[1])

    const neighbourhoodsTitle = data[0].state_slug == "grad-zagreb" ? "Kvartovi" : "Gradovi/Općine"

    return (
        <div className="container">
            <Head>
                <title>Cijene stanova - {state}</title>
                <meta name="description" content={`Cijene stanova u ${state}`} />
            </Head>
            <h1>{state}</h1>
            <BarChart data={barChartDataPrice} title="Prosječna cijena po kvadratu (&#8364;/m<sup>2</sup>)" avgBarPrice={avgPrice} colorize={true} />
            <BarChart data={barChartDataSumPrice} title="Prosječna ukupna cijena (&#8364;)" />
            <BarChart data={barChartDataArea} title="Prosječna veličina stana (m<sup>2</sup>)" />

            <p className="notice">{labels.lowSampleNotification}</p>

            <ContentPlainTextStyled>
                <h2>Ukratko</h2>
                <p>Prosječna cijena kvadrata stana za <b>{state}</b> je <em>{avgPrice} €/m<sup>2</sup></em>.
            U prosjeku veličina stana na prodaji je <em>{avgArea} m2</em>, srednja tražena prodajna cijena iznosi <em>{avgPriceSum} €</em></p>
            </ContentPlainTextStyled>

            <CitiesStyled>
                <h2>{neighbourhoodsTitle}</h2>
                <ul>
                    {data.map((item) => (
                        <li key={item._id}>
                            <Link href={`/${item.state_slug[0]}/${item._id}`}>{item.city[0]}</Link>
                        </li>
                    ))}
                </ul>
            </CitiesStyled>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = states.map(item => ({ params: { stateId: item.url } }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let stateId
    if( params?.stateId == "medimurska"){
        stateId = "medimurje"
    }else{
        stateId = params?.stateId
    }

    const aggregation = [
        {
            $match: {
                state_slug: stateId,
                date: {
                    $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                },
                price: {
                    $gt: 1
                },
                area: {$gt: 1}
            },
        },

        {
            $group: {
                _id: "$city_slug",
                count: { $sum: 1 },
                city: { $addToSet: "$city" },
                state: { $addToSet: "$state" },
                state_slug: { $addToSet: "$state_slug" },
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
