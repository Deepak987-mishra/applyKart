import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import authReducer from "../auth/auth-reducer";
import globalReducer from "./globalReducer";
import jobpostReducer from "./jobpostReducer";
import jobseekerReducer from "./jobseekerReducer";
import { types } from "../action/ActionTypes";

const appReducer = combineReducers({
  homeReducer,
  authReducer,
  globalReducer,
  jobpostReducer,
  jobseekerReducer,
});


const rootReducers = (state, action) => {
  if (action.type === types.CLEAR_REDUCER) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
export default rootReducers
