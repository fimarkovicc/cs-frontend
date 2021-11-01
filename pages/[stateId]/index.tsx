import { GetStaticProps, GetStaticPaths } from "next";
import { connectToDatabase } from "./../../utils/mongodb";
import Link from "next/link";

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
  return (
    <>
      <h1>Županija...{data[0].state[0]}</h1>
      {data.map((item) => (
        <Link href={`/${item.state_slug[0]}/${item._id}`}>{item._id}</Link>
      ))}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();

  const data = await db.collection("stanovi_njuskalo").distinct("state_slug");

  const paths = data.map((item: string) => {
    return { params: { stateId: item } };
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
