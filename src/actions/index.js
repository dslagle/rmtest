import Axios from "axios";
import * as ActionTypes from "./constants";
import { BASE_URL } from "../../api-config";

export function getVehiclesGPS() {
    const url = `${BASE_URL}/vehicles/gps`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_VEHICLES_GPS,
        payload: response
    };
}

export function getPatternETAAnalytics(date, threshold) {
    const url = `${BASE_URL}/analytics/eta/patterns?date=${date}&${threshold ? `threshold=${threshold}` : ''}`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_PATTERN_ETA_ANALYTICS,
        payload: response
    }
}

export function getStopETAAnalytics(date, threshold, subrouteid) {
    const url = `${BASE_URL}/analytics/eta/patterns/${subrouteid}?date=${date}&${threshold ? `threshold=${threshold}` : ''}`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_STOP_ETA_ANALYTICS,
        payload: response
    }
}

export function setActiveDate(date) {
    return {
        type: ActionTypes.SET_ACTIVE_DATE,
        payload: date
    }
}

export function setThreshold(threshold) {
    return {
        type: ActionTypes.SET_THRESHOLD,
        payload: threshold
    }
}

export function getActualProblems(date) {
    const url = `${BASE_URL}/outoforder/${date}`
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_ACTUAL_PROBLEMS,
        payload: response
    }
}

export function selectGPS(record) {
    return {
        type: ActionTypes.SELECT_GPS,
        payload: record
    }
}

export function getVehicles() {
    const url = `${BASE_URL}/vehicle`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_VEHICLES,
        payload: response
    };
}

export function getActualStops() {
    const url = `${BASE_URL}/stops`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_ACTUAL_STOPS,
        payload: response
    };
}

export function getRuns() {
    const url = `${BASE_URL}/runs`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_RUNS,
        payload: response
    };
}

export function getRunTrips(runid) {
    const url = `${BASE_URL}/runs/${runid}/trips`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_RUN_TRIPS,
        payload: response
    }
}

export function getRoutes(date) {
    const url = `${BASE_URL}/routes/${date}`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_ROUTES,
        payload: response
    }
}

export function getRoutePatterns(routeid, date) {
    const url = `${BASE_URL}/routes/${date}/${routeid}/patterns`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_ROUTE_PATTERNS,
        payload: response
    }
}

export function getTripStops(tripid) {
    const url = `${BASE_URL}/trips/${tripid}/stops`;
    const response = Axios.get(url);

    return {
        type: ActionTypes.GET_TRIP_STOPS,
        payload: response
    }
}