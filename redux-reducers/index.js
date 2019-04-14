import { UPDATE_DOCUMENTS_STATE } from '../actions';

const initialDocumentUploadingState = {
  uploading: false,
  msg: null,
};

function documents(state = initialDocumentUploadingState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENTS_STATE:
      return { ...state, uploading: action.state.uploading, msg: action.state.msg };
    default:
      return state;
  }
}

export default documents;
