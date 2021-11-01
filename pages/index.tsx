import { connectToDatabase } from "./../utils/mongodb";
import { GetStaticProps } from "next";
import Link from "next/link";
import Chart from "./../components/Chart";

type HomeProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    state: [string];
  }[];
};

export default function HomePage({ data }: HomeProps) {
  console.log(data);
  return (
    <div className="container">
      <h2>Pregled po županijama</h2>

      <div className="chart">
        <Chart data={data} />
      </div>

      {data.map((item) => (
        <p key={item._id}>
          <Link href={`/${item._id}`}>{item.state[0]}</Link>
        </p>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const aggregation = [
    {
      $match: {
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    },
    {
      $group: {
        _id: "$state_slug",
        state: { $addToSet: "$state" },
        area: { $avg: "$area" },
        price: { $avg: { $divide: ["$price", "$area"] } },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const { db } = await connectToDatabase();

  const data = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation)
    .toArray();

  return {
    props: {
      data,
    },
    revalidate: 86400,
  };
};
