import React from "react";
import { Bar } from "react-chartjs-2";

type ChartProps = {
  data: {
    state: [string];
    price: number;
  }[];
};

function Chart({ data }: ChartProps) {
  const labels = data.map((item) => item.state[0]);
  const prices = data.map((item) => Math.round(item.price));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "€/m2",
        data: prices,
      },
    ],
  };
  return <Bar data={chartData} />;
}

export default Chart;
