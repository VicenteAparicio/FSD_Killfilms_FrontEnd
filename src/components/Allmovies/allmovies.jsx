// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import { SELECTMOVIE } from '../../redux/types';
import { ADMINACTION } from '../../redux/types';

const Allmovies = (props) => {

    // const [genre, setGenre] = useState({options:''});
    const [show, setShow] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchActor, setSearchActor] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        setLoading(true);
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
                setShow("movieButton")
                break;
            case false:
                setShow("hidebutton")
                break;
            default:
                setShow("")
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
            setLoading(false);
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

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";

    if (loading) {
        return <p>"Loading movies"</p>
    }

    return (
        <div className="allmoviesContainer">

            <div className="searchMovieContainer">
                <input className="searchBar" name="titleSearch" type="text" placeholder="Search movie" onChange={(e)=>searcher(e.target.name, e.target.value)}></input>

                <input className="searchBar" name="actorSearch" type="text" placeholder="Actor" onChange={(e)=>searcher(e.target.name, e.target.value)}></input>

                <select name="options" className="searchBar selectinputs" onChange={updateGenre}>
                    <option value="">Genre</option>
                    <option value="adventure">ADVENTURE</option>
                    <option value="action">ACTION</option>
                    <option value="fantasy">FANTASY</option>
                    <option value="science fiction">SCI-FI</option>
                    <option value="horror">HORROR</option>
                    <option value="crime">CRIME</option>
                    <option value="romance">ROMANCE</option>
                </select>    
            </div>

            <div className="moviesContainer">
                {filteredMovies.map((movie, index)=>(
                    <div className="movieBox">
                    <div className="movieCard" key={index}>
                        <img src={`${path}/${size}${movie.poster_path}`} alt={movie.title} onClick={()=>selectMovie(movie)}/>
                    </div>
                    <div className={show} onClick={()=>deleteMovie(movie.title)}>DELETE</div>
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