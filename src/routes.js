import React from "react";
import { Route, IndexRoute } from "react-router";

import { App } from "./components/app";
import { RunList } from "./containers/run-list";
import { RouteList } from "./containers/route-list";
import { RunTripList } from "./containers/run-trip-list";
import { TripStopList } from "./containers/trip-stop-list";
import { VehicleList } from "./containers/vehicle-list";
import { RoutePatternList } from "./containers/route-pattern-list";
import { ActualStopList } from "./containers/actual-stop-list";
import { ActualProblemsList } from "./containers/actual-troubleshooting";
import { ProblemsList } from "./containers/troubleshooting";
import { ProblemCalendar } from "./containers/problem-calendar";
import { RoutePatternETAAnalytics } from "./containers/route-pattern-eta-analytics";
import { StopETAAnalytics } from "./components/stop-eta-analytics";
import ActiveList from "./components/active-list";
import { Analytics } from "./containers/analytics";


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Analytics} />
        <Route path="/runs" component={RunList} />
        <Route path="/routes" component={RouteList} />
        <Route path="/stops" component={ActualStopList} />

        <Route path="/analytics" component={Analytics}>
            <IndexRoute component={RoutePatternETAAnalytics} />
            <Route path="/analytics/patterns" component={RoutePatternETAAnalytics} />
            <Route path="/analytics/patterns/:id" component={StopETAAnalytics} />
        </Route>
        
        <Route path="/troubleshooting" component={ProblemsList} />
        <Route path="/troubleshooting/:date" component={ActualProblemsList} />
        <Route path="/troubleshooting/:sdate/:edate" component={ProblemsList} />
        <Route path="/routes/:id" component={RoutePatternList} />
        <Route path="/runs/:id" component={RunTripList} />
        <Route path="/trips/:id" component={TripStopList} />
    </Route>
)