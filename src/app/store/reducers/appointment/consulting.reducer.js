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
  consultingInfoDialog: {
    props: {
      open: false
    },
    data: null
  }
};

const consulting = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_CONSULTING_APPOINTMENT_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case Actions.SYNC_CONSULTING_APPOINTMENT: {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }

    case Actions.APPEND_NEXT_PAGE_CONSULTING_APPOINTMENT_LOGS: {
      const { docs, hasNextPage, nextPage } = action.payload;

      return {
        ...state,
        loading: false,
        docs: [...state.docs, ...docs],
        hasNextPage,
        nextPage
      };
    }

    case Actions.CHECKIN_CONSULTING_APPOINTMENT_BY_ID: {
      const { consultingId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === consultingId) {
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

    case Actions.REJECT_CONSULTING_APPOINTMENT_BY_ID: {
      const { consultingId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === consultingId) {
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

    case Actions.AGREE_CONSULTING_APPOINTMENT_BY_ID: {
      const { consultingId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === consultingId) {
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

export default consulting;
