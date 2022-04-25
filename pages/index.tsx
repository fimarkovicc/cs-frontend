import { connectToDatabase } from "./../utils/mongodb";
import { GetStaticProps } from "next";
import Chart from "./../components/Chart";
import { useRouter } from "next/router";
import { states } from "./../utils/states";
import { avgPriceLastYearAgg, HpMainChartAgg, recentlyAddedAgg } from "./../aggregations/index";

const collection = process.env.COLLECTION;

type HomeProps = {
  HpMainChartData: {
  }[],
  avgPriceLastYearData: {}[];
};

export default function HomePage(props: HomeProps) {
  const { HpMainChartData, avgPriceLastYearData, recentlyAddedData } = props;
  const router = useRouter();
 //console.log(recentlyAddedData) 
  const handleUrlChange = (e: { target: { value: string } }) => {
    e.target.value && router.push(`${e.target.value}`);
  };

  return (
    <main className="container">
      {/* <div id="map"></div> */}
      <div>
        <h2>Pratimo, analiziramo, informiramo. </h2>
        <p>42 gradova, 157 općina, 10560 stambenih jedinica</p>
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

      <div className="chart">{<Chart data={HpMainChartData} />}</div>

      <p>Prosječna cijena kvadrata stana u Hrvatskoj u zadnjih godinu dana je {Math.round(avgPriceLastYearData[0].avgprice/avgPriceLastYearData[0].avgarea)} €/m2.</p>
      <p>U prosjeku veličina stana je {avgPriceLastYearData[0].avgarea} m2, srednja vrijednost ukupne tražene prodajne cijene iznosi {avgPriceLastYearData[0].avgprice} €</p>

      <h2>Nedavno dodano</h2>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { db } = await connectToDatabase();
  
  const avgPriceLastYearData = await db
    .collection(collection)
    .aggregate(avgPriceLastYearAgg)
    .toArray();

  const HpMainChartData = await db
    .collection(collection)
    .aggregate(HpMainChartAgg)
    .toArray();

  const recentlyAddedData = await db
    .collection(collection)
    .aggregate(recentlyAddedAgg)
    .toArray();

  return {
    props: {
      HpMainChartData: JSON.parse(JSON.stringify(HpMainChartData)),
      avgPriceLastYearData: JSON.parse(JSON.stringify(avgPriceLastYearData)),
      recentlyAddedData: JSON.parse(JSON.stringify(recentlyAddedData))
      
    },
    //revalidate: 86400,
  };
};
