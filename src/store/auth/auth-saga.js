import { takeLatest, put, call, select } from "redux-saga/effects";
import { apiRoutes, serviceUrl } from "../../constants/serviceUrls";
import { types } from "../action/ActionTypes";
import { apiCall } from "../../utility/utility";
import NavigationService from "../../navigation/NavigationService";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountType from "../../screens/CommonScreen/AccountType/AccountType";
import jwt_decode from "jwt-decode";

function* signUpPoster({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.register, payload, "POST");
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      yield put({
        type: types.GENERATE_OTP,
        payload: {
          user_id: result.data.user_Id,
          phone_no: payload.phone_no,
          email: payload.email,
          screen: "PosterLogin",
        },
      });
    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* posterLogin({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.login, payload.params, "POST");
    let result = yield response.json();
    const { userTypeId } = jwt_decode(result?.accessToken)
    if (result?.success == true) {
      yield AsyncStorage.setItem("accessToken", result?.accessToken);
      yield AsyncStorage.setItem("refreshToken", result?.refreshToken);
      result.user_type_id = payload.params.user_type_id
      yield put({
        type: types.SET_CURRENT_USER_DATA,
        payload: { ...result, userTypeId: userTypeId },

      });
      yield put({
        type: types.SET_LOGIN_DATA,
        payload: { ...result, userTypeId: userTypeId },
      });
      payload.navigation.replace("DrawerNav", { screen: "Home" });
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

function* seekerSignUp({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.register, payload, "POST");
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      yield put({
        type: types.GENERATE_OTP,
        payload: {
          user_id: result.data.user_Id,
          phone_no: payload.phone_no,
          email: payload.email,
          screen: "SeekerLogin",
        },
      });
    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* seekerLogin({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.login, payload, "POST");
    let result = yield response.json();
    const { userTypeId } = jwt_decode(result?.accessToken)
    if (result?.success == true) {
      yield AsyncStorage.setItem("accessToken", result?.accessToken);
      yield AsyncStorage.setItem("refreshToken", result?.refreshToken);
      yield put({
        type: types.SET_CURRENT_USER_DATA,
        payload: { ...result, userTypeId: userTypeId },
      });
      yield put({
        type: types.SET_LOGIN_DATA,
        payload: { ...result, userTypeId: userTypeId },
      });
      yield put({
        type: types.GET_JOB_SEEKER_DETAIL,
        payload: result?.user_Id,
      });
      if (result?.is_Completed == 1) {
        NavigationService.navigate("DrawerNav", { screen: "SeekerHome" });
      }
      else {
        NavigationService.navigate("VCardStart");
      }

    } else {
      Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* generateOtp({ payload }) {
  console.log('payload', payload)
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, apiRoutes.otp, payload, "POST");
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });


      Snackbar.show({
        text: "OTP SENT SUCCESSFULLY",
        duration: Snackbar.LENGTH_LONG,
      });
      NavigationService.navigate("OTPVerification", {
        user_id: payload.user_id,
        screen: payload?.screen,
        otp: result?.data?.otp,
        email: payload?.email,
        phone_no: payload.phone_no,
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

function* verifyOtp({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(apiCall, apiRoutes.verifyOtp, payload.body, "POST");
    let result = yield response.json();
    if (result.httpStatus == 200) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
      NavigationService.navigate(payload?.screen);
    }
    else {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    console.log(error);
  }
}

function* resetPassword({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(apiCall, apiRoutes.resetPassword, payload, "PUT");
    let result = yield response.json();
    if (result) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
      NavigationService.navigate("CreateNewPassword");
    } else {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      // Snackbar.show({text: response?.data?.message, duration: Snackbar.LENGTH_LONG});
    }
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    Snackbar.show({ text: response?.message, duration: Snackbar.LENGTH_LONG });
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

function* changePassword({ payload }) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(apiCall, apiRoutes.changePassword, payload, "PUT");
    let result = yield response.json();
    if (result?.httpStatus == 200) {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
      NavigationService.navigate("Home");
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    } else {
      yield put({
        type: types.TOGGLE_APP_LOADER,
        payload: false,
      });
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    console.log(error);
  }
}

function* logout() {
  try {
    yield AsyncStorage.removeItem("accessToken");
    yield AsyncStorage.removeItem("refreshToken");
    // NavigationService.navigate(AccountType);
  } catch (error) {
    console.log(error);
  }
}

function* getJobSeekerDetail({ payload }) {
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: true,
  });
  try {
    let response = yield call(apiCall, `https://applykart.azurewebsites.net/api/jobseeker?user_id=${payload}`, null, "GET",);
    let result = yield response.json();
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
  yield put({
    type: types.TOGGLE_APP_LOADER,
    payload: false,
  });
}

function* generateOtpForForget(payload) {
  try {
    yield put({
      type: types.TOGGLE_APP_LOADER,
      payload: true,
    });
    let response = yield call(apiCall, apiRoutes.otp, payload.payload, "POST");
    let result = yield response.json();
    if (result) {
      Snackbar.show({
        text: "OTP SENT SUCCESSFULLY",
        duration: Snackbar.LENGTH_LONG,
      });
      NavigationService.navigate(payload?.screen, {
        emailId: payload?.emailId,
        otp: result?.data?.otp
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

function* resendOtp({ payload }) {
  console.log("fvhfmnrklthgjhs", payload);
  try {
    let response = yield call(apiCall, apiRoutes.otp, payload, "POST");
    let result = yield response.json();
    if (result) {
      Snackbar.show({
        text: "OTP RESENT SUCCESSFULLY",
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      Snackbar.show({ text: result?.message, duration: Snackbar.LENGTH_LONG });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(types.POSTER_SIGN_UP, signUpPoster);
  yield takeLatest(types.POSTER_LOGIN, posterLogin);
  yield takeLatest(types.SEEKER_SIGNUP, seekerSignUp);
  yield takeLatest(types.SEEKER_LOGIN, seekerLogin);
  yield takeLatest(types.GENERATE_OTP, generateOtp);
  yield takeLatest(types.VERIFY_OTP, verifyOtp);
  yield takeLatest(types.RESET_PASSWORD, resetPassword);
  yield takeLatest(types.CHANGE_PASSWORD, changePassword);
  yield takeLatest(types.GET_JOB_SEEKER_DETAIL, getJobSeekerDetail);
  yield takeLatest(types.LOG_OUT, logout);
  yield takeLatest(types.GENERATE_OTP_FORGOT_PASSWORD, generateOtpForForget);
  yield takeLatest(types.RESEND_OTP, resendOtp);
}

