import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [
      "Monitory",
      "CwD",
      "BISP",
      "Orphan",
      "Afghan",
      "Legal Aid",
      "Guardianship",
      "Other Provinces"
    ],
    datasets: [
      {
        label: "Male",
        data: [343, 32, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(0, 128, 0, 1)", // Green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [346, 14, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 182, 193, 1)", // Pink
        borderColor: "rgba(255, 182, 193, 1)",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
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
            labelString: "Case Types"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 20 // Setting the gap to 20
          },
          scaleLabel: {
            display: true,
            labelString: "No of Cases"
          }
        }
      ]
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <Grid container spacing={3}>
        <Grid item xl={12} md={12} xs={12}>
          <h4>Cases Requiring Special Consideration</h4>
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
