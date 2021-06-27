// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';


const Moviedetail = (props) => {

    // const [movies, setMovies] = useState([]);



    const path = "https://image.tmdb.org/t/p";
    const size ="w200";

    if(props.logData.user){
        return (
            <div className="detailmovieContainer">
                        
                <div className="movieDetailBox">
                    
                    <div className="movieDetailCard">
                        
                        <img src={`${path}/${size}${props.detail.poster_path}`} alt={props.detail.title}/>
                        
                        <div className="movieData">
                        
                            <div className="movieName">{props.detail.title}</div>
                            <div className="movieInfo">Director: {props.detail.director}</div>
                            <div className="movieInfo">Genre: {props.detail.genre}</div>
                            <div className="movieInfo">Actors: {props.detail.actors.split(',').join(', ')}</div>        
                            <div className="movieInfo">Overview: {props.detail.overview}</div>
                        </div>

                    </div>
                
                </div>

            </div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    detail:state.selection}
))(Moviedetail);