import BigNumber from "bignumber.js"

import * as Actions from '../actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import { avatarNameToPathConverter } from 'app/utils';

const initialState = {
	role: [],//guest
	data: {
		'displayName': '神秘企鵝',
		'photoURL': 'assets/images/avatars/penguin.png',
		'email': 'penguin@gmail.com',
		shortcuts: [
			'ys-home',
		]
	}
};

const user = function (state = initialState, action) {
	switch (action.type) {
		case Actions.SET_USER_DATA:
			{
				let tempUserData = {
					...state,
					...action.payload
				}
				tempUserData.data.photoURL = avatarNameToPathConverter(action.payload.data.photoURL)

				return tempUserData;
			}
		case Actions.UPDATE_USER_AVATAR:
			{
				return {
					...state,
					data: {
						...state.data,
						photoURL: `${AUTH_REST_BASE_END_POINT}/uploads/avatar/${action.payload}`,
					},
				}
			}
		case Actions.UPDATE_USER_BALANCE:
			{
				const oldBalance = BigNumber(state.data.balance['$numberDecimal']);
				const plusAmount = BigNumber(action.payload);

				return {
					...state,
					data: {
						...state.data,
						balance: {
							'$numberDecimal': oldBalance.plus(plusAmount).toString(),
						}
					},
				}
			}
		case Actions.REMOVE_USER_DATA:
			{
				return {
					...state,
				};
			}
		case Actions.UPDATE_USER_PROFILE:
			{
				return {
					...state,
					data: {
						...state.data,
						...action.payload
					}
				};
			}
		case Actions.USER_LOGGED_OUT:
			{
				return initialState;
			}
		default:
			{
				return state
			}
	}
};

export default user;
