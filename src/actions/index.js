import Axios from "axios";

//const BASE_URL = `http://50.167.185.158:9000/data`;
//const BASE_URL = `http://localhost:9000/data`;
const BASE_URL = `http://10.7.1.124:9000/data`;

export const GET_VEHICLES = "GET_VEHICLES";
export const GET_VEHICLES_GPS = "GET_VEHICLES_GPS";
export const GET_RUNS = "GET_RUNS";
export const GET_RUN_TRIPS = "GET_RUN_TRIPS";
export const GET_TRIP_STOPS = "GET_TRIP_STOPS";
export const SELECT_GPS = "SELECT_GPS";
export const GET_ROUTES = "GET_ROUTES";
export const GET_ROUTE_PATTERNS = "GET_ROUTE_PATTERNS";
export const GET_ACTUAL_STOPS = "GET_ACTUAL_STOPS";
export const GET_ACTUAL_PROBLEMS = "GET_ACTUAL_PROBLEMS";
export const GET_PATTERN_ETA_ANALYTICS = "GET_PATTERN_ETA_ANALYTICS";
export const GET_STOP_ETA_ANALYTICS = "GET_STOP_ETA_ANALYTICS"

export const SET_ACTIVE_DATE = "SET_ACTIVE_DATE";
export const SET_THRESHOLD = "SET_THRESHOLD";

export function getVehiclesGPS() {
    const url = `${BASE_URL}/vehicles/gps`;
    const response = Axios.get(url);

    return {
        type: GET_VEHICLES_GPS,
        payload: response
    };
}

export function getPatternETAAnalytics(date, threshold) {
    const url = `${BASE_URL}/analytics/eta/patterns?date=${date}&${threshold ? `threshold=${threshold}` : ''}`;
    const response = Axios.get(url);

    return {
        type: GET_PATTERN_ETA_ANALYTICS,
        payload: response
    }
}

export function getStopETAAnalytics(date, threshold, subrouteid) {
    const url = `${BASE_URL}/analytics/eta/patterns/${subrouteid}?date=${date}&${threshold ? `threshold=${threshold}` : ''}`;
    const response = Axios.get(url);

    return {
        type: GET_STOP_ETA_ANALYTICS,
        payload: response
    }
}

export function setAciveDate(date) {
    return {
        type: SET_ACTIVE_DATE,
        payload: date
    }
}

export function setThreshold(threshold) {
    return {
        type: SET_THRESHOLD,
        payload: threshold
    }
}

export function getActualProblems(date) {
    const url = `${BASE_URL}/outoforder/${date}`
    const response = Axios.get(url);

    return {
        type: GET_ACTUAL_PROBLEMS,
        payload: response
    }
}

export function selectGPS(record) {
    return {
        type: SELECT_GPS,
        payload: record
    }
}

export function getVehicles() {
    const url = `${BASE_URL}/vehicle`;
    const response = Axios.get(url);

    return {
        type: GET_VEHICLES,
        payload: response
    };
}

export function getActualStops() {
    const url = `${BASE_URL}/stops`;
    const response = Axios.get(url);

    return {
        type: GET_ACTUAL_STOPS,
        payload: response
    };
}

export function getRuns() {
    const url = `${BASE_URL}/runs`;
    const response = Axios.get(url);

    return {
        type: GET_RUNS,
        payload: response
    };
}

export function getRunTrips(runid) {
    const url = `${BASE_URL}/runs/${runid}/trips`;
    const response = Axios.get(url);

    return {
        type: GET_RUN_TRIPS,
        payload: response
    }
}

export function getRoutes(date) {
    const url = `${BASE_URL}/routes/${date}`;
    const response = Axios.get(url);

    return {
        type: GET_ROUTES,
        payload: response
    }
}

export function getRoutePatterns(routeid, date) {
    const url = `${BASE_URL}/routes/${date}/${routeid}/patterns`;
    const response = Axios.get(url);

    return {
        type: GET_ROUTE_PATTERNS,
        payload: response
    }
}

export function getTripStops(tripid) {
    const url = `${BASE_URL}/trips/${tripid}/stops`;
    const response = Axios.get(url);

    return {
        type: GET_TRIP_STOPS,
        payload: response
    }
}