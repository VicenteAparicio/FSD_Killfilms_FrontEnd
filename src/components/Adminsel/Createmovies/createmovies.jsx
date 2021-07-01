// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Createmovies = (props) => {

    const [titleMovie, setTitleMovie] = useState({title:''});

    useEffect(()=>{
        
    },[]);

    useEffect(()=>{
    });

    // Handler
    const updateTitle = (e) => {
        setTitleMovie({[e.target.name]: e.target.value});
    }

    const Createmovie = async () => {

        let body = {
            "title": titleMovie.title,
        }

        axios
            .post('http://localhost:3005/movies/createmovie', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        
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
            <div className="createmoviesContainer">

                <div className="createBox">
                    <label className="labelCreate" for="title">CREATE MOVIE</label>
                    <input className="inputCreate" name="title" onChange={updateTitle} placeholder="Title"></input>
                    <div className="createButton" onClick={()=>Createmovie()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
                </div>
        
            </div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Createmovies);