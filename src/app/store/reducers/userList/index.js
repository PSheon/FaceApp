import * as Actions from 'app/store/actions/userList';

const initialState = {
	docs: null,
	searchText: '',
	selectedUserIds: [],
	routeParams: {},
	totalPages: 10,
	totalUsers: 0,
	userInfoDialog: {
		props: {
			open: false
		},
		data: null
	}
};

const userListReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_USER_LIST:
			{
				const { users, routeParams, totalPages, totalUsers } = action.payload;

				return {
					...state,
					docs: users,
					routeParams: routeParams,
					totalPages: totalPages,
					totalUsers: totalUsers,
				};
			}
		case Actions.UPDATE_USER_LIST:
			{
				const { users, routeParams, totalPages } = action.payload;
				const userIdSet = new Set(state.docs.map(item => item._id));
				let tempUsersArr = [];

				users.map((user) => !userIdSet.has(user._id) ? tempUsersArr.push(user) : null)

				return {
					...state,
					docs: [
						...state.docs,
						...tempUsersArr,
					],
					routeParams: routeParams,
					totalPages: totalPages,
				};
			}
		case Actions.SET_SEARCH_TEXT:
			{
				const { searchText } = action.payload;
				return {
					...state,
					searchText: searchText
				};
			}
		case Actions.TOGGLE_IN_SELECTED_USERS:
			{

				const { userId } = action.payload;

				let selectedUserIds = [...state.selectedUserIds];

				if (selectedUserIds.find(id => id === userId) !== undefined) {
					selectedUserIds = selectedUserIds.filter(id => id !== userId);
				}
				else {
					selectedUserIds = [...selectedUserIds, userId];
				}

				return {
					...state,
					selectedUserIds: selectedUserIds
				};
			}
		case Actions.SELECT_ALL_USERS:
			{
				const arr = Object.keys(state.docs).map(k => state.docs[k]);

				const selectedUserIds = arr.map(user => user._id);

				return {
					...state,
					selectedUserIds: selectedUserIds
				};
			}
		case Actions.DESELECT_ALL_USERS:
			{
				return {
					...state,
					selectedUserIds: []
				};
			}
		case Actions.OPEN_USER_INFO_DIALOG:
			{
				return {
					...state,
					userInfoDialog: {
						props: {
							open: true
						},
						data: action.payload.data
					}
				};
			}
		case Actions.CLOSE_USER_INFO_DIALOG:
			{
				return {
					...state,
					userInfoDialog: {
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.UPDATE_USER_PERMISSION:
			{
				const { userId, role } = action.payload;

				const newdocs = state.docs.map(user => {
					if (user._id === userId) {
						return {
							...user,
							role
						}
					} else {
						return user
					}
				})
				return {
					...state,
					docs: newdocs
				};
			}
		default:
			{
				return state;
			}
	}
};

export default userListReducer;
