import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({
    userid: userReducer,
    routing
});

export default rootReducer;
