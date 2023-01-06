import { connectToDatabase } from "src/utils/mongodb"
import { GetStaticProps } from "next"
import { avgPriceLastYearAgg, hpMainChartAgg, recentlyAddedAgg, compareMiscAgg } from "./../src/aggregations/index"
import RecentlyAdded from "@global/components/RecentlyAdded/RecentlyAdded"
import CompareMisc from "src/components/CompareMisc"
import Cities from "@global/components/Cities/Cities"
import avgInterestRates from "src/constants/interstRates"
import MortgageCalculator from "@global/components/MortgageCalculator/MortgageCalculator"
import MortgageFaq from "src/components/MortgageFaq/MortgageFaq"
import BarChart from "src/components/BarChart/BarChart"
import ContentMainBanner from "@global/components/ContentMainBanner/ContentMainBanner"
import ContentPlainText from "@global/components/ContentPlainText/ContentPlainText"

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
            <h3>Prosječna cijena kvadrata (€/m<sup>2</sup>)</h3>

            <BarChart data={barChartDataPrice} avgBarPrice={Math.round(avgPriceLastYearData[0].avgprice / avgPriceLastYearData[0].avgarea)} colorize={true} />
            <ContentPlainText barChartDataPrice={barChartDataPrice} avgPriceLastYearData={avgPriceLastYearData} avgInterestRates={avgInterestRates} />

            <div className="container component-container-2">
                <CompareMisc data={compareMiscData} />
                <RecentlyAdded data={recentlyAddedData} />
            </div>
            <MortgageCalculator />
            <Cities />
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
