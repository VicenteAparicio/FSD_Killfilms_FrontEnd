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

    // let connection = "http://localhost:3005";
    let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({name:'',lastName:'',email:'',password:'',birthDate:'',country:'',city:'', cp:'',isAdmin:'false',isPremium:'false',isActive:'true'});
    const [errors, setErrors] = useState({eName: '',eLastName: '',eEmail: '',ePassword:'',eBirthDate:'',eCountry:'',eCity:'', eCP:'',eCardNumber:'',eExpiration:'',eCVV:'',eAdress:''});

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        switch (arg){
            case 'name':
            case 'cname':
            case 'lastname':
                if ((credentials.name.length < 2)||(! /^[a-z ,.'-]+$/i.test(credentials.name))||(credentials.name.length > 20)){
                    if (arg==='name'){
                        setErrors({...errors, eName: 'Not a validate name'});
                    } else if (arg==='cname'){
                        setErrors({...errors, eCName: 'Not a validate name'});
                    } else if (arg==='lastname'){
                        setErrors({...errors, eLastName: 'Not a validate lastname'});
                    } else if (arg==='clastname'){
                        setErrors({...errors, eCLastName: 'Not a validate lastname'});
                    }
                }else{
                    setErrors({...errors, eName: ''});
                    setErrors({...errors, eCName: ''});
                    setErrors({...errors, eLastName: ''});
                    setErrors({...errors, eCLastName: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(credentials.email)){
                    setErrors({...errors, eEmail: 'Not a validate email'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(credentials.password)){
                    setErrors({...errors, ePassword: 'Must contain at least 8 characters: 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
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

        //A continuación genearmos el body de datos
        let body = {
            name: credentials.name,
            lastname: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
            birthDate: credentials.birthDate,
            country: credentials.country,
            city: credentials.city,
            cp: credentials.cp,
            isAdmin: credentials.isAdmin,
            isPremium: credentials.isPremium,
            isActive: credentials.isActive
        }
        
        axios
            // .post('http://localhost:3005/users/newuser', body)
            .post(`${connection}/users/newuser`, body)
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
                <div className="personalInfo">
                    <div className="titleSection">PERSONAL INFO</div>
                    <label className="labelsRegister" for="name">NAME</label>
                    <input require="true" className="inputsRegister" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                    <div className="validateError">{errors.eName}</div>
                    <label className="labelsRegister" for="lastName">LASTNAME</label>
                    <input require="true" className="inputsRegister" type="text" name="lastName" onChange={updateCredentials} onBlur={()=>checkError("lastname")} placeholder="Lastname"/>
                    <div className="validateError">{errors.eLastName}</div>
                    <label className="labelsRegister" for="email">EMAIL</label>
                    <input require="true" className="inputsRegister" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                    <div className="validateError">{errors.eEmail}</div>
                    <label className="labelsRegister" for="password">PASSWORD</label>
                    <input require="true" className="inputsRegister" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                    <div className="validateError">{errors.ePassword}</div>
                    <label className="labelsRegister" for="birthDate">BIRTHDATE</label>
                    <input className="inputsRegister" type="date" name="birthDate" onChange={updateCredentials} onBlur={()=>checkError("birthdate")} placeholder="Birth date"/>
                    <div className="validateError">{errors.eBirthDate}</div>
                    <label className="labelsRegister" for="country">COUNTRY</label>
                    <input className="inputsRegister" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                    <div className="validateError">{errors.eCountry}</div>
                    <label className="labelsRegister" for="city">CITY</label>
                    <input className="inputsRegister" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                    <div className="validateError">{errors.eCity}</div>
                    <label className="labelsRegister" for="cp">CP</label>
                    <input className="inputsRegister" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                    <div className="validateError">{errors.eCP}</div>
                </div>
                {/* <div className="bankInfo">
                    <div className="titleSection">BANK INFO</div>
                    <label className="labelsRegister" for="cardnumber">CARD NUMBER</label>
                    <input require="true" className="inputsRegister" type="number" name="cardnumber" onChange={updateCredentials} onBlur={()=>checkError("cardnumber")} placeholder="4444 5555 6666 7777"/>
                    <div className="validateError">{errors.eCardNumber}</div>
                    <label className="labelsRegister" for="expiration">EXPIRATION</label>
                    <input require="true" className="inputsRegisterHalf" type="data" name="expiration" onChange={updateCredentials} onBlur={()=>checkError("expiration")} placeholder="10/2050"/>
                    <div className="validateError">{errors.eExpiration}</div>
                    <label className="labelsRegister" for="cvv">CVV</label>
                    <input require="true" className="inputsRegisterHalf" type="number" name="expiration" onChange={updateCredentials} onBlur={()=>checkError("cvv")} placeholder="123"/>
                    <div className="validateError">{errors.eCVV}</div>
                    
                    <label className="labelsRegister" for="cardname">CARD OWNER FIRST NAME</label>
                    <input require="true" className="inputsRegister" type="text" name="cardname" onChange={updateCredentials} onBlur={()=>checkError("cname")} placeholder="First name"/>
                    <div className="validateError">{errors.eCName}</div>
                    <label className="labelsRegister" for="cardlastname">CARD OWNER LAST NAME</label>
                    <input require="true" className="inputsRegister" type="text" name="cardlastname" onChange={updateCredentials} onBlur={()=>checkError("clastname")} placeholder="Last name"/>
                    <div className="validateError">{errors.eCLastName}</div>
                    <label className="labelsRegister" for="billingadress">BILLING ADRESS</label>
                    <input require="true" className="inputsRegister" type="text" name="billingadress" onChange={updateCredentials} onBlur={()=>checkError("billingadress")} placeholder="Adress"/>
                    <div className="validateError">{errors.eAdress}</div>
                    
                    <label className="labelsRegister" for="country">COUNTRY</label>
                    <input className="inputsRegister" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                    <div className="validateError">{errors.eCountry}</div>
                    <label className="labelsRegister" for="city">CITY</label>
                    <input className="inputsRegister" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                    <div className="validateError">{errors.eCity}</div>
                    <label className="labelsRegister" for="cp">CP</label>
                    <input className="inputsRegister" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                    <div className="validateError">{errors.eCP}</div>
                    
                </div> */}
    
                

                <div className="sendButton" onClick={()=>Registration()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>
        </div>
    )

}

export default Register;