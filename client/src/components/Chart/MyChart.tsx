import "./App.css";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";

export default function MyChart( { chartData, chartOptions } ) {
  return (
    <>
      <div>
        <Chart type="line" data={chartData} options={chartOptions}/>
      </div>
    </>
  );
}
