import { combineReducers } from 'redux';
import vehiclesReducer from "./reducer-vehicles";
import runsReducer from "./reducer-runs";
import runTripsReducer from "./reducer-run-trips";
import tripStopsReducer from "./reducer-trip-stops";
import vehiclesGPSReducer from "./reducer-vehicles-gps";
import selectedGPSReducer from "./reducer-selected-gps";
import routesReducer from "./reducer-routes";
import routePatternsReducer from "./reducer-route-patterns";
import actualStopsReducer from "./reducer-actual-stops";
import actualProblemsReducer from "./reducer-actual-problems";

import moment from "moment";

const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
  vehiclesGPS: vehiclesGPSReducer,
  runs: runsReducer,
  runTrips: runTripsReducer,
  tripStops: tripStopsReducer,
  selectedGPS: selectedGPSReducer,
  routes: routesReducer,
  routePatterns: routePatternsReducer,
  actualStops: actualStopsReducer,
  actualProblems: actualProblemsReducer,
  activeDate: (state = moment().startOf('day'), action) => {
    switch (action.type) {
      case "SET_ACTIVE_DATE":
        return action.payload;
      default: return state;
    }
  },
  threshold: (state = 3, action) => {
    switch (action.type) {
      case "SET_THRESHOLD":
        return action.payload;
      default: return state;
    }
  },
  patternETAAnalytics: (state = [], action) => {
    switch (action.type) {
      case "GET_PATTERN_ETA_ANALYTICS":
        return action.payload.data;
      default: return state;
    }
  },
  stopETAAnalytics: (state = [], action) => {
    switch (action.type) {
      case "GET_STOP_ETA_ANALYTICS":
        return action.payload.data;
      default: return state;
    }
  }
});

export default rootReducer;
