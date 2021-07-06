import {CONNECTION} from '../types';

const initialState = {
    connection: "https://killfilmsbackend.herokuapp.com"
    
};

const selectMovieReducer = (state = initialState, action) => {
    switch(action.type){
        //Ejemplo de añadido de datos
        case CONNECTION:
            return action.payload;

        default : 
            return state
    }
}
export default selectMovieReducer;