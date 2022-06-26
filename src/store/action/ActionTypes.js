export const types = {
  //global types
  TOGGLE_APP_LOADER: "TOGGLE_APP_LOADER",
  SWITCH_STACK: "SWITCH_STACK",
  BUTTON_LOADER: "BUTTON_LOADER",
  LOG_OUT: "LOG_OUT",
  CLEAR_REDUCER: "CLEAR_REDUCER",

  //home
  JOB_SEEKER_LISTING: "JOB_SEEKER_LISTING", // JOB POSTER
  GET_SEEKER_LISTING: " GET_SEEKER_LISTING",
  VIEW_CANDIDATE_DETAIL: "VIEW_CANDIDATE_DETAIL",
  GET_VIEW_CANDIDATE_DETAIL: "GET_VIEW_CANDIDATE_DETAIL",
  SHORTLIST_CANDIDATE: "SHORTLIST_CANDIDATE",
  GET_POSTER_JOB_LIST: "GET_JOB_LIST",
  REDUCER_GET_POSTER_JOB_LIST: " REDUCER_GET_JOB_LIST",
  GET_POSTER_JOB_LIST_FOR_CLEANING: "GET_POSTER_JOB_LIST_FOR_CLEANING",
  RECENTLY_POSTED_JOBS_LIST: "RECENTLY_POSTED_JOBS_LIST",
  REDUCER_RECENTLY_POSTED_JOBS_LIST: "REDUCER_RECENTLY_POSTED_JOBS_LIST",
  REDUCER_GET_POSTER_JOB_LIST_FOR_CLEANING: "REDUCER_GET_POSTER_JOB_LIST_FOR_CLEANING",
  REDUCER_GET_RECENT_JOB_DETAIL: "REDUCER_GET_RECENT_JOB_DETAIL",
  GET_RECENT_JOB_DETAIL: "GET_RECENT_JOB_DETAIL",
  GET_COMPANY_DETAILS: "GET_COMPANY_DETAILS",
  REDUCER_SET_COMPANY_DETAILS: "REDUCER_SET_COMPANY_DETAILS",
  GET_JOB_POSTER_DETAILS: "GET_JOB_POSTER_DETAILS",
  REDUCER_GET_JOB_POSTER_DETAILS: "REDUCER_GET_JOB_POSTER_DETAILS",

  //authentication
  POSTER_SIGN_UP: "POSTER_SIGN_UP",
  POSTER_LOGIN: "POSTER_LOGIN",
  SET_POSTER_DATA: "SET_POSTER_DATA",
  GENERATE_OTP: "GENERATE_OTP",
  VERIFY_OTP: "VERIFY_OTP",
  RESET_PASSWORD: "RESET_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  GENERATE_FORGOT_PWD_OTP: "GET_FORGOT_PWD_OTP",
  SET_CURRENT_USER_DATA: "SET_CURRENT_USER_DATA",
  SET_LOGIN_DATA: "SET_LOGIN_DATA",
  GENERATE_OTP_FORGOT_PASSWORD: "GENERATE_OTP_FORGOT_PASSWORD",
  RESEND_OTP: "RESEND_OTP",
  VERIFY_OTP: "VERIFY_OTP",

  //seeker authentication
  SEEKER_SIGNUP: "SEEKER_SIGNUP",
  SET_SEEKER_REGISTRATION_DATA: "SET_SEEKER_REGISTARTION_DATA",
  SEEKER_LOGIN: "SEEKER_LOGIN",
  SEEKER_LOGIN_DATA: "SEEKER_LOGIN_DATA",
  LOGOUT: "LOGOUT",

  //job post action types
  POST_JOBS: "POST_JOBS",
  EDIT_JOBS: "EDIT_JOBS",
  SET_JOB_DATA: "SET_JOB_DATA",
  SELECTED_REQUIREMENTS: "SELECTED_REQUIREMENTS",
  FILL_JOB_DETAIL: "FILL_JOB_DETAIL",
  FILL_CANDIDATE_DETAIL: "FILL_CANDIDATE_DETAIL",
  FILL_INTERVIEW_DETAIL: "FILL_INTERVIEW_DETAIL",
  FILL_JOB_ADDRESS: "FILL_JOB_ADDRESS",
  FILL_INTERVIEW_ADDRESS: "FILL_INTERVIEW_ADDRESS",
  FILL_AVAIALABILITY: "FILL_AVAIALABILITY",
  UPLOAD_DOCUMENT_DATA: "UPLOAD_DOCUMENT_DATA",
  UPLOAD_DOCUMENTS: "UPLOAD_DOCUMENTS",
  SHORTLIST_CANDIDATE: "SHORTLIST_CANDIDATE",
  INTERVIEW_SCHEDULE: "INTERVIEW_SCHEDULE",
  SCHEDULE_INTERVIEW: "SCHEDULE_INTERVIEW",
  ADMIN_MODAL: "ADMIN_MODAL",
  SKIP_UPLOADING_DOCUMENT: "SKIP_UPLOADING_DOCUMENT",
  REDUCER_SAVE_JOB: "REDUCER_SAVE_JOB",
  GET_SPECIAL_REQUIREMENTS: "GET_SPECIAL_REQUIREMENTS",
  REDUCER_SPECIAL_REQUIREMENT_LIST: "REDUCER_SPECIAL_REQUIREMENT_LIST",

  // JOB SEEKER
  GET_SPECIAL_SKILL_LIST: "GET_SPECIAL_SKILL_LIST",
  REDUCER_SPECIAL_SKILL_LIST: "REDUCER_SPECIAL_SKILL_LIST",
  SUBMIT_VCARD_INFO: "SUBMIT_VCARD_INFO",
  GET_JOB_LIST: "GET_JOB_LIST",
  REDUCER_GET_JOB_LIST: "REDUCER_GET_JOB_LIST",
  GET_NEW_JOB_LIST: "GET_NEW_JOB_LIST",
  REDUCER_GET_NEW_JOB_LIST: "REDUCER_GET_NEW_JOB_LIST",
  GET_SUGGESTED_JOB_LIST: "GET_SUGGESTED_JOB_LIST",
  REDUCER_GET_SUGGESTED_JOB_LIST: "REDUCER_GET_SUGGESTED_JOB_LIST",
  POST_VCARD_VACC_DETAIL: "POST_VCARD_VACC_DETAIL",
  POST_VCARD_WORK_DETAIL: "POST_VCARD_WORK_DETAIL",
  GET_COLLEGE_LIST: "GET_COLLEGE_LIST",
  REDUCER_GET_COLLEGE_LIST: "REDUCER_GET_COLLEGE_LIST",
  GET_EDUCATION_LEVEL: "GET_EDUCATION_LEVEL",
  GET_EDUCATION_LEVEL: "GET_EDUCATION_LEVEL",
  REDUCER_GET_EDUCATION_LEVEL: "REDUCER_GET_EDUCATION_LEVEL",
  GET_JOB_SEEKER_DETAIL: "GET_JOB_SEEKER_DETAIL",
  REDUCER_JOB_SEEKER_DETAIL: "REDUCER_JOB_SEEKER_DETAIL",
  GET_CATEGORY_LIST: "GET_CATEGORY_LIST",
  REDUCER_GET_CATEGORY_LIST: "REDUCER_GET_CATEGORY_LIST",
  GET_SUB_CATEGORY_LIST: "GET_SUB_CATEGORY_LIST",
  REDUCER_GET_SUB_CATEGORY_LIST: "REDUCER_GET_SUB_CATEGORY_LIST",
  GET_SEEKER_TYPE_JOB: "GET_SEEKER_TYPE_JOB",
  REDUCER_GET_SEEKER_TYPE_JOB: "REDUCER_GET_SEEKER_TYPE_JOB",
  POST_SEEKER_CATEGORY_JOB_TYPE: "POST_SEEKER_CATEGORY_JOB_TYPE",
  POST_SEEKER_JOB_PREFERENCE: "POST_SEEKER_JOB_PREFERENCE",
  TOGGLE_IS_VIDEO: "TOGGLE_IS_VIDEO",
  UPLOAD_SEEKER_VIDEO: "UPLOAD_SEEKER_VIDEO",
  POST_SEEKER_JOB_AVAILABILITY: "POST_SEEKER_JOB_AVAILABILITY",
  POST_EDUCATION_AND_SKILL: "POST_EDUCATION_AND_SKILL",
  UPLOAD_VCARD_IMAGE: "UPLOAD_VCARD_IMAGE",
  UPLOAD_VCARD_VIDEO: "UPLOAD_VCARD_VIDEO",
  SEEKER_SAVE_WORK_EXP: "SEEKER_SAVE_WORK_EXP",
  GET_JOB_DETAIL: "GET_JOB_DETAIL",
  REDUCER_GET_JOB_DETAIL: "REDUCER_GET_JOB_DETAIL",
  GET_JOB_LIST_LOCATION: "GET_JOB_LIST_LOCATION",
  REDUCER_GET_JOB_LIST_LOCATION: "REDUCER_GET_JOB_LIST_LOCATION",
  GET_VISA_TYPE_LIST: "GET_VISA_TYPE_LIST",
  REDUCER_VISA_TYPE_LIST: "REDUCER_VISA_TYPE_LIST",
  POST_APPLY_JOB: "POST_APPLY_JOB",
  GET_APPLIED_JOBS: "GET_APPLIED_JOBS",
  REDUCER_GET_APPLIED_JOBS: "REDUCER_GET_APPLIED_JOBS",
  POST_VCARD_SPECIAL_SKILL: "POST_VCARD_SPECIAL_SKILL",
  GET_FAVORITE_JOB_LIST: "GET_FAVORITE_JOB_LIST",
  REDUCER_FAVORITE_JOB_LIST: "REDUCER_FAVORITE_JOB_LIST",
  POST_FAVORITE_JOB: "POST_FAVORITE_JOB",



};
