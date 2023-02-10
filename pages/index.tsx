import { connectToDatabase } from "src/utils/mongodb"
import { GetStaticProps } from "next"
import { avgPriceLastYearAgg, hpMainChartAgg, recentlyAddedAgg, compareMiscAgg } from "./../src/aggregations/index"
import RecentlyAdded from "@global/components/RecentlyAdded/RecentlyAdded"
import CompareMisc from "src/components/CompareMisc"
import Cities from "@global/components/Cities/Cities"
import MortgageCalculator from "@global/components/MortgageCalculator/MortgageCalculator"
import MortgageFaq from "src/components/MortgageFaq/MortgageFaq"
import BarChart from "src/components/BarChart/BarChart"
import ContentMainBanner from "@global/components/ContentMainBanner/ContentMainBanner"
import ContentPlainText from "@global/components/ContentPlainText/ContentPlainText"
import Head from "next/head"

const collection = process.env.COLLECTION
const faq = process.env.COLLECTION_FAQ

type HomeProps = {
  hpMainChartData: {
    state: string[];
    price: number;
    _id: string;
    count: number;
  }[],
  avgPriceLastYearData: any,
  recentlyAddedData: any,
  compareMiscData: any,
  faqData: {
    title: string;
    text: string;
  }[],
  constants: {
    mortgageInterestRate: number;
  }[]
};

export default function HomePage(props: HomeProps) {
    const { hpMainChartData, avgPriceLastYearData, recentlyAddedData, compareMiscData, faqData, constants } = props

    const barChartDataPrice = hpMainChartData
        .filter(item => item._id != "istarska" && item._id != "medimurje")
        .map(item => {
            return {
                name: item.state[item.state.length-1],
                value: Math.round(item.price),
                id: item._id,
                count: item.count
            }
        })

    return (
        <div className="container">
            <Head>
                <title>Cijene stanova - početna</title>
                <meta name="description" content="Cijene stanova u Hrvatskoj" />
            </Head>
            <ContentMainBanner />

            <h2>Pregled po županijama</h2>
            <h3>Prosječna cijena kvadrata (€/m<sup>2</sup>)</h3>

            <BarChart data={barChartDataPrice} avgBarPrice={Math.round(avgPriceLastYearData[0].avgprice / avgPriceLastYearData[0].avgarea)} colorize={true} />
            <ContentPlainText interest={constants[0].mortgageInterestRate} barChartDataPrice={barChartDataPrice} avgPriceLastYearData={avgPriceLastYearData} />

            <div className="container component-container-2">
                <CompareMisc data={compareMiscData} />
                <RecentlyAdded data={recentlyAddedData} />
            </div>
            <MortgageCalculator interest={constants[0].mortgageInterestRate} />
            <Cities />
            <MortgageFaq data={faqData}/>
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

    const faqData = await db
        .collection(faq)
        .find({})
        .toArray()

    const constants = await db
        .collection("constants")
        .find({})
        .toArray()

    return {
        props: {
            hpMainChartData: JSON.parse(JSON.stringify(hpMainChartData)),
            avgPriceLastYearData: JSON.parse(JSON.stringify(avgPriceLastYearData)),
            recentlyAddedData: JSON.parse(JSON.stringify(recentlyAddedData)),
            compareMiscData: JSON.parse(JSON.stringify(compareMiscData)),
            faqData: JSON.parse(JSON.stringify(faqData)),
            constants: JSON.parse(JSON.stringify(constants))
        },
        revalidate: 86400
    }
}
