import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: ["Physical", "Exploitation", "Neglect", "Abuse", "Mental", "Other"],
    datasets: [
      {
        label: "Male",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(0, 128, 0, 1)", // Green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 182, 193, 1)", // Pink
        borderColor: "rgba(255, 182, 193, 1)",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 255, 0, 1)", // Yellow
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
          scaleLabel: {
            display: true,
            labelString: "Departments"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 5 // Setting the gap to 5
          },
          scaleLabel: {
            display: true,
            labelString: "No of Services"
          }
        }
      ]
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <h4>Police Cases by Type</h4>
      <div style={{ border: "1px solid black" }}>
        <StackedBarChart chartData={chartData} options={options} />
      </div>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
