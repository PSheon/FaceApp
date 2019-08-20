import _ from 'lodash';
import * as Actions from 'app/store/actions/uploads';
// import { reduceState } from 'app/utils'

const initialState = {
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

const image = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SYNC_UPLOADED_IMAGES_LIST: {
      return { ...state, ...action.payload };
    }

    case Actions.ADD_IMAGE_TO_UPLOADED_IMAGES_LIST: {
      return {
        ...state,
        docs: [
          ...state.docs,
          action.payload
        ]
      };
    }

    case Actions.UPDATE_IMAGE_LIST:
      {
        const { data, routeParams } = action.payload;
        const imageIdSet = new Set(state.docs.map(item => item._id));
        let tempImagesArr = [];

        data.docs.map((image) => !imageIdSet.has(image._id) ? tempImagesArr.push(image) : null)

        console.log('after state ', {
          ...state,
          ...data,
          docs: [
            ...state.docs,
            ...tempImagesArr,
          ],
          routeParams: {
            ...state.routeParams,
            ...routeParams
          },
        })
        return {
          ...state,
          ...data,
          docs: [
            ...state.docs,
            ...tempImagesArr,
          ],
          routeParams: {
            ...state.routeParams,
            ...routeParams
          },
        };
      }

    case Actions.APPEND_NEXT_PAGE_UPLOADED_IMAGES_LIST: {
      const { docs, hasNextPage, nextPage } = action.payload;
      console.log('action.payload ', action.payload)
      return {
        ...state,
        docs: [
          ...state.docs,
          ...docs
        ],
        hasNextPage,
        nextPage
      };
    }

    case Actions.SET_SELECTED_IMAGE_ID: {
      const { imageId } = action.payload;
      return {
        ...state,
        selectedItemId: imageId
      };
    }

    case Actions.UPDATE_IMAGE_DETAIL: {
      const { imageId, imageCaption } = action.payload;
      const newDocs = state.docs.map(doc => {
        if (doc._id === imageId) {
          return {
            ...doc,
            imageCaption
          }
        } else {
          return doc;
        }
      })
      return {
        ...state,
        docs: newDocs
      };
    }

    case Actions.DELETE_IMAGE_BY_ID: {
      const { imageId } = action.payload;
      return {
        ...state,
        docs: _.remove(state.docs, image => image._id !== imageId)
      };
    }

    default:
      {
        return state;
      }
  }
};

export default image;
