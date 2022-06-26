import { types } from "../action/ActionTypes";

const INITIAL_STATE = {
  loader: false,
  stackSelected: null,
  updateModal: false,
  skipUploadingDocument: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.TOGGLE_APP_LOADER: {
      return { ...state, loader: payload };
    }

    case types.SWITCH_STACK: {
      return { ...state, stackSelected: payload };
    }
    case types.TOGGLE_UPDATE_MODAL: {
      return { ...state, updateModal: payload };
    }
    case types.SKIP_UPLOADING_DOCUMENT: {
      return { ...state, skipUploadingDocument: payload };
    }

    default:
      return state;
  }
};
