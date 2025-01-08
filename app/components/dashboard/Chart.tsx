import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const Chart = () => {
  // X - axis lable
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

  // Data want to show on chart
  const datasets = [12, 45, 67, 43, 89, 34, 67, 43];

  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "Data Penjualan",
        data: datasets,
        fill: false,
        borderColor: "#F26B0F",
        tension: 0.1,
      },
      // insert similar in dataset object for making multi line chart
    ],
  };

  // To make configuration
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Jumlah",
        },
        display: true,
        min: 10,
      },
      x: {
        title: {
          display: true,
          text: "Bulan",
        },
        display: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;