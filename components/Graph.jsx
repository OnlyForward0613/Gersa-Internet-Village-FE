import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { theme } from "../tailwind.config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ sales }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  // const sales = [];

  const getFill = (ctx, chartArea, scales) => {
    const gradientBg = ctx.createLinearGradient(
      chartArea.left,
      0,
      chartArea.right,
      0
    );
    gradientBg.addColorStop(0, theme.extend.colors.pwinfo[100]);
    // gradientBg.addColorStop(0, "#44356");
    // gradientBg.addColorStop(1, "#22abab");
    return gradientBg;
  };

  const data = {
    // labels: [...months],
    labels: [],
    datasets: [
      {
        label: "Sales",
        fill: true,
        // data: sales.map((s) => {
        //   return s;
        // }),
        data: sales,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => {
      //     return faker.datatype.number(100);
      //   }),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   fill: true,
      //   tension: 0.2,
      // },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Graph;
