import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata';


export interface ChartProps {
    data: number[]
    onDrag: () => any
}
 
const Chart: React.SFC<ChartProps> = (props) => {
  const { data, onDrag } = props;

  const options = {
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    scaleBeginAtZero: true,
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        gridLines: { display: false },
      }],
      yAxes: [{
        ticks: {
          display: false,
          min: -100,
          max: 100,
          scaleSteps: 1,
        },
        gridLines: {
          display: false,
        },
      }],
    },
    legend:{
      display: false
    },
    dragData: true,
    onDragStart: function (e: any, datasetIndex: any, index: number, value: number) {
      if (datasetIndex._index === 4) {
        return false;
      }
    },
    onDrag,
    hover: {
      onHover: function(e: any) {
        // @ts-ignore
        const point = this.getElementAtEvent(e)
        if (point.length) e.target.style.cursor = 'grab'
        else e.target.style.cursor = 'default'
      },
    },
  };

  const chartData = {
    labels: ['', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: 'black',
        borderColor: 'black',
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'black',
        pointHoverBorderColor: 'black',
        pointRadius: 5,
        pointHitRadius: 5,
        data,
      }
    ]
  };
  return (
    <Line
      height={100}
      data={chartData}
      options={options}
    />
  );
}
 
export default Chart;