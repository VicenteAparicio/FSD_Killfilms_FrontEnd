import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

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

        try{
            let res = await axios.post('http://localhost:3005/movies/createmovie', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
            alert("Película creada")
        } catch (err) {
            console.log({message: err.message})
            alert("No has puesto bien el nombre")
        }
        
    }



    return (
        <div className="createmoviesContainer">
                    
                    <div className="createBox">
                        <label className="labelCreate" for="title">CREATE MOVIE</label>
                        <input className="inputCreate" name="title" onChange={updateTitle} placeholder="Title"></input>
                        <div className="createButton" onClick={()=>Createmovie()}>ACCEPT</div>
                    </div>
  
                </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Createmovies);