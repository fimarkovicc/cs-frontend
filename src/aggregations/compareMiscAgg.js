import { aggregationConstants } from "@constants/aggregationConstants"

export const compareMiscAgg = [
    {
        $match: {
            date: {
                $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            },
            price: aggregationConstants.filterValues.price,
            area: aggregationConstants.filterValues.area,
        },
    },
    {
        $group: {
            _id: "$city_slug",
            city: { $addToSet: "$city" },
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
    {
        $sort: {
            price: -1
        }
    }
]