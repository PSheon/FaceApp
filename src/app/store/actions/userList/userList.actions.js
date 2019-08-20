import axios from 'axios';

import * as Actions from 'app/store/actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const GET_USER_LIST = '[USER LIST] GET USER LIST';
export const UPDATE_USER_LIST = '[USER LIST] UPDATE USER LIST';
export const SET_SEARCH_TEXT = '[USER LIST] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_USERS = '[USER LIST] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USER LIST] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USER LIST] DESELECT ALL USERS';
export const OPEN_USER_INFO_DIALOG = '[USER LIST] OPEN USER INFO DIALOG';
export const CLOSE_USER_INFO_DIALOG = '[USER LIST] CLOSE USER INFO DIALOG';
export const UPDATE_USER_PERMISSION = '[USER LIST] UPDATE USER PERMISSION';
export const UPDATE_USER_ACTIVE = '[USER LIST] UPDATE USER ACTIVE';

export function getUserList(routeParams) {
	/* 
		routeParams
		{
			filter,
			fields,
			page,
			limit,
			sort,
			order
		}
	*/
	const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/user`, {
		params: routeParams
	});

	return (dispatch) =>
		request.then((response) => dispatch({
			type: GET_USER_LIST,
			payload: {
				users: response.data.docs,
				routeParams,
				totalPages: response.data.totalPages,
				totalUsers: response.data.totalDocs,
			},
		}));
}

export function updateUserListWithPageIndex(routeParams) {
	const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/user`, {
		params: routeParams
	});

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: UPDATE_USER_LIST,
				payload: {
					users: response.data.docs,
					routeParams: {
						...routeParams,
						page: routeParams.page - 1,
					},
					totalPages: response.data.totalPages,
				},
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		payload: {
			searchText: event.target.value
		}
	}
}

export function toggleInSelectedUsers(userId) {
	return {
		type: TOGGLE_IN_SELECTED_USERS,
		payload: {
			userId
		}
	}
}

export function selectAllUsers() {
	return {
		type: SELECT_ALL_USERS
	}
}

export function deSelectAllUsers() {
	return {
		type: DESELECT_ALL_USERS
	}
}

export function openUserInfoDialog(data) {
	return {
		type: OPEN_USER_INFO_DIALOG,
		payload: {
			data
		}
	}
}

export function closeUserInfoDialog() {
	return {
		type: CLOSE_USER_INFO_DIALOG
	}
}

export function updateUserPermission({ userId, email, role }) {
	return (dispatch, getState) => {

		const { routeParams } = getState().userList;

		const request = axios.patch(`${AUTH_REST_BASE_END_POINT}/api/user/permission/${userId}`, {
			email,
			role
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_USER_PERMISSION,
					payload: {
						userId,
						role,
					}
				})
			]).then(() => dispatch(getUserList(routeParams)))
		);
	};
}

export function toggleUserActivation({ userId, email, active }) {
	return (dispatch, getState) => {

		const { routeParams } = getState().userList;

		const request = axios.patch(`${AUTH_REST_BASE_END_POINT}/api/user/activation/${userId}`, {
			email,
			active
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_USER_ACTIVE
				}),
				dispatch({
					type: Actions.CLOSE_DIALOG
				})
			]).then(() => dispatch(getUserList(routeParams)))
		);
	};
}

export function deactiveUsers(userIds) {
	return (dispatch, getState) => {

		const { routeParams } = getState().userList;

		const request = axios.post('/api/contacts-app/remove-contacts', {
			userIds
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: DESELECT_ALL_USERS
				}),
				dispatch({
					type: DESELECT_ALL_USERS
				})
			]).then(() => dispatch(getUserList(routeParams)))
		);
	};
}
