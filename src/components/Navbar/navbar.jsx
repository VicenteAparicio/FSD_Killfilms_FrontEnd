// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';


//IMPORT COMPONENTS

// IMPORT STYLES
import '../../Global.css';
import { LOGOUT } from '../../redux/types';
import { CLEARADMINACTION } from '../../redux/types';

const Navbar = (props) => {

    const [destination, setDestination] = useState('/login');
    
    const Logout = () => {
        props.dispatch({type:LOGOUT});
        props.dispatch({type:CLEARADMINACTION})
    }

    useEffect(()=>{
        switch (props.logData.user.isAdmin){
            case true:
                setDestination("/admin")
                break;
            case false:
                setDestination("/client")
                break;
            default:
                setDestination("/login")
                break;
        }
    },[]);




    if (props.logData.token){
        
        return (
            <div id="navbar">
                <div className="menuDeploy" >
                    {/* <FontAwesomeIcon className="coffe" icon={faBars} onClick={()=>Deploymenu()}/>  */}
                    <ul id="navLinkBox" className="linksContainer" >
                        
                        {/* <li className="listLinks"><NavLink className="links" to={destination}>{props.logData?.user.name.toUpperCase()}</NavLink></li> */}
                        <li className="listLinks"><NavLink className="links" to={destination}><FontAwesomeIcon className="faIcons" icon={faUserCircle}/></NavLink></li>
                        <li className="listLinks"><NavLink className="links" onClick={()=>Logout()} to="/login" ><FontAwesomeIcon className="faIcons" icon={faSignOutAlt}/></NavLink></li>
                        {/* <li><NavLink className="links" onClick={()=>Logout()} to="/login" >LOGOUT</NavLink></li> */}
                    </ul>
                </div>
            </div>
        )

    } else {

        return (
            <div id="navbar">
                <div className="menuDeploy" >
                    {/* <FontAwesomeIcon className="coffe" icon={faBars} onClick={()=>Deploymenu()}/> */}
                    <div id="navLinkBox" className="linksContainer" >
                        {/* <li className="listLinks"><NavLink className="links" to="/">HOME</NavLink></li> */}
                        <li className="listLinks"><NavLink className="links" to="/"><FontAwesomeIcon className="faIcons" icon={faHome}/></NavLink></li>
                        <li className="listLinks"><NavLink className="links" to="/login"><FontAwesomeIcon className="faIcons" icon={faSignInAlt}/></NavLink></li>
                        {/* <li><NavLink className="links" to="/login">LOGIN</NavLink></li> */}

                        
                        <li className="listLinks"><NavLink className="links" to="/register"><FontAwesomeIcon className="faIcons" icon={faUserPlus}/></NavLink></li>
                        {/* <li className="listLinks"><NavLink className="links" to="/register">REGISTER</NavLink></li> */}
                    </div>
                </div>
            </div>
        )
}
}

export default connect((state)=>(
    {logData:state.credentials}
))(Navbar);