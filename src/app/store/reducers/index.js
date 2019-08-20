import { combineReducers } from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';
import userList from './userList';
import staffList from './staffList';
import uploads from './uploads';
import homePage from './homePage';

const createReducer = (asyncReducers) =>
	combineReducers({
		auth,
		fuse,
		quickPanel,

		userList,
		staffList,
		uploads,

		homePage,

		...asyncReducers,
	});

export default createReducer;
