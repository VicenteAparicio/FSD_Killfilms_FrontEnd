// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Createmovies = (props) => {

    // let connection = "http://localhost:3005";
    let connection = "https://killfilmsbackend.herokuapp.com";
    

    let history = useHistory();
    const [titleMovie, setTitleMovie] = useState({title:''});

    useEffect(()=>{
        
    },[]);

    useEffect(()=>{
    });

    // Handler
    const updateTitle = (e) => {
        setTitleMovie({[e.target.name]: e.target.value});
    }

    const createMovie = async () => {

        let body = {
            "title": titleMovie.title,
        }

        axios
            // .post('http://localhost:3005/movies/createmovie', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
            .post(`${connection}/movies/createmovie`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        
            .then ((res)=>{
                if(typeof res.data == "string"){
                    alert(res.data)
                } else if (typeof res.data == "object"){
                    alert("Película creada")
                }
            })
            
            .catch ((err)=> {
            console.log({message: err.message});
            alert("No has puesto bien el nombre o no se puede agregar esta película a la biblioteca, inténtalo de nuevo");
            })
    }


    if (props.logData.user?.isAdmin){
        return (
            <div className="createMoviesContainer">

                <div className="createBox">
                    <label className="labelCreate" for="title">CREATE MOVIE</label>
                    <input className="inputCreate" name="title" onChange={updateTitle} placeholder="Title"></input>
                    <div className="createButton" onClick={()=>createMovie()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
                </div>
        
            </div>
        )
    } else {

        setTimeout(()=>{
            history.push('/register')
        }, 1000);

        return (
            <div>Not allowed</div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Createmovies);