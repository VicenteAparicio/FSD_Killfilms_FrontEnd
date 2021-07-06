import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPen, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// IMPORT ACTIONS
import { LOGOUT } from '../../redux/types';
import { CLEARADMINACTION } from '../../redux/types';

const Profile = (props) => {

        // let connection = "http://localhost:3005";
        let connection = "https://killfilmsbackend.herokuapp.com";
        

    let history = useHistory();

    // HOOKS
    const [userEdit, setUserEdit] = useState({name:props.logData.user?.name, lastname:props?.logData.user?.lastname, password:props?.logData.user.password,birthdate:props?.logData.user.birthdate,email:props.logData.user?.email,country:props.logData.user?.country,city:props.logData.user?.city,cp:props.logData.user?.cp});
    const [allowEdit, setAllowEdit] = useState(false);

    // HANDLER
    const updateUser = (e) => {
        setUserEdit({...userEdit, [e.target.name]: e.target.value});
    }
    const edit = () => {
        setAllowEdit(true)
    }
    const cancelEdit = () => {
        setAllowEdit(false)
    }

    const saveEdit = async () => {
        let body = {
            "id": props.logData.user.id,
            "name": userEdit.name,
            "lastname": userEdit.lastname,
            // "password": userEdit.password,
            "email": userEdit.email,
            "country": userEdit.country,
            "city": userEdit.city,
            "cp": userEdit.cp
        }
        console.log(body)

        axios
        .post(`${connection}/users/modify`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        .then((res)=>{
            if (res){
                // setTimeout(()=>{
                //     history.push("/");
                // }, 1000)
            }
        })
        .catch((error)=>{
            console.log(error);
        });

        setAllowEdit(false);
        props.dispatch({type:LOGOUT});
        props.dispatch({type:CLEARADMINACTION})

        setTimeout(()=>{
            history.push("/login");
        }, 1000)
    }


    const deleteUser = async (userId) => {
        
        try{
            let body = {
                "id": userId
            }
            // await axios.post('http://localhost:3005/users/delete', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
            await axios.post(`${connection}/users/delete`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        } catch (err) {
            console.log({message: err.message})
        }
        setTimeout(()=>{
            history.push("/register");
        }, 1000)
    }



    if (props.logData.token && allowEdit === false) {

        return (
            <div className="profileContainer">

                        
                <div className="profileBox">
                    <div className="profileCard">
                        <div className="usersInfoShort">ID: {props.logData.user.id}</div>
                        <div className="usersInfo">NAME: {props.logData.user.name}</div>
                        <div className="usersInfo">LASTNAME: {props.logData.user.lastname}</div>
                        <div className="usersInfo">BIRTHDATE: {props.logData.user.birthdate}</div>{console.log(props.logData.user.birthdate)}
                        <div className="usersInfo">EMAIL: {props.logData.user.email}</div>
                        <div className="usersInfoBoolean">PREMIUM: {props.logData.user.isPremium.toString()}</div>
                        <div className="usersInfoBoolean">ADMIN: {props.logData.user.isAdmin.toString()}</div>
                    </div>
                
                    <div className="boxButton">
                        <div className="buttonProfile" onClick={()=>edit()}><FontAwesomeIcon className="faIcons" icon={faPen}/></div>
                        <div className="buttonProfile" onClick={()=>deleteUser(props.logData.user.id)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                    </div>
                </div>
            </div>
            )
    } else if (props.logData.token && allowEdit === true) {
        return (
            <div className="profileContainer">
                <div className="profileBox">
                    <div className="profileCard">
                        <div className="titleSection">EDIT ACCOUNT</div>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="name" placeholder={props.logData.user.name}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="lastname" placeholder={props.logData.user.lastname}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="email" placeholder={props.logData.user.email}></input>
                        {/* <input className="upDataInfo" onChange={updateUser} type="password" name="password" placeholder="Password" required></input> */}
                        <input className="upDataInfo" onChange={updateUser} type="text" name="country" placeholder={props.logData.user.country}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="city" placeholder={props.logData.user.city}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="cp" placeholder={props.logData.user.cp}></input>
                    </div>
                    <div className="boxButton">
                        <div className="buttonProfile" onClick={()=>saveEdit()}><FontAwesomeIcon className="faIcons" icon={faSave}/></div>
                        <div className="buttonProfile" onClick={()=>cancelEdit()}><FontAwesomeIcon className="faIcons" icon={faTimesCircle}/></div>
                    </div>
                </div>
            </div>
        )
    } else {

        setTimeout(()=>{
            history.push('/register')
        }, 1000);

        return (
            <div>Not allowed</div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Profile);