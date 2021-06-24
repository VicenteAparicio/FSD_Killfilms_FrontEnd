import {ADMINACTION, CLEARADMINACTION} from '../types';

const initialState = {
    action : ''
};

const adminActionsReducer = (state = initialState, action) => {
    switch(action.type){
        //Ejemplo de añadido de datos
        case ADMINACTION:
            return action.payload;
        case CLEARADMINACTION:
            return initialState;

        default : 
            return state
    }
}
export default adminActionsReducer;