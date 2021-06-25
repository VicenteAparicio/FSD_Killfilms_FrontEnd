// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

// IMPORT ACTIONS
import { SELECTMOVIE } from '../../redux/types';

const Allmovies = (props) => {

    let history = useHistory();

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        Allmovies();
    },[]);

    useEffect(()=>{
    });

    const SelectMovie = (movie) => {
        props.dispatch({type:SELECTMOVIE,payload:movie});
        history.push('/moviedetails')
    }

    const Allmovies = async () => {
        try{
            let res = await axios.get('http://localhost:3005/movies/allmovies', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setMovies(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";


    return (
        <div className="allmoviesContainer">
                    
                    <div className="movieBox">
                        {movies.map((movie, index)=>(
                            
                            <div className="movieCard" key={index}>
                                <img src={`${path}/${size}${movie.poster_path}`} alt={movie.title} onClick={()=>SelectMovie(movie)}/>
                                {/* <div className="movieData">
                                    <div className="movieName">{movie.title}</div>
                                    <div className="movieInfo">{movie.director}</div>
                                    <div className="movieInfo">{movie.actors}</div>
                                    <div className="movieInfo">{movie.overview}</div>
                                </div> */}
                            </div>
                        ))}
                    </div>
  
                </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Allmovies);