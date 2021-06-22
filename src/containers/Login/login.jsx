// IMPORT MOTORS
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
// IMPORT ACTIONS
import {LOGIN} from '../../redux/types';
// IMPORT STYLES
import '../../Global.css';
import './login.css';

const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({email:'',password:'',options:'user'});

    const [msgError, setMensajeError] = useState('');

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // FUNCION LOGUEAR
    const SignIn = async () => {

        //A continuación genearmos el body de datos
        let body = {
            email: credentials.email.toLocaleLowerCase(),
            password: credentials.password,
        }
        
        let userLogin = await axios.post('http://localhost:3005/login', body)
        //Guardo en RDX
        props.dispatch({type:LOGIN,payload:userLogin.data});

        setTimeout (()=>{
            history.push("/profile")
        }, 500)
        
    }
    

    

    return (

        <div className="containerLogin">
            <div className="boxLogin bgGreen">
                <label className="labelsLogin dinC" for="email">EMAIL</label>
                <input className="inputsLogin" type="email" name="email" onChange={updateCredentials} placeholder="Email"></input>
                <label className="labelsLogin dinC" for="password">PASSWORD</label>
                <input className="inputsLogin" type="password" name="password" onChange={updateCredentials} placeholder="Password"></input>

                <div className="sendButtonLog txtGreen dinC" onClick={()=>SignIn()}>Login</div>
                <div>{msgError}</div>
            </div>
        </div>
    )

}

export default connect()(Login);