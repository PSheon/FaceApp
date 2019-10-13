import { combineReducers } from 'redux';
import model from './model.reducer';
import matcher from './matcher.reducer';

const homeReducers = combineReducers({
  model,
  matcher
});

export default homeReducers;
