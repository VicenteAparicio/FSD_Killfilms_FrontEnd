// IMPORT MOTORS
import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee } from '@fortawesome/free-solid-svg-icons'


//IMPORT COMPONENTS

// IMPORT STYLES
import '../../Global.css';
import { LOGOUT } from '../../redux/types';

const Navbar = (props) => {

    let history = useHistory();
    //FUNCTIONS
    // const Login = () => {
    //     history.push('/login');
    // }
    // const Home = () => {
    //     console.log("/")
    // }
    // const Register = () => {
    //     history.push('/register');
    // }

    // const Logout = () => {
    //     props.dispatch({type:LOGOUT});
    // }

    const Logout = () => {
                props.dispatch({type:LOGOUT});
                history.push('/');
    }

    // const Deploymenu = () => {}

    if (props.logData.token){

        return (
            <div id="navbar">
                <div className="menuDeploy" >
                    {/* <FontAwesomeIcon className="coffe" icon={faBars} onClick={()=>Deploymenu()}/>  */}
                    <ul id="navLinkBox" className="linksContainer" >
                    
                        <FontAwesomeIcon className="coffe" icon={faCoffee}/>
                        
                        <NavLink className="links" to="#">{props.logData?.user.name.toUpperCase()}</NavLink>
                        <NavLink className="links" to="#" onClick={()=>Logout()}>LOGOUT</NavLink>
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
                        <NavLink className="links" to="/">HOME</NavLink>
                        <NavLink className="links" to="/login">LOGIN</NavLink>
                        <NavLink className="links" to="/register">REGISTER</NavLink>
                    </div>
                </div>
            </div>
        )
}
}

export default connect((state)=>(
    {logData:state.credentials}
))(Navbar);