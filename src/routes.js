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
import ActiveList from "./components/active-list";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ActiveList} />
        <Route path="/runs" component={RunList} />
        <Route path="/routes" component={RouteList} />
        <Route path="/stops" component={ActualStopList} />
        <Route path="/troubleshooting" component={ActualProblemsList} />
        <Route path="/routes/:id" component={RoutePatternList} />
        <Route path="/runs/:id" component={RunTripList} />
        <Route path="/trips/:id" component={TripStopList} />
    </Route>
)