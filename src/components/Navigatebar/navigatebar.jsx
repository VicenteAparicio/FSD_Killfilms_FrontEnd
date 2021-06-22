// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
//IMPORT COMPONENTS
import Link from '../Link/link';
// IMPORT STYLES
import '../../Global.css';
import './navigatebar.css';

const Navbar = (props) => {

    return (
        <div id="navbar">
            <div id="desplegable" >
                {/* <img id="menu" src={menu} alt="Menu container" onClick=""/> */}
                <ul id="navLinkBox" className="linksContainer" >
                    <li><Link to="/profile" name={props.logData?.user.name}/></li>
                    <li><Link to="/" name="INICIO"/></li>
                    <li><Link to="/login" name="LOGIN"/></li>
                    <li><Link to="/register" name="REGISTRO"/></li>
                </ul>
            </div>
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Navbar);