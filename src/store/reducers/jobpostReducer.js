import { types } from "../action/ActionTypes";

const INITIAL_STATE = {
  jobPostData: null,
  selectedRequirements: [],
  fillJobDetail: null,
  fillCandidateDetail: null,
  fillInterviewDetail: null,
  fillJobAddress: null,
  adminModal: false,
  saveJobs: [],

  fillInterviewAddress: null,
  fillJobAvailability: null,
  specialRequirements: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_JOB_DATA: {
      return { ...state, jobPostData: payload };
    }
    case types.SELECTED_REQUIREMENTS: {
      return { ...state, selectedRequirements: payload };
    }
    case types.FILL_JOB_DETAIL: {
      return { ...state, fillJobDetail: payload };
    }
    case types.FILL_CANDIDATE_DETAIL: {
      return { ...state, fillCandidateDetail: payload };
    }

    case types.FILL_INTERVIEW_DETAIL: {
      return { ...state, fillInterviewDetail: payload };
    }

    case types.FILL_JOB_ADDRESS: {
      return { ...state, fillJobAddress: payload };
    }
    case types.FILL_INTERVIEW_ADDRESS: {
      return { ...state, fillInterviewAddress: payload };
    }
    case types.FILL_AVAIALABILITY: {
      return { ...state, fillJobAvailability: payload };
    }
    case types.ADMIN_MODAL: {
      return { ...state, adminModal: payload };
    }
    case types.REDUCER_SAVE_JOB: {
      return { ...state, saveJobs: payload };
    }
    case types.REDUCER_SPECIAL_REQUIREMENT_LIST: {
      return { ...state, specialRequirements: payload };
    }

    default:
      return state;
  }
};
