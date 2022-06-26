import { all, fork } from "redux-saga/effects";
import watchAuthSaga from "../auth/auth-saga";
import watchHomeSaga from "./homeSaga";
import watchjobPostSaga from "./jobpostSaga";
import watchjobSeekerSaga from "./jobseekerSaga";

export default function* rootSaga() {
  yield all([fork(watchHomeSaga), fork(watchAuthSaga), fork(watchjobPostSaga), fork(watchjobSeekerSaga)]);
}
