import { combineReducers } from 'redux';

import history from './history/reducer';
import stats from './stats/reducer';

export default combineReducers({
  history,
  stats
});
