import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

import { useI18n } from "../../i18n";
import PageContainer, { PageHeading, PageContent } from "../../page";
import { getPermissions } from "../../user/selectors";
import { getLoading, getErrors } from "../../index-table";
import { OfflineAlert } from "../../disable-offline";
import { usePermissions, ACTIONS, RESOURCES } from "../../permissions";
import { RECORD_PATH } from "../../../config";
import { useMemoizedSelector } from "../../../libs";
import PercentageTile from "../../percentage-tile";

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
  WorkflowTeamCases,
  CasesAtGlance,
  RegCasesByProtection,
  SourceOfCases,
  CasesRequiringAlt,
  CasesReferrals,
  PoliceCases,
  CasesRequireSpecialConsideration,
  ClosedCasesBySex,
  ClosedCasesByAge,
  HighRiskCases,
  CustodyByCourtOrder,
  CommunityBasedChild,
  CommunityEngagementSession,
  RegAndClosedByMonth
} from "./components";
import NAMESPACE from "./namespace";
import { NAME } from "./constants";
import { fetchDashboards, fetchFlags } from "./action-creators";

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
            <PercentageTile label="Physical Violence or Injury" percentage={20} count={89} color="LightCoral" />
            <PercentageTile label="Mental Violence" percentage={24} count={99} color="CornflowerBlue" />
            <PercentageTile label="Neglect and Negligent Treatment" percentage={30} count={110} color="Purple" />
            <PercentageTile label="Exploitation" percentage={20} count={89} color="Orange" />
            <PercentageTile
              label="Sexual Abuse and Sexual Exploitation"
              percentage={15}
              count={51}
              color="MediumSeaGreen"
            />
          </Grid>
        </Grid>
        {/* First Row */}
        <Grid container spacing={3}>
          <CasesAtGlance />
          <RegCasesByProtection />
        </Grid>
        {/* Second Row */}
        <Grid container spacing={3}>
          <HighRiskCases />
          <RegAndClosedByMonth />
        </Grid>
        {/* Third Row */}
        <SourceOfCases />
        {/* Forth Row */}
        <Grid container spacing={3}>
          <CasesRequiringAlt />
          <CasesReferrals />
        </Grid>
        {/* Fifth Row */}
        <Grid container spacing={3}>
          <CustodyByCourtOrder />
          <PoliceCases />
        </Grid>
        {/* Sixth Row */}
        <Grid container spacing={3}>
          <CasesRequireSpecialConsideration />
          <ClosedCasesBySex />
        </Grid>
        {/* Seventh Row */}
        <Grid container spacing={3}>
          <CommunityBasedChild />
          <CommunityEngagementSession />
        </Grid>
        {/* Eight Row */}
        <ClosedCasesByAge />

        <Grid container spacing={3}>
          <Grid item xl={12} md={12} xs={12}>
            <h4>Percentage of Children who received Child Protection Services</h4>
          </Grid>
          <Grid item xl={12} md={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
            <PercentageTile label="Physical Violence or Injury" percentage={9} count={13} color="LightCoral" />
            <PercentageTile label="Mental Violence" percentage={8} count={12} color="CornflowerBlue" />
            <PercentageTile label="Neglect and Negligent Treatment" percentage={11} count={16} color="Purple" />
            <PercentageTile label="Exploitation" percentage={8} count={12} color="Orange" />
            <PercentageTile
              label="Sexual Abuse and Sexual Exploitation"
              percentage={6}
              count={9}
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
