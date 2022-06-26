import { takeLatest, put, call } from "redux-saga/effects";
import { apiRoutes, baseURL, serviceUrl } from "../../constants/serviceUrls";
import { types } from "../action/ActionTypes";
import { apiCall, uploadFileToAzure } from "../../utility/utility";
import NavigationService from "../../navigation/NavigationService";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* getSpecialSkillList() {
  try {
    let response = yield call(apiCall, `${baseURL}JobSeeker/skills`, null, "GET");
    let result = yield response.json();
    console.log("skillresult", result);
    if (result) {
      yield put({
        type: types.REDUCER_SPECIAL_SKILL_LIST,
        payload: result,
      });
    } else {
      Snackbar.show({ text: response.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
}

function* submitVcardData({ payload }) {
  try {
    let { response } = yield call(apiCall, serviceUrl.jobSeeker, payload, "PUT");
    if (response?.httpStatus == 200) {
      Snackbar.show({ text: "Profile Created Successfully", duration: Snackbar.LENGTH_LONG });
      NavigationService.navigate("SeekerHome");
    } else {
      Snackbar.show({ text: response.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
}

function* postVcardVaccination({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}jobseeker/vcard`,
      payload.vcardVacc,
      "POST",
    );
    let result = yield response.json();

    fetch(result?.data?.profile_pic, {
      method: "PUT",
      body: payload.file,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/png",
      },
    })
      .then(res => console.log("response", res))
      .catch(e => console.log("error", e));

    if (response?.status == 200) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      NavigationService.navigate("VCardWorkDetail", { isEdit: payload?.isEdit });
    } else {
      Snackbar.show({ text: response, backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
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

function* postVcardWorkDetail({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/ProfessionalDetails`,
      payload.vcardWork,
      "POST",
    );
    if (response?.status == 200) {
      NavigationService.navigate("VCardEducationDetail", { isEdit: payload?.isEdit });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getCollegeList() {
  try {
    let response = yield call(
      apiCall,
      `${baseURL}University?pageno=1&pagesize=10000`,
      null,
      "GET",
    );
    let res1 = yield response.json();
    yield put({
      type: types.REDUCER_GET_COLLEGE_LIST,
      payload: res1?.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getEducationLevel() {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}Education`, null, "GET");
    let res1 = yield response.json();
    yield put({
      type: types.REDUCER_GET_EDUCATION_LEVEL,
      payload: res1,
    });
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getCategoryList() {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}categories`, null, "GET");
    let result = yield response.json();
    yield put({
      type: types.REDUCER_GET_CATEGORY_LIST,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getSubCategoryList({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}SubCategory?ParentCategoryid=${payload}`,
      null,
      "GET",
    );
    let result = yield response.json();
    yield put({
      type: types.REDUCER_GET_SUB_CATEGORY_LIST,
      payload: result?.subcategoryList,
    });
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* getSeekerTypeJob() {
  try {
    let response = yield call(apiCall, `${baseURL}JobTypes`, null, "GET");
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_SEEKER_TYPE_JOB,
        payload: result,
      });
    } else {
      Snackbar.show({ text: "Error", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
}

function* postSeekercategoryJobType({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}JobPreference`, payload, "PUT");
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      NavigationService.navigate("SeekerJobPrefrence");
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

function* postSeekerJobprefrence({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}Preference`, payload, "PUT");
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      NavigationService.navigate("SetAvailablity");
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

function* postEducationAndSkill({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}jobseeker/EducatonalDetails`,
      payload.vcardEdu,
      "POST",
    );
    let result = yield response.json();
    //console.log("resultresultresultresult", result);
    if (result) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      NavigationService.navigate("VCardSpecialSkill", { isEdit: payload?.isEdit });
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

function* toggleIsVideo({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}user-settings`, payload, "POST");
    let result = yield response.json();
    if (result) {
      NavigationService.navigate("LaunchScreen");
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

function* uploadSeekerVideo({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}IntroVideo`,
      payload.vcardUserData,
      "PUT",
    );
    let result = yield response.json();
    // console.log("res", result.data.intro_Video_Link);
    if (result) {
      fetch(result.data.intro_Video_Link, {
        method: "PUT",
        body: payload.file,
        headers: {
          "Content-Type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-blob-content": "video/mp4",
        },
      })
        .then(res => console.log("response", res))
        .catch(e => console.log("error", e));
      // NavigationService.replace("DrawerNav", { screen: "SeekerHome" });
      const vcardIsIntro = {
        User_Id: payload?.vcardUserData?.user_id,
        action_type: "completed",
        value: 1,
      };
      yield put({
        type: types.TOGGLE_IS_VIDEO,
        payload: vcardIsIntro,
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

function* getJobList({ payload }) {
  // All Job Lists
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}jobseeker/jobs?CategoryId=0&pageNo=1&pageSize=20&userId=${payload.user_id}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (response?.httpStatus == 200) {
      yield put({
        type: types.REDUCER_GET_JOB_LIST,
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

function* getNewjobList({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/Jobs?pageNo=1&pageSize=20&Search=new&userId=${payload.user_id}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_NEW_JOB_LIST,
        payload: result?.jobs,
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

function* getJobSeekerDetail({ payload }) {
  try {
    let response = yield call(
      apiCall,
      `${baseURL}jobseeker?user_id=${payload}`,
      null,
      "GET",
    );
    let result = yield response.json();
    console.log("SAGA", result);
    if (result) {
      yield put({
        type: types.REDUCER_JOB_SEEKER_DETAIL,
        payload: result,
      });
    } else {
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getJobDetail({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/JobDetails?JobId=${payload}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_JOB_DETAIL,
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

function* getjobListByLocation({ payload }) {
  console.log('APYLIAD', payload)
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/Jobs?pageNo=1&pageSize=20&nearby=${payload.location}&userId=${payload.user_id}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_JOB_LIST_LOCATION,
        payload: result?.jobs,
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

function* getSuggestedjobList({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/Jobs?pageNo=1&pageSize=20&Search=suggest&userId=${payload.user_id}`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_SUGGESTED_JOB_LIST,
        payload: result?.jobs,
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

function* postSeekerJobAvailabilty({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}Availability`, payload, "PUT");
    let result = yield response.json();
    if (result) {
      NavigationService.navigate("VCardVideoIntroductionStart");
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

function* getVisaTypeList() {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}VisaType`, null, "GET");
    let result = yield response.json();
    // console.log("resultvisaType", result);
    if (result) {
      yield put({
        type: types.REDUCER_VISA_TYPE_LIST,
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

function* postApplyJob({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `${baseURL}JobSeeker/Apply-Job`, payload, "POST");
    let result = yield response.json();
    if (result) {
      Snackbar.show({ text: result?.message, backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
      NavigationService.goBack();
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

function* getAppliedJobs({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/AppliedJobs?pageNo=1&pageSize=20`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.REDUCER_GET_APPLIED_JOBS,
        payload: result?.jobs,
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


function* postVcardSpecialSkill({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/UserSkills`,
      payload?.body,
      "POST",
    );
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      NavigationService.navigate('SelectJobType', { isEdit: payload?.isEdit })
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


function* getFavoriteJobsList({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/SavedJobs?pageNo=1&pageSize=20`,
      null,
      "GET",
    );
    let result = yield response.json();
    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_FAVORITE_JOB_LIST,
        payload: result?.jobs
      })
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


function* postFavoriteJob({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${baseURL}JobSeeker/Save-Job?JobId=${payload}`,
      null,
      "POST",
    );
    let result = yield response.json();
    if (response?.status == 200) {
      Snackbar.show({ text: result?.message, backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    } else {
      Snackbar.show({ text: result?.message, backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

export default function* watchjobSeekerSaga() {
  yield takeLatest(types.GET_SPECIAL_SKILL_LIST, getSpecialSkillList);
  yield takeLatest(types.SUBMIT_VCARD_INFO, submitVcardData);
  yield takeLatest(types.GET_JOB_LIST, getJobList);
  yield takeLatest(types.POST_VCARD_VACC_DETAIL, postVcardVaccination);
  yield takeLatest(types.POST_VCARD_WORK_DETAIL, postVcardWorkDetail);
  yield takeLatest(types.GET_COLLEGE_LIST, getCollegeList);
  yield takeLatest(types.GET_EDUCATION_LEVEL, getEducationLevel);
  yield takeLatest(types.GET_CATEGORY_LIST, getCategoryList);
  yield takeLatest(types.GET_SUB_CATEGORY_LIST, getSubCategoryList);
  yield takeLatest(types.GET_SEEKER_TYPE_JOB, getSeekerTypeJob);
  yield takeLatest(types.POST_SEEKER_CATEGORY_JOB_TYPE, postSeekercategoryJobType);
  yield takeLatest(types.POST_SEEKER_JOB_PREFERENCE, postSeekerJobprefrence);
  yield takeLatest(types.POST_EDUCATION_AND_SKILL, postEducationAndSkill);
  yield takeLatest(types.TOGGLE_IS_VIDEO, toggleIsVideo);
  yield takeLatest(types.UPLOAD_SEEKER_VIDEO, uploadSeekerVideo);
  yield takeLatest(types.GET_NEW_JOB_LIST, getNewjobList);
  yield takeLatest(types.GET_JOB_SEEKER_DETAIL, getJobSeekerDetail);
  yield takeLatest(types.GET_JOB_DETAIL, getJobDetail);
  yield takeLatest(types.GET_JOB_LIST_LOCATION, getjobListByLocation);
  yield takeLatest(types.GET_SUGGESTED_JOB_LIST, getSuggestedjobList);
  yield takeLatest(types.POST_SEEKER_JOB_AVAILABILITY, postSeekerJobAvailabilty);
  yield takeLatest(types.GET_VISA_TYPE_LIST, getVisaTypeList);
  yield takeLatest(types.POST_APPLY_JOB, postApplyJob);
  yield takeLatest(types.GET_APPLIED_JOBS, getAppliedJobs);
  yield takeLatest(types.POST_VCARD_SPECIAL_SKILL, postVcardSpecialSkill);
  yield takeLatest(types.GET_FAVORITE_JOB_LIST, getFavoriteJobsList);
  yield takeLatest(types.POST_FAVORITE_JOB, postFavoriteJob);






}
