import React from 'react';
import {connect} from 'react-redux';
//IMPORT STYLES
import '../../Global.css'

const Profile = (props) => {
    return (
        <div className="containerProfile">
            <div>Bienvenido {props.logData.user.name}</div>
            <div>Peliculas</div>
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Profile);