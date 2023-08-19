import { Grid } from "@material-ui/core";

import { DoughnutChart } from "../../../../charts";

const Component = () => {
  const doughnutData = {
    labels: ["Emergency Protection Order", "Other Court Orders"],
    datasets: [
      {
        data: [45, 4],
        backgroundColor: ["blue", "red"]
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
            <h4>Custody by Court Order</h4>
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
