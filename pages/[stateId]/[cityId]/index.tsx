import { GetStaticPaths, GetStaticProps } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

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

export default function City({ data }: CityProps) {
  return (
    <>
      <h1>grad...</h1>
      {data.map((item) => (
        <p key={item._id}>{item._id}</p>
      ))}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const aggregation = [
    {
      $project: {
        state_slug: 1,
        city_slug: 1,
      },
    },
    {
      $group: {
        _id: {
          state_slug: "$state_slug",
          city_slug: "$city_slug",
        },
      },
    },
  ];

  const { db } = await connectToDatabase();

  const data = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation)
    .toArray();

  const paths = data.map((item: PathsData) => {
    const stateId = item._id.state_slug;
    const cityId = item._id.city_slug;
    return {
      params: {
        stateId,
        cityId,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

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
  ];

  const { db } = await connectToDatabase();

  const data = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation)
    .toArray();

  return {
    props: { data },
  };
};
