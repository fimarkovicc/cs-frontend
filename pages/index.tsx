import { connectToDatabase } from "src/utils/mongodb"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { avgPriceLastYearAgg, hpMainChartAgg, recentlyAddedAgg, compareMiscAgg } from "./../src/aggregations/index"
import RecentlyAdded from "src/components/RecentlyAdded"
import CompareMisc from "src/components/CompareMisc"
import Cities from "src/components/Cities"
import avgInterestRates from "src/constants/interstRates"
import MortgageCalculator from "src/components/MortgageCalculator"
import MortgageFaq from "src/components/MortgageFaq/MortgageFaq"
import BarChart from "src/components/BarChart/BarChart"
import ContentMainBanner from "@global/components/ContentMainBanner/ContentMainBanner"

const collection = process.env.COLLECTION

type HomeProps = {
  hpMainChartData: {
    state: string[];
    price: number;
    _id: string;
    count: number;
  }[],
  avgPriceLastYearData: any,
  recentlyAddedData: any,
  compareMiscData: any
};

export default function HomePage(props: HomeProps) {
    const { hpMainChartData, avgPriceLastYearData, recentlyAddedData, compareMiscData } = props
    const router = useRouter()

    const barChartDataPrice = hpMainChartData.map(item => {
        return {
            name: item.state[item.state.length-1],
            value: Math.round(item.price),
            id: item._id,
            count: item.count
        }
    })

    return (
        <div className="container">
            <ContentMainBanner />

            <h2>Pregled po županijama</h2>

            <BarChart data={barChartDataPrice} avgBarPrice={Math.round(avgPriceLastYearData[0].avgprice / avgPriceLastYearData[0].avgarea)} colorize={true} />

            <h2>Ukratko</h2>
            <p>Prosječna cijena kvadrata stana u Hrvatskoj u zadnjih godinu dana je {Math.round(avgPriceLastYearData[0].avgprice / avgPriceLastYearData[0].avgarea)} €/m2.</p>
            <p>U prosjeku veličina stana na prodaji u Hrvatskoj je {avgPriceLastYearData[0].avgarea} m2, srednja tražena prodajna cijena iznosi {avgPriceLastYearData[0].avgprice} €</p>
            <p>Prosječna kamatna stopa za stambeni kredit je {avgInterestRates()}%.</p>

            <RecentlyAdded data={recentlyAddedData} />
            <CompareMisc data={compareMiscData} />
            <Cities />
            <MortgageCalculator />
            <MortgageFaq />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { db } = await connectToDatabase()

    const avgPriceLastYearData = await db
        .collection(collection)
        .aggregate(avgPriceLastYearAgg)
        .toArray()

    const hpMainChartData = await db
        .collection(collection)
        .aggregate(hpMainChartAgg)
        .toArray()

    const recentlyAddedData = await db
        .collection(collection)
        .aggregate(recentlyAddedAgg)
        .toArray()

    const compareMiscData = await db
        .collection(collection)
        .aggregate(compareMiscAgg)
        .toArray()

    return {
        props: {
            hpMainChartData: JSON.parse(JSON.stringify(hpMainChartData)),
            avgPriceLastYearData: JSON.parse(JSON.stringify(avgPriceLastYearData)),
            recentlyAddedData: JSON.parse(JSON.stringify(recentlyAddedData)),
            compareMiscData: JSON.parse(JSON.stringify(compareMiscData))
        },
        revalidate: 86400
    }
}
