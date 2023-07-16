import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";

import { useI18n } from "../../i18n";
import PageContainer, { PageHeading, PageContent } from "../../page";
import { getPermissions } from "../../user/selectors";
import { getLoading, getErrors } from "../../index-table";
import { OfflineAlert } from "../../disable-offline";
import { usePermissions, ACTIONS, RESOURCES } from "../../permissions";
import { RECORD_PATH } from "../../../config";
import { useMemoizedSelector } from "../../../libs";
import {
  Approvals,
  CasesBySocialWorker,
  CasesToAssign,
  Flags,
  OverdueTasks,
  Overview,
  PerpetratorArmedForceGroupPartyNames,
  ProtectionConcern,
  ReportingLocation,
  SharedFromMyTeam,
  SharedWithMyTeam,
  ViolationsCategoryRegion,
  ViolationsCategoryVerificationStatus,
  WorkflowIndividualCases,
  WorkflowTeamCases
} from "./components";
import NAMESPACE from "./namespace";
import { NAME } from "./constants";
import { fetchDashboards, fetchFlags } from "./action-creators";

// Custom PercentageTile component
const PercentageTile = ({ label, percentage, count, color }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        textAlign: "center",
        backgroundColor: color,
        flex: "1",
        margin: "0 5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <h2
            style={{
              marginRight: "5px",
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {percentage}%
          </h2>
          <p
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            ({count})
          </p>
        </div>
        <p style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: "bold" }}>{label}</p>
      </div>
    </div>
  );
};



