import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: ["Registered", "Pakistani", "Other Nationality", "High", "Medium", "Low", "Closed cases", "Assigned to me"],
    datasets: [
      {
        label: "Cases",
        data: [93, 75, 18, 32, 28, 33, 85, 146],
        backgroundColor: [
          "Blue", // Registered
          "Green", // Pakistani
          "Orange", // Other Nationality
          "#ED4E17", // High
          "Yellow", // Medium
          "#6EF6FE", // Low
          "#A5A5A5", // Closed cases
          "#A73621" // Assigned to me
        ],
        borderColor: [
          "Blue",
          "Green",
          "Orange",
          "#ED4E17",
          "Yellow", // Black border for Medium for better visibility
          "#6EF6FE",
          "#A5A5A5",
          "#A73621"
        ],
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
            labelString: "Cases Status"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 20 // setting gap of 20
          },
          scaleLabel: {
            display: true,
            labelString: "No of cases"
          }
        }
      ]
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <Grid container spacing={3}>
        <Grid item xl={12} md={12} xs={12}>
          <h4>Cases at a Glance</h4>
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
