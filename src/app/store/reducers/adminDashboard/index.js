import { combineReducers } from 'redux';
import newRegisteredUser from './newRegisteredUser.reducer';
import reviewStars from './reviewStars.reducer';
import genderStastic from './genderStastic.reducer';
import employmentStatusStastic from './employmentStatusStastic.reducer';
import agePeriodStastic from './agePeriodStastic.reducer';
import educationStastic from './educationStastic.reducer';
import heardFromStastic from './heardFromStastic.reducer';

const adminDashboardReducers = combineReducers({
  newRegisteredUser,
  reviewStars,
  genderStastic,
  employmentStatusStastic,
  agePeriodStastic,
  educationStastic,
  heardFromStastic
});

export default adminDashboardReducers;
