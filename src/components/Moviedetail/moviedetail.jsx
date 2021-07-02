// IMPORT MOTORS
import React from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';


const Moviedetail = (props) => {
    
    let history = useHistory();

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";

    const back = () => {
        props.dispatch({type:ADMINACTION,payload:"allmovies"})
    }
    const playMovie = () => {
        history.push('/viewMovie');
    }

    if(props.logData.token){
        return (
            <div className="detailMovieContainer">
                        
                {/* <div className="movieDetailBox" style={{backgroundImage: `url(${path}/${size2}${props.detail.poster_path})`}}> */}
                <div className="movieDetailBox" >
                    
                    <div className="movieDetailCard">
                        
                        <img src={`${path}/${size}${props.detail.poster_path}`} alt={props.detail.title}/>
                        
                        <div className="movieData">
                        
                            <div className="movieName">{props.detail.title}</div>
                            <div className="movieInfo">Director: {props.detail.director}</div>
                            <div className="movieInfo">Genre: {props.detail.genre.split(',').join(', ')}</div>
                            <div className="movieInfo">Actors: {props.detail.actors.split(',').join(', ')}</div>        
                            <div className="movieInfo">Overview: {props.detail.overview}</div>
                        </div>

                    </div>
                    <div className="detailOptions">
                        <div className="buttonDetails" onClick={()=>back()}><FontAwesomeIcon className="faIcons" icon={faAngleLeft}/></div>
                        <div className="buttonDetails" onClick={()=>playMovie()}><FontAwesomeIcon className="faIcons" icon={faPlayCircle}/></div>
                    </div>
                </div>
                <div className="trailerBox">
                    <iframe className="youtubeTrailer" src={props.detail.urlTrailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                

            </div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    detail:state.selection}
))(Moviedetail);