import { GetStaticProps, GetStaticPaths } from "next"
import { states } from "src/utils/states"
import { connectToDatabase } from "src/utils/mongodb"
import Link from "next/link"
import BarChart from "src/components/BarChart/BarChart"
import { averageCalc } from "src/helpers/averageCalc"
import { capitalize } from "src/helpers/capitalize"

type StateProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    city: [string];
    state: [string];
    state_slug: [string];
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

    return (
        <>
            <h1>{state}</h1>
            <BarChart data={barChartDataPrice} title="Prosječna cijena po kvadratu (&#8364;/m<sup>2</sup>)" avgBarPrice={avgPrice} />
            <BarChart data={barChartDataSumPrice} title="Prosječna ukupna cijena (&#8364;)" />
            <BarChart data={barChartDataArea} title="Prosječna veličina stana (m<sup>2</sup>)" />

            <p>* Zbog malog uzorka označeni gradovi/kvartovi ne prikazuju relevantno stanje.</p>

            <h2>Ukratko</h2>
            <p>Prosječna cijena kvadrata stana za {state} je {avgPrice} €/m2.
            U prosjeku veličina stana na prodaji je {avgArea} m2, srednja tražena prodajna cijena iznosi {avgPriceSum} €</p>

            <h2>Gradovi</h2>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        <Link href={`/${item.state_slug[0]}/${item._id}`}>{item.city[0]}</Link>
                    </li>
                ))}
            </ul>
        </>
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
    const aggregation = [
        {
            $match: {
                state_slug: params?.stateId,
                date: {
                    $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                },
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
    }
}
