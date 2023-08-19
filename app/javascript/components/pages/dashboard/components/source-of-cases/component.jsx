import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [
      "Helpline",
      "Police",
      "KPCPWC-CPU's",
      "Walk-in",
      "Social Media",
      "Other",
      "Pakistan Citizen Portal",
      "Referred by District CP",
      "Referred by CP",
      "Other Provinces",
      "Newspaper",
      "Child Protection Court",
      "District Vigilance",
      "Other CPU",
      "Other Districts"
    ],
    datasets: [
      {
        label: "Number of Cases",
        data: [75, 65, 60, 45, 25, 20, 12, 12, 12, 10, 10, 5, 5, 4, 3],
        backgroundColor: "rgba(0, 0, 139, 1)", // This is the RGB value for dark blue
        borderColor: "rgba(0, 0, 139, 1)",
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
            labelString: "Sources"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 10
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
    <Grid container spacing={3}>
      <Grid item xl={12} md={12} xs={12}>
        <h4>Source of Cases</h4>
        <div style={{ border: "1px solid black" }}>
          <StackedBarChart chartData={chartData} options={options} />
        </div>
      </Grid>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
