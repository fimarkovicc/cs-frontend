import React from "react"
import { Bar } from "react-chartjs-2"

type ChartProps = {
  data: any;
};

function Chart({ data }: ChartProps) {
    const states = data.map((item: any) => item.state[0])
    const prices = data.map((item: any) => item.price)
    const chartData = {
        labels: states,
        datasets: [
            {
                label: "prosječna cijena €/m2",
                data: prices,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    }
    return <Bar data={chartData} />
}

export default Chart
