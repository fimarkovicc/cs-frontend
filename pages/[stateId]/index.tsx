import { GetStaticProps, GetStaticPaths } from "next";
import { connectToDatabase } from "./../../utils/mongodb";
import Link from "next/link";

type StateProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    slug: [string];
  }[];
  state: string;
};

export default function State({ data, state }: StateProps) {
  return (
    <>
      <h1>Županija...{state}</h1>
      {data.map((item) => (
        <div key={item._id}>
          <Link href={`/${state}/${item.slug[0]}`}>{item._id}</Link>
          <p>
            {item._id} - prosječna cijena {item.price} - prosječna kvadratura{" "}
            {item.area}
          </p>
        </div>
      ))}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();

  const data = await db.collection("stanovi_njuskalo").distinct("state");

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
        state: params?.stateId,
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    },

    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
        slug: { $addToSet: "$city_slug" },
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
    props: { data, state: params?.stateId },
  };
};
