import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SYNC_HOMEPAGE_CAROUSELS = '[HOMEPAGE] SYNC CAROUSELS';
export const APPEND_CAROUSEL_TO_HOMEPAGE_CAROUSELS = '[HOMEPAGE] APPEND CAROUSEL TO CAROUSELS';

export function syncHomePageCarousels() {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/carousel`);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: SYNC_HOMEPAGE_CAROUSELS,
        payload: response.data,
      })
    );
}

export function saveCarousel(carouselDetail) {
  return dispatch => {
    eventBusService.createOrUpdateCarousel(carouselDetail)
      .then(payload => {

        dispatch(syncHomePageCarousels())
        dispatch(Actions.showMessage({ message: '圖片已更新' }));

        history.push({
          pathname: '/staff/carousels-list'
        });
      })
  }
}

export function deleteCarousel(carouselId) {
  return dispatch => {
    eventBusService.deleteCarousel(carouselId)
      .then(payload => {

        dispatch(syncHomePageCarousels())
        dispatch(Actions.showMessage({ message: '圖片已刪除' }));

        history.push({
          pathname: '/staff/carousels-list'
        });
      })
  }
}
