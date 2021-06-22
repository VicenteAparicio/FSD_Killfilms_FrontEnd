import React, {useState} from 'react';
import {connect} from 'react-redux';
//IMPORT STYLES
import '../../Global.css'
import './profile.css';

const Profile = (props) => {
    return (
        <div>Bienvenido {props.logData.user.name}</div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Profile);