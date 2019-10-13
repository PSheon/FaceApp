import { combineReducers } from 'redux';
import model from './model.reducer';
import matcher from './matcher.reducer';
import camera from './camera.reducer';

const homeReducers = combineReducers({
  model,
  matcher,
  camera
});

export default homeReducers;
