import { aggregationConstants } from './../constants/aggregationConstants'

export const HpMainChartAgg = [
    {
      $match: {
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        price: aggregationConstants.filterValues.price,
        area: aggregationConstants.filterValues.area,
        // price: { $gte: 7000 },
        // area: { $gt: 1 },
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
    {
      $addFields: {
        area: { $round: ["$area"] },
        price: { $round: ["$price"] },
      },
    },
    { $sort: { state: -1 } },
  ];