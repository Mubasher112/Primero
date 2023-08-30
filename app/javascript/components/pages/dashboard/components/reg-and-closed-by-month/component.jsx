import { Grid } from "@material-ui/core";

import { LineChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug"
    ],
    datasets: [
      {
        label: "Registered",
        data: [0, 0, 0, 0, 165, 26, 0, 0, 193, 74, 0, 7], // This will be the total of male, female, and transgender
        maleData: [0, 0, 0, 0, 84, 15, 0, 0, 101, 37, 0, 5],
        femaleData: [0, 0, 0, 0, 81, 11, 0, 0, 92, 37, 0, 2],
        transgenderData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(255, 159, 64)", // Orange
        fill: false
      },
      {
        label: "Closed",
        data: [0, 0, 0, 0, 0, 0, 0, 204, 0, 0, 0, 0], // This will be the total of male, female, and transgender
        maleData: [0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0],
        femaleData: [0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 0, 0],
        transgenderData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(54, 162, 235)", // Blue
        fill: false
      }
    ]
  };

  return (
    <>
      <Grid item xl={6} md={6} xs={12}>
        <h4>Registered and Closed Cases by Month</h4>
        <div style={{ border: "1px solid black" }}>
          <LineChart chartData={chartData} />
        </div>
      </Grid>
    </>
  );
};

Component.displayName = `SampleDoughnutChartComponent`;

export default Component;
