import {combineReducers} from 'redux';
import credentials from './credentials-reducer.js';
import adminActions from './adminActions-reducer.js';
import selection from './selectMovie-reducer.js';


const rootReducer = combineReducers({
    credentials, adminActions, selection
});

export default rootReducer;