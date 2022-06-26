import { types } from "../action/ActionTypes";
const INITIAL_STATE = {
  getSeekerList: null,
  getCandidateDetail: null,
  shortlistCandidate: null,
  getPosterJobList: null,
  reducerGetPosterJobList: null,
  ReducerGetPosterJobListForCleaning: null,
  ReducerecentlyPostedJobList: null,
  reducerGetRecentJobDetail: null,
  getRecentJobDetail: null,
  companyDetails: null,
  getJobPosterDetail: null,
  reducerGetJobPosterDetail: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.GET_SEEKER_LISTING: {
      return { ...state, getSeekerList: payload };
    }
    case types.GET_VIEW_CANDIDATE_DETAIL: {
      return { ...state, getCandidateDetail: payload };
    }
    case types.SHORTLIST_CANDIDATE: {
      return { ...state, shortlistCandidate: payload };
    }
    case types.GET_POSTER_JOB_LIST: {
      return { ...state, getPosterJobList: payload };
    }
    case types.REDUCER_GET_POSTER_JOB_LIST: {
      return { ...state, reducerGetPosterJobList: payload };
    }
    case types.GET_POSTER_JOB_LIST_FOR_CLEANING: {
      return { ...state, getPosterJobListForCleaning: payload };
    }
    case types.REDUCER_GET_POSTER_JOB_LIST_FOR_CLEANING: {
      return { ...state, ReducerGetPosterJobListForCleaning: payload };
    }
    case types.RECENTLY_POSTED_JOBS_LIST: {
      return { ...state, recentlyPostedJobList: payload };
    }
    case types.REDUCER_RECENTLY_POSTED_JOBS_LIST: {
      return { ...state, ReducerecentlyPostedJobList: payload };
    }
    case types.REDUCER_GET_RECENT_JOB_DETAIL: {
      return { ...state, reducerGetRecentJobDetail: payload };
    }
    case types.GET_RECENT_JOB_DETAIL: {
      return { ...state, getRecentJobDetail: payload };
    }
    case types.REDUCER_SET_COMPANY_DETAILS: {
      return { ...state, companyDetails: payload };
    }
    case types.GET_JOB_POSTER_DETAILS: {
      return { ...state, getJobPosterDetail: payload };
    }
    case types.REDUCER_GET_JOB_POSTER_DETAILS: {
      return { ...state, reducerGetJobPosterDetail: payload };
    }

    default:
      return state;
  }
};
