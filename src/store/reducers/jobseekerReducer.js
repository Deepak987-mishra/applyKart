import { types } from "../action/ActionTypes";

const INITIAL_STATE = {
  skillList: null,
  getJobList: null,
  collegeList: null,
  jobSeekerDetail: null,
  educationLevel: null,
  categoryList: null,
  subcategoryList: null,
  typeOfJob: null,
  newJobList: null,
  saveWorkExp: null,
  getJobDetail: null,
  getJobListLocation: null,
  getJobListSuggested: null,
  visaTypeList: null,
  getAppliedJobsList: null,
  skillList: null,
  favoriteJobList: null,
};
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.REDUCER_SPECIAL_SKILL_LIST: {
      return { ...state, skillList: payload };
    }
    case types.REDUCER_GET_JOB_LIST: {
      return { ...state, getJobList: payload };
    }
    case types.REDUCER_GET_COLLEGE_LIST: {
      return { ...state, collegeList: payload };
    }
    case types.REDUCER_JOB_SEEKER_DETAIL: {
      return { ...state, jobSeekerDetail: payload };
    }
    case types.REDUCER_GET_EDUCATION_LEVEL: {
      return { ...state, educationLevel: payload };
    }
    case types.REDUCER_GET_CATEGORY_LIST: {
      return { ...state, categoryList: payload };
    }
    case types.REDUCER_GET_SUB_CATEGORY_LIST: {
      return { ...state, subcategoryList: payload };
    }
    case types.REDUCER_GET_SEEKER_TYPE_JOB: {
      return { ...state, typeOfJob: payload };
    }
    case types.REDUCER_GET_NEW_JOB_LIST: {
      return { ...state, newJobList: payload };
    }
    case types.SEEKER_SAVE_WORK_EXP: {
      return { ...state, saveWorkExp: payload };
    }
    case types.REDUCER_GET_JOB_DETAIL: {
      return { ...state, getJobDetail: payload };
    }
    case types.REDUCER_GET_JOB_LIST_LOCATION: {
      return { ...state, getJobListLocation: payload };
    }
    case types.REDUCER_GET_SUGGESTED_JOB_LIST: {
      return { ...state, getJobListSuggested: payload };
    }
    case types.REDUCER_VISA_TYPE_LIST: {
      return { ...state, visaTypeList: payload };
    }
    case types.REDUCER_GET_APPLIED_JOBS: {
      return { ...state, getAppliedJobsList: payload };
    }
    case types.REDUCER_FAVORITE_JOB_LIST: {
      return { ...state, favoriteJobList: payload };
    }
    default:
      return state;
  }
};
