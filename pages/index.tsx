import { connectToDatabase } from "./../utils/mongodb";
import { GetStaticProps } from "next";
import Link from "next/link";

type HomeProps = {
  data: {
    _id: string;
    price: number;
    area: number;
  }[];
};

export default function HomePage({ data }: HomeProps) {
  // console.log(data);
  return (
    <div>
      <h1>Županije...new</h1>
      {data.map((item) => (
        <p key={item._id}>
          <Link href={`/${item._id}`}>{item._id}</Link>
          {item._id} - prosječna cijena {item.price} - prosječna kvadratura{" "}
          {item.area}
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
        _id: "$state",
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
    props: {
      data,
    },
  };
};
