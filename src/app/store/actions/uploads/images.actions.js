import axios from 'axios';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SYNC_UPLOADED_IMAGES_LIST = '[UPLOAD] SYNC IMAGES LIST';
export const ADD_IMAGE_TO_UPLOADED_IMAGES_LIST = '[UPLOAD] ADD TO IMAGES LIST';
export const APPEND_NEXT_PAGE_UPLOADED_IMAGES_LIST = '[UPLOAD] APPEND NEXT PAGE IMAGES';
export const SET_SELECTED_IMAGE_ID = '[UPLOAD] SET SELECTED IMAGE ID';
export const UPDATE_IMAGE_DETAIL = '[UPLOAD] UPDATE IMAGE DETAIL';
export const UPDATE_IMAGE_LIST = '[UPLOAD] UPDATE IMAGE LIST';
export const DELETE_IMAGE_BY_ID = '[UPLOAD] DELETE IMAGE';

export function syncUploadedImages() {
  return dispatch => {
    eventBusService.getUploadedImages()
      .then(response => {
        if (response.docs.length) {
          dispatch({
            type: SET_SELECTED_IMAGE_ID,
            payload: {
              imageId: response.docs[0]['_id']
            }
          })
        }

        return dispatch({
          type: SYNC_UPLOADED_IMAGES_LIST,
          payload: response
        })
      })
  }
}

export function updateImageListWithPageIndex(routeParams) {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/image`, {
    params: routeParams
  });

  return (dispatch) =>
    // request.then((response) =>
    //   dispatch({
    //     type: UPDATE_IMAGE_LIST,
    //     payload: {
    //       images: response.data.docs,
    //       routeParams: {
    //         ...routeParams,
    //         page: routeParams.page,
    //       },
    //       totalPages: response.data.totalPages,
    //     },
    //   })
    // );
    request.then((response) =>
      dispatch({
        type: UPDATE_IMAGE_LIST,
        payload: {
          data: response.data,
          routeParams,
        },
      })
    );
}

export function updateImageById({ imageId, imageCaption }) {
  return dispatch => {
    eventBusService.updateImageById({ imageId, imageCaption })
      .then(response => {

        dispatch({
          type: UPDATE_IMAGE_DETAIL,
          payload: {
            imageId,
            imageCaption
          }
        })
        dispatch(Actions.showMessage({ message: '已更新圖片資訊.' }));
      })
  }
}

export function addImageToUploadedImages(image) {
  return dispatch => {
    return dispatch({
      type: ADD_IMAGE_TO_UPLOADED_IMAGES_LIST,
      payload: image
    })
  }
}

export function appendNextPageUploadedImages(routeParams) {
  return dispatch => {
    eventBusService.getUploadedImages(routeParams)
      .then(response => {
        return dispatch({
          type: APPEND_NEXT_PAGE_UPLOADED_IMAGES_LIST,
          payload: response
        })
      })
  }
}

export function setSelectedImageId(imageId) {
  return dispatch => {
    return dispatch({
      type: SET_SELECTED_IMAGE_ID,
      payload: {
        imageId
      }
    })
  }
}

export function deleteImage(imageId) {
  return dispatch => {
    eventBusService.deleteImage(imageId)
      .then(payload => {
        dispatch(Actions.showMessage({ message: '已刪除圖片.' }));
        dispatch({
          type: DELETE_IMAGE_BY_ID,
          payload: {
            imageId
          }
        })
      })
  }
}
