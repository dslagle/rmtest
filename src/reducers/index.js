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
  actualProblems: actualProblemsReducer
});

export default rootReducer;
