import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: ["Physical", "Exploitation", "Neglect", "Abuse", "Mental", "Other"],
    datasets: [
      {
        label: "Male",
        data: [115, 15, 131, 13, 68, 0], // Add your actual data here
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [103, 6, 81, 23, 125, 0], // Add your actual data here
        backgroundColor: "pink",
        borderColor: "pink",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [0, 0, 0, 0, 0, 0], // Add your actual data here
        backgroundColor: "yellow",
        borderColor: "yellow",
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.6, // Adjust as per your requirement
          categoryPercentage: 0.5, // Adjust as per your requirement
          scaleLabel: {
            display: true,
            labelString: "Types of Cases"
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
            display: true,
            labelString: "No of cases"
          }
        }
      ]
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <h4>Registered cases by Protection Concern</h4>
      <div style={{ border: "1px solid black" }}>
        <StackedBarChart chartData={chartData} options={options} />
      </div>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
