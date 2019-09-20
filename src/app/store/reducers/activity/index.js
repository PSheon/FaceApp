import { combineReducers } from 'redux';
import selfLogs from './selfLogs.reducer';
import eventLogs from './eventLogs.reducer';
// import speakerStars from './speakerStars.reducer';

const activityReducers = combineReducers({
  selfLogs,
  eventLogs,
  // speakerStars,
});

export default activityReducers;
