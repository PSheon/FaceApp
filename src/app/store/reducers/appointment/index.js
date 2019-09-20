import { combineReducers } from 'redux';
import consulting from './consulting.reducer';
import borrow from './borrow.reducer';
import guide from './guide.reducer';
import selfLogs from './selfLogs.reducer';

const adminDashboardReducers = combineReducers({
  consulting,
  borrow,
  guide,
  selfLogs,
});

export default adminDashboardReducers;
