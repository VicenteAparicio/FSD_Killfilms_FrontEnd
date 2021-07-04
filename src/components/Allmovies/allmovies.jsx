// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import { SELECTMOVIE } from '../../redux/types';
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faStar } from '@fortawesome/free-solid-svg-icons';

const Allmovies = (props) => {

    // const [genre, setGenre] = useState({options:''});
    const [showDelete, setShowDelete] = useState('');
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [searchActor, setSearchActor] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        allMovies();
        userControl();
    },[]);

    

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
        );
        
    }, [search, movies]);

    const updateGenre = (e) => {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.genre.toLowerCase().includes(e.target.value)
            )
        );
    }

    const updateActors = () => {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.actors.toLowerCase().includes(searchActor.toLowerCase())
            )
        );
    }

    const userControl = () => {
        switch (props.logData.user.isAdmin){
            case true:
                setShowDelete("deleteButton");
                break;
            case false:
                setShowDelete("hideButton");
                break;
            default:
                setShowDelete("");
                break;
        }
    }

    const searcher = (option, arg) => {
        switch(option){
            case 'titleSearch':
                if (arg.length>2){
                    setSearch(arg)
                } else {
                    setSearch('');
                }
                break;
            case 'actorSearch':
                if (arg.length>2){
                    setSearchActor(arg)
                } else {
                    setSearchActor('');
                }
                updateActors();
                break;
            default:
                break;
        }
    }

    const selectMovie = (movie) => {
        props.dispatch({type:SELECTMOVIE,payload:movie});
        props.dispatch({type:ADMINACTION,payload:"moviedetail"})
    }

    const allMovies = async () => {
        try{
            let res = await axios.get('http://localhost:3005/movies/allmovies', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setMovies(res.data);
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const deleteMovie = async (title) => {
        try{
            let body = {
                "title": title
            }
            await axios.post('http://localhost:3005/movies/deletemovie', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
            alert("La película " +  title + " ha sido eliminada")
        } catch (err) {
            console.log({message: err.message})
        }
        allMovies();
    }

    const editPremium = (title, isPremium) => {
        premiumMovie(title, isPremium);
        userControl(isPremium);
    }

    const premiumMovie = async (movieTitle, premiumCheck) => {
        try{
            let body = {
                "title": movieTitle,
                "isPremium": premiumCheck
            }
            await axios.post('http://localhost:3005/movies/updatemovie', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        } catch (err) {
            console.log({message: err.message})
        }
        allMovies();     
    }

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";

    return (
        <div className="allMoviesContainer">

            <div className="searchMovieContainer">
                <input className="searchBar" name="titleSearch" type="text" placeholder="Search movie" onChange={(e)=>searcher(e.target.name, e.target.value)}></input>

                <input className="searchBar" name="actorSearch" type="text" placeholder="Actor" onChange={(e)=>searcher(e.target.name, e.target.value)}></input>

                <select name="options" className="searchBar" onChange={updateGenre}>
                    <option className="selectOptions" type="selectOpt" value="">Genre</option>
                    <option className="selectOptions" value="adventure">ADVENTURE</option>
                    <option className="selectOptions" value="action">ACTION</option>
                    <option className="selectOptions" value="fantasy">FANTASY</option>
                    <option className="selectOptions" value="science fiction">SCI-FI</option>
                    <option className="selectOptions" value="horror">HORROR</option>
                    <option className="selectOptions" value="crime">CRIME</option>
                    <option className="selectOptions" value="romance">ROMANCE</option>
                    <option className="selectOptions" value="comedy">COMEDY</option>
                    <option className="selectOptions" value="thriller">THRILLER</option>
                    <option className="selectOptions" value="drama">DRAMA</option>
                    <option className="selectOptions" value="animation">ANIMATION</option>
                </select>    
            </div>

            <div className="moviesContainer">
                {filteredMovies.map((movie, index)=>(
                    <div className="movieBox">
                    <div className="movieCard" key={index}>
                        <img className="moviePoster" src={`${path}/${size}${movie.poster_path}`} alt={movie.title} onClick={()=>selectMovie(movie)}/>
                    </div>
                    <div className={showDelete} onClick={()=>deleteMovie(movie.title)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                    <div className={movie.isPremium.toString().concat('Premium')} onClick={()=>editPremium(movie.title, movie.isPremium)}><FontAwesomeIcon className="faIcons" icon={faStar}/></div>
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