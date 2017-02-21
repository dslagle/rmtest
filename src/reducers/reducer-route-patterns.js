import { GET_ROUTE_PATTERNS } from "../actions/constants";

export default function(state = [], action) {
    switch (action.type) {
        case GET_ROUTE_PATTERNS:
            return action.payload.data;
        default: return state;
    }
};