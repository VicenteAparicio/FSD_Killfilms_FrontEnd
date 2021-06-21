import React, {useState} from 'react';
// import {useHistory} from 'react-router-dom';
import axios from 'axios';

import '../../assets/fontcolors.css';
import './register.css';

const Register = () => {

    // let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({name:'',nick:'',email:'',password:'',birthdate:'',country:'',city:'',isAdmin:'false',isActive:'true'});
    const [errors, setErrors] = useState({eName: '',eNick: '',eEmail: '',ePassword:'',eBirthdate:'',eCountry:'',eCity:''});

    const [msgError, setMensajeError] = useState('');

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        // switch (arg){
        //     case 'name':
        //         if(credentials.name.length < 4){
        //             setErrors({...errors, eName: 'El nombre debe de tener 4 caracteres'});
        //         }else{
        //             setErrors({...errors, eName: ''});
        //         }
        //     break;
        //     case 'email':
        //     break;
        // }
    }

    const Registration = async () => {
        //Primero  testeamos los datos
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/){
            setMensajeError("Introduce un email válido");
        } 

        //A continuación genearmos el body de datos
        let body = {
            name: credentials.name,
            nick: credentials.nick,
            email: credentials.email,
            password: credentials.password,
            birthdate: credentials.birthdate,
            country: credentials.country,
            city: credentials.city,
            isAdmin: credentials.isAdmin,
            isActive: credentials.isActive
        }
        
        axios
            .post('http://localhost:3005/user/newuser', body)
            .then((res)=>{})
            .catch((error)=>{
                console.log(error);
            });   


    }
    

    

    return (

        <div className="containerRegister">
            {/* <pre>{JSON.stringify(credentials,null,2)}</pre> */}
            <div className="boxLogin bgGreen">
                
                <label className="labelsLogin" for="name">NAME</label>
                <input require="true" className="inputsLogin" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                <div>{errors.eName}</div>
                <label className="labelsLogin" for="nick">NICK</label>
                <input require="true" className="inputsLogin" type="text" name="nick" onChange={updateCredentials} onBlur={()=>checkError("nick")} placeholder="Nick"/>
                <div>{errors.eNick}</div>
                <label className="labelsLogin" for="email">EMAIL</label>
                <input require="true" className="inputsLogin" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                <div>{errors.eEmail}</div>
                <label className="labelsLogin" for="password">PASSWORD</label>
                <input require="true" className="inputsLogin" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                <div>{errors.ePassword}</div>
                <label className="labelsLogin" for="birthdate">BIRTHDATE</label>
                <input className="inputsLogin" type="date" name="birthdate" onChange={updateCredentials} onBlur={()=>checkError("birthdate")} placeholder="Birth date"/>
                <div>{errors.eBirthdate}</div>
                <label className="labelsLogin" for="country">COUNTRY</label>
                <input className="inputsLogin" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                <div>{errors.eCountry}</div>
                <label className="labelsLogin" for="city">CITY</label>
                <input className="inputsLogin" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                <div>{errors.eCity}</div>
    
                

                <div className="sendButton txtGreen dinC" onClick={()=>Registration()}>ACCEPT</div>
                <div>{msgError}</div>
            </div>
        </div>
    )

}

export default Register;