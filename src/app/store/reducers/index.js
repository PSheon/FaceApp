import { combineReducers } from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';
import userList from './userList';
import staffList from './staffList';
import uploads from './uploads';
import homePage from './homePage';
import activity from './activity';
import appointment from './appointment';
import adminDashboard from './adminDashboard';

const createReducer = (asyncReducers) =>
	combineReducers({
		auth,
		fuse,
		quickPanel,

		userList,
		staffList,
		uploads,

		homePage,
		activity,
		appointment,
		adminDashboard,

		...asyncReducers,
	});

export default createReducer;
