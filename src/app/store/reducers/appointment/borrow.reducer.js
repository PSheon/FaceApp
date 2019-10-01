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
  borrowInfoDialog: {
    props: {
      open: false
    },
    data: null
  }
};

const borrow = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_BORROW_APPOINTMENT_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case Actions.SYNC_BORROW_APPOINTMENT: {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }

    case Actions.APPEND_NEXT_PAGE_BORROW_APPOINTMENT_LOGS: {
      const { docs, hasNextPage, nextPage } = action.payload;

      return {
        ...state,
        loading: false,
        docs: [...state.docs, ...docs],
        hasNextPage,
        nextPage
      };
    }

    case Actions.REJECT_BORROW_APPOINTMENT_BY_ID: {
      const { borrowId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === borrowId) {
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
    case Actions.AGREE_BORROW_APPOINTMENT_BY_ID: {
      const { borrowId } = action.payload;
      const updatedDocs = state.docs.map(item => {
        if (item._id === borrowId) {
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

export default borrow;
