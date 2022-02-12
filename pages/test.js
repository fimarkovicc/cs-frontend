
import { connectToDatabase } from "./../utils/mongodb";
// import {reducer} from './../utils/reducer'

export default function Test({data}){
    
   console.log(data)
    return (
        <div>
        <h1>test page</h1>
        </div>
    )
}

export const getStaticProps = async (context) => {

    const { db } = await connectToDatabase();
  
    const aggregation = [
      {
        $match: {
          date: {
            $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          },
          price: { $gte: 7000 },
          state_slug: 'primorsko-goranska'
        },
      },
  
      {
        $group: {
          _id: "$neighbourhood_slug",
          state: { $addToSet: "$neighbourhood_slug" },
          area: { $avg: "$area" },
          price: { $avg: { $divide: ["$price", "$area"] } },
        },
      },
  
      { $sort: { _id: 1 } },
    ];

    const data = await db
    .collection("stanovi_njuskalo")
    .aggregate(aggregation)
    .toArray();
  
    return {
      props: {
        data
        // data: JSON.parse(JSON.stringify(data))
      }
    };
  };