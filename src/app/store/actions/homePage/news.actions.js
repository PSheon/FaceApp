import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SYNC_HOMEPAGE_NEWS = '[HOMEPAGE] SYNC NEWS';
export const APPEND_NEWS_TO_HOMEPAGE_NEWS_LIST = '[HOMEPAGE] APPEND NEWS TO NEWS LIST';
export const APPEND_NEXT_PAGE_NEWS_LIST = '[HOMEPAGE] APPEND NEXT PAGE NEWS';

export function syncHomePageNews() {
  return dispatch => {
    eventBusService.getHomePageNews()
      .then(response => {
        if (response.docs.length) {
          dispatch({
            type: SYNC_HOMEPAGE_NEWS,
            payload: response,
          })
        }
      })
  }
}
export function syncHomePageNewsById(newsId) {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/news/${newsId}`);
  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: APPEND_NEWS_TO_HOMEPAGE_NEWS_LIST,
        payload: response.data,
      })
    }
    );
}

export function saveNews(newsDetail) {
  return dispatch => {
    eventBusService.createOrUpdateNews(newsDetail)
      .then(payload => {

        dispatch(syncHomePageNews())
        dispatch(Actions.showMessage({ message: 'YS 新聞已更新' }));

        history.push({
          pathname: '/staff/news-list'
        });
      })
  }
}

export function deleteNews(newsId) {
  return dispatch => {
    eventBusService.deleteNews(newsId)
      .then(payload => {

        dispatch(syncHomePageNews())
        dispatch(Actions.showMessage({ message: 'YS 新聞已刪除' }));

        history.push({
          pathname: '/staff/news-list'
        });
      })
  }
}
