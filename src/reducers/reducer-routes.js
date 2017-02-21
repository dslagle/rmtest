import { GET_ROUTES } from "../actions/constants";

export default function(state = [], action) {
    switch (action.type) {
        case GET_ROUTES:
            return action.payload.data;
        default: return state;
    }
};