// IMPORT MOTORS
import React from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
//IMPORT COMPONENTS

// IMPORT STYLES
import '../../Global.css';
import { LOGOUT } from '../../redux/types';

const Navbar = (props) => {

    let history = useHistory();
    //FUNCTIONS
    const Login = () => {
        history.push('/login');
    }
    const Home = () => {
        console.log("/")
    }
    const Register = () => {
        history.push('/register');
    }

    const Logout = () => {
        props.dispatch({type:LOGOUT});
    }

    if (props.logData.token){

        return (
            <div id="navbar">
                <div id="desplegable" >
                    {/* <img id="menu" src={menu} alt="Menu container" onClick=""/> */}
                    <div id="navLinkBox" className="linksContainer" >
                        <div className="links">{props.logData?.user.name.toUpperCase()}</div>
                        <div className="links" onClick={()=>Logout()}>LOGOUT</div>
                    </div>
                </div>
            </div>
        )

    } else {

        return (
            <div id="navbar">
                <div id="desplegable" >
                    {/* <img id="menu" src={menu} alt="Menu container" onClick=""/> */}
                    <div id="navLinkBox" className="linksContainer" >
                        <div className="links" onClick={()=>Home()}>HOME</div>
                        <div className="links" onClick={()=>Login()}>LOGIN</div>
                        <div className="links" onClick={()=>Register()}>REGISTER</div>
                    </div>
                </div>
            </div>
        )
}
}

export default connect((state)=>(
    {logData:state.credentials}
))(Navbar);