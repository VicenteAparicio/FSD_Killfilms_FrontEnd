// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//IMPORT STYLE
import '../../Global.css';

const Register = () => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({name:'',lastName:'',email:'',password:'',birthDate:'',country:'',city:'', cp:'',isAdmin:'false',isActive:'true'});
    const [errors, setErrors] = useState({eName: '',eLastName: '',eEmail: '',ePassword:'',eBirthDate:'',eCountry:'',eCity:'', cp:''});

    const [msgError, setMensajeError] = useState('');

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        switch (arg){
            case 'name':
                if(credentials.name.length < 4){
                    setErrors({...errors, eName: 'El nombre debe de tener 4 caracteres'});
                }else{
                    setErrors({...errors, eName: ''});
                }
                break;
            case 'email':
                break;
            default:
                break;
        }
    }

    const Registration = async () => {
        //Primero  testeamos los datos
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/){
            setMensajeError("Introduce un email válido");
        } 

        //A continuación genearmos el body de datos
        let body = {
            name: credentials.name,
            lastname: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
            birthdate: credentials.birthDate,
            country: credentials.country,
            city: credentials.city,
            cp: credentials.cp,
            isAdmin: credentials.isAdmin,
            isActive: credentials.isActive
        }
        
        axios
            .post('http://localhost:3005/users/newuser', body)
            .then((res)=>{
                if(res){
                    alert("Gracias por registrarte con nosotros")
                    history.push('/login')
                }
            })
            .catch((error)=>{
                console.log(error);
            });   
    }
    

    

    return (

        <div className="containerRegister">
            {/* <pre>{JSON.stringify(credentials,null,2)}</pre> */}
            <div className="boxRegister">
                <label className="labelsRegister" for="name">NAME</label>
                <input require="true" className="inputsRegister" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                <div>{errors.eName}</div>
                <label className="labelsRegister" for="lastName">LASTNAME</label>
                <input require="true" className="inputsRegister" type="text" name="lastName" onChange={updateCredentials} onBlur={()=>checkError("lastname")} placeholder="Lastname"/>
                <div>{errors.eLastName}</div>
                <label className="labelsRegister" for="email">EMAIL</label>
                <input require="true" className="inputsRegister" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                <div>{errors.eEmail}</div>
                <label className="labelsRegister" for="password">PASSWORD</label>
                <input require="true" className="inputsRegister" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                <div>{errors.ePassword}</div>
                <label className="labelsRegister" for="birthDate">BIRTHDATE</label>
                <input className="inputsRegister" type="date" name="birthDate" onChange={updateCredentials} onBlur={()=>checkError("birthdate")} placeholder="Birth date"/>
                <div>{errors.eBirthDate}</div>
                <label className="labelsRegister" for="country">COUNTRY</label>
                <input className="inputsRegister" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                <div>{errors.eCountry}</div>
                <label className="labelsRegister" for="city">CITY</label>
                <input className="inputsRegister" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                <div>{errors.eCity}</div>
                <label className="labelsRegister" for="cp">CP</label>
                <input className="inputsRegister" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                <div>{errors.eCP}</div>
    
                

                <div className="sendButton txtGreen dinC" onClick={()=>Registration()}>ACCEPT</div>
                <div>{msgError}</div>
            </div>
        </div>
    )

}

export default Register;