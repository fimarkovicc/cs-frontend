import { connectToDatabase } from "./../utils/mongodb";
import { GetStaticProps } from "next";
import Chart from "./../components/Chart";
import { useRouter } from "next/router";
import { states } from "./../utils/states";

type HomeProps = {
  data: {
    _id: string;
    price: number;
    area: number;
    state: [string];
  }[];
};

export default function HomePage({ data, data2 }: HomeProps) {
  //console.log(data2);
  const router = useRouter();

  const handleUrlChange = (e: { target: { value: string } }) => {
    e.target.value && router.push(`${e.target.value}`);
  };

  return (
    <main className="container">
      <div id="map"></div>
      <div>
        <h2>Pratimo, analiziramo, informiramo. </h2>
        <p>42 gradova 157 općina 10560 stanova</p>
        <select onChange={handleUrlChange}>
          <option>--odaberi županiju--</option>
          {states.map((state) => {
            return (
              <option key={state.url} value={state.url}>
                {state.name}
              </option>
            );
          })}
        </select>
      </div>

      <h2>Pregled po županijama</h2>

      <div className="chart">
        <Chart data={data} />
      </div>

      <h2>Nedavno dodano</h2>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const aggregation = [
    {
      $match: {
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        price: { $gte: 7000 },
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

  const aggregation2 = [
    {
      $match: {
        price: { $gte: 7000 },
      },
    },
    { $limit: 3 },
    {
      $group: {
        _id: "$state_slug",
        city: { $addToSet: "$city" },
        // state: { $addToSet: "$state" },
        area: { $avg: "$area" },
        price: { $avg: { $divide: ["$price", "$area"] } },
      },
    },

    { $sort: { date: -1 } },
  ];

  const { db } = await connectToDatabase();

  const data2 = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation2)
    .toArray();

  const data = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation)
    .toArray();

  return {
    props: {
      data,
      data2: JSON.parse(JSON.stringify(data2)),
    },
    revalidate: 86400,
  };
};
