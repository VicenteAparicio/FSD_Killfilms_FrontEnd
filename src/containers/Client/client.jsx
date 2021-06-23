import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
//IMPORT STYLES
import '../../Global.css'

const Client = (props) => {

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        Allmovies();
    },[]);

    useEffect(()=>{
        Allmovies();
    });

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
        <div className="profileContainer">
                    
                    <div className="movieBox">
                        {movies.map((movie, index)=>(
                            
                            <div className="movieCard" key={index}>
                                <div className="movieData">
                                    <img src={`${path}/${size}${movie.poster_path}`} alt={movie.title}/>
                                    {console.log("esto es lo que me lleg", movie)}
                                    <div className="movieName">{movie.title}</div>
                                    <div className="movieInfo">ID: {movie.director}</div>
                                    <div className="movieInfo">Coach: {movie.actors}</div>
                                    <div className="movieInfo">Date: {movie.overview}</div>
                                </div>
                            </div>
                        ))}
                    </div>
  
                </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Client);