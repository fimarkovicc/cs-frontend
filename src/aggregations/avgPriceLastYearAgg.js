import { aggregationConstants } from "@constants/aggregationConstants"

export const avgPriceLastYearAgg = [
    {
        $match: {
            date: {
                $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            },
            price: aggregationConstants.filterValues.price,
            area: aggregationConstants.filterValues.area
        },
    },
    {
        $group: {
            _id: null,
            avgprice: {
                $avg: "$price"
            },
            avgarea: {
                $avg: "$area"
            },
        },
    },
    {
        $addFields: {
            avgprice: {
                $round: ["$avgprice"]
            },
            avgarea: {
                $round: ["$avgarea"]
            },
        },
    }
]