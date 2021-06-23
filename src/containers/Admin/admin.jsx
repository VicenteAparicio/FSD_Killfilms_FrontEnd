import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
//IMPORT STYLES
import '../../Global.css'

const Admin = (props) => {

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        
    },[]);

    const Allmovies = async () => {
        try{
            let res = await axios.get('http://localhost:3005/movies/allmovies', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setMovies(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
    }


    return (
        <div className="adminContainer">
            <div className="admintext">Admin</div>

            <Visual/>                
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Admin);