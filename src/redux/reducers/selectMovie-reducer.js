import {SELECTMOVIE} from '../types';

const initialState = {
    
};

const selectMovieReducer = (state = initialState, action) => {
    switch(action.type){
        //Ejemplo de añadido de datos
        case SELECTMOVIE:
            return action.payload;

        default : 
            return state
    }
}
export default selectMovieReducer;