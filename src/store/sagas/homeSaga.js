import { takeLatest, put, call } from "redux-saga/effects";
import { apiRoutes, serviceUrl } from "../../constants/serviceUrls";
import { types } from "../action/ActionTypes";
import { apiCall } from "../../utility/utility";
import { clockRunning } from "react-native-reanimated";
import NavigationService from "../../navigation/NavigationService";
import Snackbar from "react-native-snackbar";

function* jobSeekerListing({ payload }) {
  console.log("payloadofseekerlisting----", payload);
  try {
    let response = yield call(
      apiCall,
      `${apiRoutes.candidateDetail}/JobPoster/candidates?JobId=${payload}&pageSize=${20}&pageNo=${1}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.GET_SEEKER_LISTING,
        payload: result,
      });
    } else {
    }
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    console.log(error);
  }
}

function* viewCandidateDetail(obj) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    const { payload } = obj;
    console.log("payloadCandidate", payload);
    let response = yield call(
      apiCall,
      `${apiRoutes.candidateDetail}JobPoster/Candidate?userId=${payload}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.GET_VIEW_CANDIDATE_DETAIL,
        payload: result,
      });
    } else {
    }
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* shortlistCandidate(obj) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    const { payload } = obj;
    let response = yield call(
      apiCall,
      `${apiRoutes.candidateDetail}/JobPoster/ShortlistCandidate?JobId=${payload.jobId}&userprofileId=${payload.seekerId}`,
      null,
      "PUT",
    );
    let result = yield response.json();
    if (result) {
      NavigationService.navigate("ShotListedCandidateDetail");
    } else {
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getPosterJobList({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `https://applykart.azurewebsites.net/api/jobseeker/jobs?CategoryId=${payload}&pageNo=1&pageSize=20`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_POSTER_JOB_LIST,
        payload: result?.jobs,
      });
      yield put({
        type: types.GET_POSTER_JOB_LIST_FOR_CLEANING,
        payload: 9, // cleaning service
      });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getPosterJobListForCleaning({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `https://applykart.azurewebsites.net/api/jobseeker/jobs?CategoryId=${payload}&pageNo=1&pageSize=20`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_POSTER_JOB_LIST_FOR_CLEANING,
        payload: result?.jobs,
      });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* recentlyPostedList({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `https://applykart.azurewebsites.net/api/JobSeeker/Jobs?pageNo=1&pageSize=20&Search=${payload.search}&userId=${payload.user_Id}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_RECENTLY_POSTED_JOBS_LIST,
        payload: result?.jobs,
      });
      yield put({
        type: types.GET_POSTER_JOB_LIST,
        payload: 14, // IT
      });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}
function* getCompanyDetails({ payload }) {
  try {
    // let response = yield call(apiCall, "${apiRoutes.companyDetails}?user_profile_id={pa}", null, "GET");
    let response = yield call(apiCall, `${apiRoutes.companyDetails}?user_id=${payload?.userId}`, null, "GET");

    let result = yield response.json();

    if (result) {
      yield put({
        type: types.REDUCER_SET_COMPANY_DETAILS,
        payload: result,
      });
    } else {
    }
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    console.log(error);
  }
}

function* getRecentJobDetail({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  // console.log("kkkkk---", payload);
  try {
    let response = yield call(
      apiCall,
      `https://applykart.azurewebsites.net/api/JobSeeker/JobDetails?JobId=${payload}`, //change payload for dynamic
      null,
      "GET",
    );
    let result = yield response.json();
    //console.log(";harshita", result);
    if (result) {
      yield put({
        type: types.REDUCER_GET_RECENT_JOB_DETAIL,
        payload: result,
      });
    } else {
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getJobPosterDetails({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  //console.log("getJobPosterDetails-----", payload);
  try {
    let response = yield call(
      apiCall,
      `https://applykart.azurewebsites.net/api/JobPoster?JobPosterUserId=${payload}`, //change payload for dynamic
      null,
      "GET",
    );
    let result = yield response.json();
    // console.log("getJobPosterDetails########", result);s
    if (result) {
      yield put({
        type: types.REDUCER_GET_JOB_POSTER_DETAILS,
        payload: result,
      });
    } else {
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

export default function* watchHomeSaga() {
  yield takeLatest(types.JOB_SEEKER_LISTING, jobSeekerListing);
  yield takeLatest(types.VIEW_CANDIDATE_DETAIL, viewCandidateDetail);
  yield takeLatest(types.SHORTLIST_CANDIDATE, shortlistCandidate);
  yield takeLatest(types.GET_POSTER_JOB_LIST, getPosterJobList);
  yield takeLatest(types.GET_POSTER_JOB_LIST_FOR_CLEANING, getPosterJobListForCleaning);
  yield takeLatest(types.RECENTLY_POSTED_JOBS_LIST, recentlyPostedList);
  yield takeLatest(types.GET_RECENT_JOB_DETAIL, getRecentJobDetail);
  yield takeLatest(types.GET_COMPANY_DETAILS, getCompanyDetails);
  yield takeLatest(types.GET_JOB_POSTER_DETAILS, getJobPosterDetails);
}
