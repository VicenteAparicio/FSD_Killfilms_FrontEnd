// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import { SELECTMOVIE } from '../../redux/types';
import { ADMINACTION } from '../../redux/types';

const Allmovies = (props) => {


    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        setLoading(true);
        Allmovies();
    },[]);

    useEffect(() => {
        setFilteredMovies(
          movies.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
        );
    }, [search, movies]);

    const selectMovie = (movie) => {
        props.dispatch({type:SELECTMOVIE,payload:movie});
        props.dispatch({type:ADMINACTION,payload:"moviedetail"})
    }

    const Allmovies = async () => {
        try{
            let res = await axios.get('http://localhost:3005/movies/allmovies', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setMovies(res.data);
            setLoading(false);
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const setSearcher = (arg) => {
        if (arg.length>2){
            setSearch(arg)
        } else {

            setSearch('');
        }
    }

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";

    if (loading) {
        return <p>"Loading movies"</p>
    }

    


    return (
        <div className="allmoviesContainer">
            <div className="searchMovieContainer">
                <input className="inputClientAction" type="text" placeholder="Search movie" onChange={(e)=>setSearcher(e.target.value)}></input>
            </div>
            {/* <div className="scrollMovies" onClick={()=>Scrollmovies("-")}>-</div> */}
            <div className="movieBox">
                {filteredMovies.map((movie, index)=>(
                    
                    <div className="movieCard" key={index}>
                        <img src={`${path}/${size}${movie.poster_path}`} alt={movie.title} onClick={()=>selectMovie(movie)}/>

                    </div>
                ))}
            </div>
            {/* <div className="scrollMovies" onClick={()=>Scrollmovies("+")}>+</div> */}
  
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Allmovies);