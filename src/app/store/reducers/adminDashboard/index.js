import { combineReducers } from 'redux';
import newRegisteredUser from './newRegisteredUser.reducer';

const adminDashboardReducers = combineReducers({
  newRegisteredUser,
});

export default adminDashboardReducers;
