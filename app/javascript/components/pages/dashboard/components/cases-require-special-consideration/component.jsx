import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [
      "Monitory cases",
      "CwD cases",
      "Cases with BISP Benif.",
      "Orphan cases",
      "Afghan refugees",
      "Legal Aid(Child & juvenile)",
      "Guardianship Awarded",
      "Other Province cases"
    ],
    datasets: [
      {
        label: "Male",
        data: [59, 14, 25, 15, 10, 10, 9, 45],
        backgroundColor: "rgba(0, 128, 0, 1)", // Green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [40, 10, 20, 12, 8, 9, 8, 40],
        backgroundColor: "rgba(255, 182, 193, 1)", // Pink
        borderColor: "rgba(255, 182, 193, 1)",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [10, 8, 9, 8, 1, 1, 1, 12],
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
