import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

import PropTypes from "prop-types";
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
        margin: "0 5px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px"
          }}
        >
          <h2
            style={{
              marginRight: "5px",
              fontSize: "30px",
              fontWeight: "bold",
              color: "white"
            }}
          >
            {percentage}%
          </h2>
          <p
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
              margin: 0
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

PercentageTile.displayName = "PercentageTile";

PercentageTile.propTypes = {
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired
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

  const userPermissions = useMemoizedSelector(state => getPermissions(state));
  const loading = useMemoizedSelector(state => getLoading(state, NAMESPACE));
  const errors = useMemoizedSelector(state => getErrors(state, NAMESPACE));
  const loadingFlags = useMemoizedSelector(state => getLoading(state, [NAMESPACE, "flags"]));
  const flagsErrors = useMemoizedSelector(state => getErrors(state, [NAMESPACE, "flags"]));

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

  return (
    <PageContainer>
      <PageHeading title={i18n.t("navigation.home")} />
      <PageContent>
        <OfflineAlert text={i18n.t("messages.dashboard_offline")} />
        {/* Display PercentageTiles */}
        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12}>
            <h4>Registered Cases Vs Services Provided</h4>
          </Grid>
          <Grid item xl={12} md={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
            <PercentageTile label="Physical Violance or Injury" percentage={75} count={3} color="LightCoral" />
            <PercentageTile label="Mental Violance" percentage={50} count={2} color="CornflowerBlue" />
            <PercentageTile label="Neglect and Negligent Treatment" percentage={40} count={4} color="Purple" />
            <PercentageTile label="Exploitation" percentage={90} count={5} color="Orange" />
            <PercentageTile
              label="Sexual Abuse and Sexual Exploitation"
              percentage={60}
              count={1}
              color="MediumSeaGreen"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12}>
            <h4>Percentage of Children who received Child Protection Services</h4>
          </Grid>
          <Grid item xl={12} md={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
            <PercentageTile label="Physical Violance or Injury" percentage={75} count={3} color="LightCoral" />
            <PercentageTile label="Mental Violance" percentage={50} count={2} color="CornflowerBlue" />
            <PercentageTile label="Neglect and Negligent Treatment" percentage={40} count={4} color="Purple" />
            <PercentageTile label="Exploitation" percentage={90} count={5} color="Orange" />
            <PercentageTile
              label="Sexual Abuse and Sexual Exploitation"
              percentage={60}
              count={1}
              color="MediumSeaGreen"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xl={9} md={8} xs={12}>
            <Overview loadingIndicator={indicatorProps} userPermissions={userPermissions} />
            <WorkflowIndividualCases loadingIndicator={indicatorProps} />
            <CasesToAssign loadingIndicator={indicatorProps} />
            <Approvals loadingIndicator={indicatorProps} />
            <SharedFromMyTeam loadingIndicator={indicatorProps} />
            <SharedWithMyTeam loadingIndicator={indicatorProps} />
            <OverdueTasks loadingIndicator={indicatorProps} />
            <CasesBySocialWorker loadingIndicator={indicatorProps} />
            <WorkflowTeamCases loadingIndicator={indicatorProps} />
            <ReportingLocation loadingIndicator={indicatorProps} />
            <ProtectionConcern loadingIndicator={indicatorProps} />
            <ViolationsCategoryVerificationStatus loadingIndicator={indicatorProps} />
            <ViolationsCategoryRegion loadingIndicator={indicatorProps} />
            <PerpetratorArmedForceGroupPartyNames loadingIndicator={indicatorProps} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <Flags loadingIndicator={flagsIndicators} />
          </Grid>
        </Grid>
      </PageContent>
    </PageContainer>
  );
};

Dashboard.displayName = NAME;

export default Dashboard;
