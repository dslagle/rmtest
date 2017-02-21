import { GET_VEHICLES } from "../actions/constants";

export default function(state = [{ name: "V1" }, { name: "V2" }], action) {
    switch (action.type) {
        case GET_VEHICLES:
            return [ action.payload.data, ...state ];
        default: return state;
    }
};