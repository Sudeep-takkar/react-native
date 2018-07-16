import { combineReducers } from 'redux';
import GPSReducer from './GPSReducer';

export default combineReducers({
	GPSPoints: GPSReducer
});