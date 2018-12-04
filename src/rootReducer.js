import { combineReducers } from 'redux';

import game from './game/reducer';
import stats from './stats/reducer';

export default combineReducers({
  game,
  stats
});
