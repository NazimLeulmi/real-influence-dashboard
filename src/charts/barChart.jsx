import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import UploadsData from "../data/uploads";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  maintainAspectRatio: false,
};

export const data = {
  labels: UploadsData.map((item) => item.month),
  datasets: [
    {
      label: "Monthly Likes",
      data: UploadsData.map((item) => item.likes),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function BarChart() {
  return <Bar options={options} data={data} />;
}

export default BarChart;
