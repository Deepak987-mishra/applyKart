import { types } from "../action/ActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  generateOtp: null,
  verifyOtp: null,
  resetPassword: null,
  changePassword: null,
  loginData: null,
  seekerLoginData: null,
  resendOTP: null,
  getOtpForVerification:null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_USER_DATA: {
      return { ...state, currentUser: payload };
    }
    case types.SET_SEEKER_REGISTRATION_DATA: {
      return { ...state, seekerRegistrationData: payload };
    }
    case types.SET_LOGIN_DATA: {
      return { ...state, loginData: payload };
    }

    case types.GENERATE_OTP: {
      return { ...state, generateOtp: payload };
    }
    case types.VERIFY_OTP: {
      return { ...state, verifyOtp: payload };
    }
    case types.RESET_PASSWORD: {
      return { ...state, resetPassword: payload };
    }
    case types.CHANGE_PASSWORD: {
      return { ...state, changePassword: payload };
    }
    case types.RESEND_OTP: {
      return { ...state, resendOTP: payload };
    }
    case types.GET_OTP_FOR_VERIFICATION: {
      return { ...state, getOtpForVerification: payload };
    }
    default:
      return state;
  }
};
