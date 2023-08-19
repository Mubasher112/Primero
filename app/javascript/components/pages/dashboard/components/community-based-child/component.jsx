import { Grid } from "@material-ui/core";

import { DoughnutChart } from "../../../../charts";

const Component = () => {
  const doughnutData = {
    labels: ["Female Committees", "Female Committees", "Total Committees"],
    datasets: [
      {
        data: [36, 48, 84],
        backgroundColor: ["pink", "green", "blue"]
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
            <h4>Community Based Child Protection Committees</h4>
            <div style={{ border: "1px solid black" }}>
              <DoughnutChart chartData={doughnutData} options={doughnutOptions} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Component.displayName = `SampleDoughnutChartComponent`;

export default Component;
