import {combineReducers} from 'redux';
import credentials from './credentials-reducer.js';
import adminActions from './adminActions-reducer.js';


const rootReducer = combineReducers({
    credentials, adminActions
});

export default rootReducer;