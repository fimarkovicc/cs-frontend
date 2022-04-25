export const avgPriceLastYearAgg = [
    {
      $match: {
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        price: {
          $gte: 7000,
        },
        area: {
          $gt: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgprice: {
          $avg: "$price",
        },
        avgarea: {
          $avg: "$area",
        },
      },
    },
    {
      $addFields: {
        avgprice: {
          $round: ["$avgprice"],
        },
        avgarea: {
          $round: ["$avgarea"],
        },
      },
    },
  ];