import { Grid } from "@material-ui/core";

import { DoughnutChart } from "../../../../charts";

const Component = () => {
  const doughnutData = {
    labels: ["Physical", "Exploitation", "Other", "Abuse", "Mental", "Neglect"],
    datasets: [
      {
        data: [20, 0, 0, 0, 35, 45],
        backgroundColor: ["blue", "orange", "gray", "yellow", "lightblue", "green"]
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    legend: {
      position: "top"
    }
  };

  return (
    <>
      <Grid item xl={6} md={6} xs={12}>
        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12}>
            <h4>Significant Harm Cases by Protection Concern</h4>
            <div style={{ border: "1px solid black" }}>
              <DoughnutChart chartData={doughnutData} options={doughnutOptions} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Component.displayName = `DoughnutChart`;

export default Component;
