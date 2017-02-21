import { SELECT_GPS } from "../actions/constants";

export default function(state = null, action) {
    switch (action.type) {
        case SELECT_GPS:
            return action.payload;
        default: return state;
    }
}