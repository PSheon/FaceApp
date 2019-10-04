// import _ from 'lodash';

import * as Actions from 'app/store/actions/appointment';

const initialState = {
  loading: false,
  docs: [],
  routeParams: {},
  hasNextPage: true,
  hasPrevPage: false,
  limit: 20,
  nextPage: 2,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalPages: 10,
  totalDocs: 0,
  guideInfoDialog: {
    props: {
      open: false
    },
    data: null
  }
};

const guide = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_GUIDE_APPOINTMENT_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case Actions.SYNC_GUIDE_APPOINTMENT: {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }

    case Actions.APPEND_NEXT_PAGE_GUIDE_APPOINTMENT_LOGS: {
      const { docs, hasNextPage, nextPage } = action.payload;

      return {
        ...state,
        loading: false,
        docs: [...state.docs, ...docs],
        hasNextPage,
        nextPage
      };
    }

    case Actions.CHECKIN_GUIDE_APPOINTMENT_BY_ID: {
      const { guideId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === guideId) {
          return {
            ...item,
            checkinStatus: true
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        docs: updatedDocs
      };
    }
    case Actions.REJECT_GUIDE_APPOINTMENT_BY_ID: {
      const { guideId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === guideId) {
          return {
            ...item,
            appointmentStatus: 'rejected'
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        docs: updatedDocs
      };
    }
    case Actions.AGREE_GUIDE_APPOINTMENT_BY_ID: {
      const { guideId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === guideId) {
          return {
            ...item,
            appointmentStatus: 'succeeded'
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        docs: updatedDocs
      };
    }
    default: {
      return state;
    }
  }
};

export default guide;
