import { aggregationConstants } from "../constants/aggregationConstants";

export const recentlyAddedAgg = [
  {
    $match: {
      date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 10)),
        $lte: new Date(new Date().setDate(new Date().getDate())),
      },
      price: aggregationConstants.filterValues.price,
      area: aggregationConstants.filterValues.area,
    }
  },
  { $limit: 30 }
];
