import { connectToDatabase } from "./../utils/mongodb"
import { GetStaticProps } from "next"
import Chart from "./../components/Chart"
import { useRouter } from "next/router"
import { states } from "./../utils/states"
import { avgPriceLastYearAgg, hpMainChartAgg, recentlyAddedAgg, compareMiscAgg } from "./../aggregations/index"

import RecentlyAdded from "../components/RecentlyAdded"
import CompareMisc from "../components/CompareMisc"
import Cities from "../components/Cities"
import avgInterestRates from "../constants/interstRates"
import MortgageCalculator from "../components/MortgageCalculator"

const collection = process.env.COLLECTION;

type HomeProps = {
  hpMainChartData: {
  }[],
  avgPriceLastYearData: any,
  recentlyAddedData: any,
  compareMiscData: any
};

export default function HomePage(props: HomeProps) {
  // const { hpMainChartData, avgPriceLastYearData, recentlyAddedData, compareMiscData } = props;
  // const router = useRouter();
  
  // const handleUrlChange = (e: { target: { value: string } }) => {
  //   e.target.value && router.push(`${e.target.value}`);
  // };

  return (
    <main className="container">
      {/* <div>
        <h2>Pratimo, analiziramo, informiramo. </h2>
        <p>42 gradova, 157 općina, 10560 stanova</p>
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

      <div className="chart">{<Chart data={hpMainChartData} />}</div>

      <h2>Ukratko</h2>
      <p>Prosječna cijena kvadrata stana u Hrvatskoj u zadnjih godinu dana je {Math.round(avgPriceLastYearData[0].avgprice/avgPriceLastYearData[0].avgarea)} €/m2.</p>
      <p>U prosjeku veličina stana na prodaji u Hrvatskoj je {avgPriceLastYearData[0].avgarea} m2, srednja tražena prodajna cijena iznosi {avgPriceLastYearData[0].avgprice} €</p>
      <p>Prosječna kamatna stopa za stambeni kredit je {avgInterestRates()}%.</p>

      
      <RecentlyAdded data={recentlyAddedData} />
      <CompareMisc data={compareMiscData} />
      <Cities /> */}
      <MortgageCalculator />
    </main>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   // const { db } = await connectToDatabase();
  
//   const avgPriceLastYearData = await db
//     .collection(collection)
//     .aggregate(avgPriceLastYearAgg)
//     .toArray();

//   const hpMainChartData = await db
//     .collection(collection)
//     .aggregate(hpMainChartAgg)
//     .toArray();

//   const recentlyAddedData = await db
//     .collection(collection)
//     .aggregate(recentlyAddedAgg)
//     .toArray();

//   const compareMiscData = await db
//     .collection(collection)
//     .aggregate(compareMiscAgg)
//     .toArray();

//   return {
//     props: {
//       hpMainChartData: JSON.parse(JSON.stringify(hpMainChartData)),
//       avgPriceLastYearData: JSON.parse(JSON.stringify(avgPriceLastYearData)),
//       recentlyAddedData: JSON.parse(JSON.stringify(recentlyAddedData)),      
//       compareMiscData: JSON.parse(JSON.stringify(compareMiscData))      
//     },
//     revalidate: 86400
//   };
// };
