import { takeLatest, put, call } from "redux-saga/effects";
import { apiRoutes, serviceUrl } from "../../constants/serviceUrls";
import { types } from "../action/ActionTypes";
import { apiCall } from "../../utility/utility";
import NavigationService from "../../navigation/NavigationService";
import Snackbar from "react-native-snackbar";

import { colors } from "../../constants/constant";

function* postJobs({ payload, userId }) {
  try {
    let response = yield call(apiCall, apiRoutes.jobPost, payload, "POST");

    let result = yield response.json();
    if (response?.status == 200) {
      Snackbar.show({ text: "Job Posted Successfully", duration: Snackbar.LENGTH_LONG, backgroundColor: colors.blue });
      NavigationService.navigate("Home");
      let body = {
        search: "recent",
        user_Id: userId,
      };
      yield put({
        type: types.RECENTLY_POSTED_JOBS_LIST,
        payload: body,
      });
    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
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

function* editJobs({ payload }) {
  console.log("payloadEdit", { payload });
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `https://applykart.azurewebsites.net/api/JobPoster/JobDetails`, payload, "PUT");

    console.log("response=====", response);

    let result = yield response.json();
    console.log("resullt1111111==", result);
    if (response?.status == 200) {
      Snackbar.show({ text: "Job Edited Successfully", duration: Snackbar.LENGTH_LONG, backgroundColor: colors.blue });
      NavigationService.navigate("Home");
    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
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

function* uploadDocuments({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.uploadDocuments, payload.payload, "PUT");
    let result = yield response.json();
    //  console.log("documnet", response);
    // console.log("abnResult", result.data);
    fetch(result.data.abn_Doc, {
      method: "PUT",
      body: payload.abnFile,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/jpg",
      },
    })
      .then(res => console.log("abnUploadsucessfully", res))
      .catch(e => console.log("error", e));

    fetch(result.data.acn_Doc, {
      method: "PUT",
      body: payload.acnFile,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/jpg",
      },
    })
      .then(res => console.log("acn succesfull", res))
      .catch(e => console.log("error", e));

    fetch(result.data.aus_Driving_License_Back, {
      method: "PUT",
      body: payload.licenseBack,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/jpg",
      },
    })
      .then(res => console.log("driving licence back successfull", res))
      .catch(e => console.log("error", e));

    fetch(result.data.aus_Driving_License_Front, {
      method: "PUT",
      body: payload.licenseFront,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/jpg",
      },
    })
      .then(res => console.log("driving front success", res))
      .catch(e => console.log("error", e));

    // fetch(result.data.Medicare_Front, {
    //   method: "PUT",
    //   body: payload.medicareFront,
    //   headers: {
    //     "Content-Type": "application/octet-stream",
    //     "x-ms-blob-type": "BlockBlob",
    //     "x-ms-blob-content": "image/jpg",
    //   },
    // })
    //   .then(res => console.log("response", res))
    //   .catch(e => console.log("error", e));

    if (response?.status == 200) {
      // Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });

      Snackbar.show({
        text: "Document Uploaded Successfully",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
      yield put({
        type: types.SKIP_UPLOADING_DOCUMENT,
        payload: true,
      });
      NavigationService.navigate("Acknowledgement");
    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
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

function* getSpecialRequirementList() {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `https://applykart.azurewebsites.net/api/SpecialRequirements`, null, "GET");
    let result = yield response.json();
    console.log("resulSpecialRequirement", result);
    if (result) {
      yield put({
        type: types.REDUCER_SPECIAL_REQUIREMENT_LIST,
        payload: result,
      });
    } else {
      Snackbar.show({ text: "Error", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

export default function* watchjobPostSaga() {
  yield takeLatest(types.POST_JOBS, postJobs);
  yield takeLatest(types.UPLOAD_DOCUMENTS, uploadDocuments);
  yield takeLatest(types.EDIT_JOBS, editJobs);
  yield takeLatest(types.GET_SPECIAL_REQUIREMENTS, getSpecialRequirementList);
}
