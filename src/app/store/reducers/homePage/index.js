import { combineReducers } from 'redux';
import carousels from './carousels.reducer';
import news from './news.reducer';
import information from './information.reducer';
import speakers from './speakers.reducer';
import events from './events.reducer';

const fuseReducers = combineReducers({
  carousels,
  news,
  information,
  speakers,
  events,
});

export default fuseReducers;
