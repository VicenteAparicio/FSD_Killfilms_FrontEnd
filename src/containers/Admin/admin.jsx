import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
//IMPORT STYLES
import '../../Global.css'
import { ADMINACTION } from '../../redux/types';

const Admin = (props) => {

    const Allmovies =()=>{
        props.dispatch({type:ADMINACTION,payload:"allmovies"})
    }
    const Createmovies =()=>{
        props.dispatch({type:ADMINACTION,payload:"createmovies"})
    }


    return (
        <div className="adminContainer">
            <div className="adminBox">
                <div className="adminActions" onClick={()=>Allmovies()}>ALL MOVIES</div>
                <div className="adminActions" onClick={()=>Createmovies()}>CREATE MOVIES</div>
            </div>

            <Visual/>                
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Admin);