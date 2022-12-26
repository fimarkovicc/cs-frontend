import { GetStaticPaths, GetStaticProps } from "next"
import { connectToDatabase } from "@utils/mongodb"
const citiesList = require("@constants/statesAndCitties.json")
import { states } from "@utils/states"

type CityProps = {
  data: {
    _id: string;
    price: number;
    area: number;
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
    return (
        <>
            <h1>grad...</h1>
            {data.map((item) => (
                <p key={item._id}>{item._id}</p>
            ))}
        </>
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
                city_slug: params?.cityId,

                date: {
                    $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                },
            },
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
        props: { data }
    }
}
