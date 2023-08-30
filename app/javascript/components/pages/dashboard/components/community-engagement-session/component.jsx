import { Grid } from "@material-ui/core";

import { DoughnutChart } from "../../../../charts";

const Component = () => {
  const doughnutData = {
    labels: ["Total Members", "Male", "Female", "Boys", "Girls"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["blue", "green", "#FF1493", "#90EE90", "#FFB6C1"]
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
        <h4>Community Engagement Sessions</h4>
        <div style={{ border: "1px solid black" }}>
          <DoughnutChart chartData={doughnutData} options={doughnutOptions} />
        </div>
      </Grid>
    </>
  );
};

Component.displayName = `DoughnutChart`;

export default Component;
