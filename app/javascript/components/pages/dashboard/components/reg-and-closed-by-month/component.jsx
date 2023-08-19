import { Grid } from "@material-ui/core";

import { LineChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Registered",
        data: [30, 40, 35, 45, 50], // This will be the total of male, female, and transgender
        maleData: [10, 15, 10, 20, 15],
        femaleData: [10, 15, 15, 10, 20],
        transgenderData: [10, 10, 10, 15, 15],
        borderColor: "rgb(255, 159, 64)", // Orange
        fill: false
      },
      {
        label: "Closed",
        data: [20, 30, 25, 30, 40], // This will be the total of male, female, and transgender
        maleData: [5, 10, 10, 10, 15],
        femaleData: [10, 15, 10, 10, 15],
        transgenderData: [5, 5, 5, 10, 10],
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
