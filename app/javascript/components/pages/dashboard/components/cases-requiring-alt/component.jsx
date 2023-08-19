import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: ["Pakistani", "Afghani", "Irani"],
    datasets: [
      {
        label: "Male",
        data: [14, 4, 2],
        backgroundColor: "rgba(0, 128, 0, 1)", // green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [10, 6, 3],
        backgroundColor: "rgba(255, 105, 180, 1)", // pink
        borderColor: "rgba(255, 105, 180, 1)",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [2, 1, 1],
        backgroundColor: "rgba(255, 255, 0, 1)", // yellow
        borderColor: "rgba(255, 255, 0, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.6,
          scaleLabel: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 5
          },
          scaleLabel: {
            display: false
          }
        }
      ]
    },
    legend: {
      position: "top",
      labels: {
        usePointStyle: true
      }
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <Grid container spacing={3}>
        <Grid item xl={12} md={12} xs={12}>
          <h4>Cases requiring Alternative Care Placement Services</h4>
          <div style={{ border: "1px solid black" }}>
            <StackedBarChart chartData={chartData} options={options} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
