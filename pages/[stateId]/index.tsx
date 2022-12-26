import { GetStaticProps, GetStaticPaths } from "next"
import { states } from "@utils/states"
import { connectToDatabase } from "@utils/mongodb"
import Link from "next/link"
import BarChart from "@components/BarChart/BarChart"

type StateProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    city: [string];
    state: [string];
    state_slug: [string];
  }[];
  state: string;
};

export default function State({ data }: StateProps) {
    console.log(data)

    const barChartData = data.map(item => {
        return {
            state: [item.city],
            price: Math.round(item.price),
            _id: item._id
        }
    })

    return (
        <>
            <h1>Županija {data[0].state[0]}</h1>
            <BarChart data={barChartData} />
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
