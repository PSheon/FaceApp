import { combineReducers } from "redux";
import model from "./model.reducer";
import matcher from "./matcher.reducer";
import descriptor from "./descriptor.reducer";

const homeReducers = combineReducers({
  model,
  matcher,
  descriptor
});

export default homeReducers;
