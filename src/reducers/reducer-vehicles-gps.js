import { GET_VEHICLES_GPS } from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case GET_VEHICLES_GPS:
            return action.payload.data;
        default: return state;
    }
};