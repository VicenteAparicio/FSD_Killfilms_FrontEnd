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

const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({email:'',password:'',options:'user'});

    // const [Mserror, setError] = useState('');

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
        
        axios
            .post('http://localhost:3005/login', body)
            .then((res)=>{
                if(res){
                    //Guardo en RDX
                    props.dispatch({type:LOGIN,payload:res.data});
                    alert("Gracias por loguearte")
                    history.push('/profile')
                }
            })
            .catch((error)=>{
                console.log(error);
            });  
}
     
 

    

    return (

        <div className="containerLogin">
            <div className="boxLogin bgGreen">
                <label className="labelsLogin dinC" for="email">EMAIL</label>
                <input className="inputsLogin" type="email" name="email" onChange={updateCredentials} placeholder="Email"></input>
                <label className="labelsLogin dinC" for="password">PASSWORD</label>
                <input className="inputsLogin" type="password" name="password" onChange={updateCredentials} placeholder="Password"></input>
                

                <div className="sendButtonLog txtGreen dinC" onClick={()=>SignIn()}>Login</div>
            </div>
        </div>
    )

}

export default connect()(Login);