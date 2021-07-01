// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


const Moviedetail = (props) => {

    const path = "https://image.tmdb.org/t/p";
    const size ="w200";
    const size2 ="w400";

    const back = () => {
        props.dispatch({type:ADMINACTION,payload:"allmovies"})
    }

    if(props.logData.user){
        return (
            <div className="detailMovieContainer">
                        
                <div className="movieDetailBox" style={{backgroundImage: `url(${path}/${size2}${props.detail.poster_path})`}}>
                    
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
                
                </div>

                <div className="buttonDetails" onClick={()=>back()}><FontAwesomeIcon className="faIcons" icon={faAngleLeft}/></div>

            </div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    detail:state.selection}
))(Moviedetail);