// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//IMPORT STYLE
import '../../Global.css';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Register = () => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({name:'',lastName:'',email:'',password:'',birthDate:'',country:'',city:'', cp:'',isAdmin:'false',isPremium:'false',isActive:'true'});
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
                if ((credentials.name.length < 2)||(! /^[a-z ,.'-]+$/i.test(credentials.name))||(credentials.name.length > 20)){
                    setErrors({...errors, eName: 'Introduce un nombre válido'});
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(credentials.email)){
                    setErrors({...errors, eEmail: 'Introduce un email válido 2'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(credentials.password)){
                    setErrors({...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                }else{
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(credentials.phone))||(credentials.phone.length > 16)){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;


            default:
                break;
        }
    }

    const Registration = async () => {
        //Primero  testeamos los datos
        // if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/){
        //     setMensajeError("Introduce un email válido");
        // } 

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
            isPremium: credentials.isPremium,
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
    
                

                <div className="sendButton" onClick={()=>Registration()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
                <div>{msgError}</div>
            </div>
        </div>
    )

}

export default Register;