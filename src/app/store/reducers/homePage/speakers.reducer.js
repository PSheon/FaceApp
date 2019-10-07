// import _ from 'lodash';

import * as Actions from 'app/store/actions/homePage';

const initialState = {
  loading: false,
  docs: [],
  hasNextPage: true,
  hasPrevPage: false,
  limit: 20,
  nextPage: 2,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalDocs: 1,
  totalPages: 1,
  selectedItemId: 0
};

const news = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SPEAKERS_LIST_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case Actions.SYNC_HOMEPAGE_SPEAKERS: {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case Actions.APPEND_SPEAKER_TO_HOMEPAGE_SPEAKERS_LIST: {
      return {
        ...state,
        loading: false,
        docs: [action.payload.speakerDetail, ...state.docs]
      };
    }
    case Actions.REMOVE_SPEAKER_FROM_LIST: {
      const { speakerId } = action.payload;
      const newDocs = state.docs.filter(doc => doc._id !== speakerId);

      return {
        ...state,
        loading: false,
        docs: newDocs
      };
    }
    case Actions.APPEND_NEXT_PAGE_SPEAKERS_LIST: {
      const { docs, hasNextPage, nextPage } = action.payload;
      return {
        ...state,
        loading: false,
        docs: [...state.docs, ...docs],
        hasNextPage,
        nextPage
      };
    }
    default: {
      return state;
    }
  }
};

export default news;