const Dashboard = () => {
  const i18n = useI18n();
  const dispatch = useDispatch();
  const canFetchFlags = usePermissions(RESOURCES.dashboards, [ACTIONS.DASH_FLAGS]);

  useEffect(() => {
    dispatch(fetchDashboards());

    if (canFetchFlags) {
      dispatch(fetchFlags(RECORD_PATH.cases, true));
    }
  }, []);

  const userPermissions = useMemoizedSelector((state) => getPermissions(state));
  const loading = useMemoizedSelector((state) => getLoading(state, NAMESPACE));
  const errors = useMemoizedSelector((state) => getErrors(state, NAMESPACE));
  const loadingFlags = useMemoizedSelector((state) => getLoading(state, [NAMESPACE, "flags"]));
  const flagsErrors = useMemoizedSelector((state) => getErrors(state, [NAMESPACE, "flags"]));

  const indicatorProps = {
    overlay: true,
    type: NAMESPACE,
    loading,
    errors
  };

  const flagsIndicators = {
    overlay: true,
    type: NAMESPACE,
    loading: loadingFlags,
    errors: flagsErrors
  };

  // Chart data and options
  const [barChartData, setBarChartData] = useState({
    labels: ['Quetta', 'Khuzdar', 'Chaman', 'Gawadar', 'Zhob'],
    datasets: [
      {
        label: 'No of Cases',
        data: [10, 2, 3, 5, 1],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  });

  const [closedCasesByAgeChartData, setClosedCasesByAgeChartData] = useState({
    labels: ['Age (Years)'],
    datasets: [
      {
        label: 'Exploitation',
        data: [0],
        backgroundColor: 'LightCoral',
        borderColor: 'LightCoral',
        borderWidth: 1,
      },
      {
        label: 'Mental Violence',
        data: [0],
        backgroundColor: 'Orange',
        borderColor: 'Orange',
        borderWidth: 1,
      },
      {
        label: 'Neglect And Negligent Treatment',
        data: [0],
        backgroundColor: 'SeaGreen',
        borderColor: 'SeaGreen',
        borderWidth: 1,
      },
      {
        label: 'Physical Violence or Injury',
        data: [0],
        backgroundColor: 'CornflowerBlue',
        borderColor: 'CornflowerBlue',
        borderWidth: 1,
      },
      {
        label: 'Sexual Abuse and Exploitation',
        data: [0],
        backgroundColor: 'Purple',
        borderColor: 'Purple',
        borderWidth: 1,
      },
    ],
  });

  const [closedCasesBySexChartData, setClosedCasesBySexChartData] = useState({
    datasets: [
      {
        label: 'Male',
        data: [5],
        backgroundColor: 'CornflowerBlue',
        borderColor: 'CornflowerBlue',
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: [2],
        backgroundColor: 'LightCoral',
        borderColor: 'LightCoral',
        borderWidth: 1,
      },
      {
        label: 'Transgender',
        data: [0],
        backgroundColor: 'Orange',
        borderColor: 'Orange',
        borderWidth: 1,
      }
    ],
    labels: [
      'Physical Violence or Injury',
      'Mental Violence', 
      'Neglect And Negligent Treatment',
      'Exploitation',
      'Sexual Abuse and Exploitation'
    ],
  });


  const [casesAtGlanceData, setCasesAtGlanceData] = useState({
    labels: ['Registerd (Open)', 'Significant Harm (Total)', 'Closed', 'Assigned to Me'],
    datasets: [
      {
        label: 'Cases Status',
        data: [300, 10, 0, 300],
        backgroundColor: ['CornflowerBlue','LightCoral', 'Purple', 'Orange'],
        borderColor: ['CornflowerBlue','LightCoral', 'Purple', 'Orange'],
        borderWidth: 1,
      },
    ],
  });

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  const [lineChartData, setLineChartData] = useState({
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Closed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'transparent',
        borderColor: 'CornflowerBlue',
        borderWidth: 1,
      },
      {
        label: 'Registered',
        data: [0, 0, 0, 90, 0, 70, 0, 0, 0],
        backgroundColor: 'transparent',
        borderColor: 'Orange',
        borderWidth: 1,
      },
    ],
  });

  const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [significantHarmChartData, setSignificantHarmChartData] = useState({
    labels: ['Physical', 'Mental', 'Neglect', 'Exploitation', 'Sexual Abuse'],
    datasets: [
      {
        label: 'Significant Harm Data',
        data: [0, 60, 40, 0, 0],
        backgroundColor: ['LightCoral', 'CornflowerBlue','Orange', 'Purple', 'Brown'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  const [casesWithCourtOrdersChartData, setCasesWithCoourtOrdersChartData] = useState({
    labels: ['Supervision', 'Custody and Replacement', 'Interim', 'Seek and Find'],
    datasets: [
      {
        label: 'Cases With Court OrdersData',
        data: [0, 0, 100, 0, 0],
        backgroundColor: ['LightCoral', 'CornflowerBlue','Orange', 'Purple'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  const [casesRequiringChartData, setCasesRequiringChartData] = useState({
    labels: ['Male', 'Female', 'Transgender'],
    datasets: [
      {
        label: 'Cases Requiring Alternatie Data',
        data: [50, 50, 0,],
        backgroundColor: ['CornflowerBlue', 'LightCoral','Orange'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Doughnut Data',
        data: [10, 20, 30, 40, 50],
        backgroundColor: ['LightCoral', 'CornflowerBlue', 'Purple', 'Orange', 'MediumSeaGreen'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  const doughnutChartOptions = {
    responsive: true,
  };

  const [casesRequiringSpecialConsiderationChartData, setCasesRequiringSpecialConsiderationChartDataChartData] = useState({
    labels: ['Minority Cases', 'CwD Cases', 'Cases with BISP Benif'],
    datasets: [
      {
        label: 'Pie Data',
        data: [8, 80, 12],
        backgroundColor: ['LightCoral', 'CornflowerBlue','Orange'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  const [staffBySexChartData, setStaffBySexChartData] = useState({
    labels: ['Male', 'Female', 'Transgender'],
    datasets: [
      {
        label: 'Pie Data',
        data: [100, 0, 0],
        backgroundColor: ['LightCoral', 'CornflowerBlue', 'Orange'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });
  
  const pieChartOptions = {
    responsive: true,
  };

  return (
    <PageContainer>
      <PageHeading title={i18n.t("navigation.home")} />
      <PageContent>
        <OfflineAlert text={i18n.t("messages.dashboard_offline")} />
        {/* Display PercentageTiles */}
        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
            <PercentageTile label="Physical Violance or Injury" percentage={75} count={3} color="LightCoral" />
            <PercentageTile label="Mental Violance" percentage={50} count={2} color="CornflowerBlue" />
            <PercentageTile label="Neglect and Negligent Treatment" percentage={40} count={4} color="Purple" />
            <PercentageTile label="Exploitation" percentage={90} count={5} color="Orange" />
            <PercentageTile label="Sexual Abuse and Sexual Exploitation" percentage={60} count={1} color="MediumSeaGreen" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                {/* Add the bar chart component with border */}
                <h4>Cases at a Glance</h4>
                <div style={{ border: "1px solid black" }}>
                  <Bar data={casesAtGlanceData} options={barChartOptions} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            {/* Add the line chart component with border */}
            <h4>Registered and Closed Cases by Month</h4>
            <div style={{ border: "1px solid black" }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                {/* Add the doughnut chart component with border */}
                <h4>Significant Harm Cases by Protection Concern</h4>
                <div style={{ border: "1px solid black" }}>
                  <Doughnut data={significantHarmChartData} options={doughnutChartOptions} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            {/* Add the bar chart component with border */}
            <h4>Case Referrals (by Department)</h4>
            <div style={{ border: "1px solid black" }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                {/* Add the doughnut chart component with border */}
                <h4>Cases Requiring Alternative Care Placement</h4>
                <div style={{ border: "1px solid black" }}>
                  <Doughnut data={casesRequiringChartData} options={doughnutChartOptions} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            {/* Add the doughnut chart component with border */}
            <h4>Cases with Court Orders</h4>
            <div style={{ border: "1px solid black" }}>
              <Doughnut data={casesWithCourtOrdersChartData} options={doughnutChartOptions} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                {/* Add the doughnut chart component with border */}
                <h4>Closed Cases by Sex and Potection Concern</h4>
                <div style={{ border: "1px solid black" }}>
                  <Bar data={closedCasesBySexChartData} options={barChartOptions} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            {/* Add the pie chart component with border */}
            <h4>Cases Requiring Special Consideration</h4>
            <div style={{ border: "1px solid black" }}>
              <Pie data={casesRequiringSpecialConsiderationChartData} options={pieChartOptions} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                {/* Add the doughnut chart component with border */}
                <h4>Staff By Sex</h4>
                <div style={{ border: "1px solid black" }}>
                  <Pie data={staffBySexChartData} options={pieChartOptions} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            {/* Add the pie chart component with border */}
            <h4>District wise social service workforce</h4>
            <div style={{ border: "1px solid black" }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12}>
            {/* Add the bar chart component with border */}
            <h4>Closed Cases by Age and Protection Concern</h4>
            <div style={{ border: "1px solid black" }}>
              <Bar data={closedCasesByAgeChartData} options={barChartOptions} />
            </div>
          </Grid>
        </Grid>
        
        <Grid container spacing={3}>
          <Grid item xl={9} md={8} xs={12}>
            <Overview loadingIndicator={indicatorProps} userPermissions={userPermissions} />
            <WorkflowIndividualCases loadingIndicator={indicatorProps} />
            <CasesToAssign loadingIndicator={indicatorProps} />
            <SharedFromMyTeam loadingIndicator={indicatorProps} />
            <SharedWithMyTeam loadingIndicator={indicatorProps} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <Approvals loadingIndicator={indicatorProps} />
            <OverdueTasks loadingIndicator={indicatorProps} />
            <Flags loadingIndicator={flagsIndicators} canFetchFlags={canFetchFlags} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <ReportingLocation loadingIndicator={indicatorProps} />
            <ProtectionConcern loadingIndicator={indicatorProps} />
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            <ViolationsCategoryVerificationStatus loadingIndicator={indicatorProps} />
            <ViolationsCategoryRegion loadingIndicator={indicatorProps} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <CasesBySocialWorker loadingIndicator={indicatorProps} />
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            <PerpetratorArmedForceGroupPartyNames loadingIndicator={indicatorProps} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={6} md={6} xs={12}>
            <WorkflowTeamCases loadingIndicator={indicatorProps} />
          </Grid>
        </Grid>
      </PageContent>
    </PageContainer>
  );
};

export default Dashboard;
