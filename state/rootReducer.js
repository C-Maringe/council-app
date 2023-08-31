import { combineReducers } from "redux";
import LicenceData from "./LicenceData"
import UserDetails from "./UserDetails"

const rootReducer = combineReducers({
    LicenceData, UserDetails
});

export default rootReducer;