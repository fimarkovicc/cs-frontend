export const recentlyAddedAgg = [
  {
    $match: {
      date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lte: new Date(new Date().setDate(new Date().getDate())),
      },
    },
  },
  { $limit: 10 },
];
