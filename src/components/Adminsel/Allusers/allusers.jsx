import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Allusers = (props) => {

        let connection = "http://localhost:3005";
        // let connection = "https://killfilms.herokuapp.com";
        // let connection = "https://killfilmsbackend.herokuapp.com";

    let history = useHistory();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] =useState('');
    const [searchEmail, setSearchEmail] =useState('');

    useEffect(()=>{
        allUsers();
    },[]);

    // Search by user ID
    useEffect(()=>{
        let userFilter = [];

        if (!search){
            setFilteredUsers(users);

        } else {
            users.map((user, index)=>{
                if (user.id == search){
                    userFilter.push(user);
                }
            })
            setFilteredUsers(userFilter);

        }
    }, [search, users]);

    // ORDERS BY EMAil
    const updateUsersByEmail = () => {
        setFilteredUsers(
            users.filter((user)=>
                user.email.toLowerCase().includes(searchEmail.toLowerCase())
            )
        );
    }

    const allUsers = async () => {
        try{
            // let res = await axios.get('http://localhost:3005/users/allUsers', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            let res = await axios.get(`${connection}/users/allUsers`, {headers: {'Authorization': `Basic ${props.logData.token}`}});

            setUsers(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
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
        allUsers();
    }

    // HANDLER SEARCH BY ID
    const searchUserId = (arg) => {
        setSearch(arg);
        console.log(arg)
    }
    // HANDLER SEARCH BY TITLE
    const searchByEmail = (arg) => {
        if (arg.length>2){
            setSearchEmail(arg)
        } else {
            setSearchEmail('');
        }
        updateUsersByEmail();
    }

    if (props.logData.user?.isAdmin){
        return (
            <div className="allUsersContainer">

                <div className="searchMovieContainer">
                    <input className="searchBar" name="orderSearch" type="text" placeholder="User id" onChange={(e)=>searchUserId(e.target.value)}></input>
                    <input className="searchBar" name="orderSearch" type="text" placeholder="Email" onChange={(e)=>searchByEmail(e.target.value)}></input>

                </div>
                
                        
                <div className="usersBox">
                    <div className="titlesBox">
                        <div className="usersInfoShort">ID</div>
                        <div className="usersInfo">NAME</div>
                        <div className="usersInfo">LASTNAME</div>
                        <div className="usersInfo">EMAIL</div>
                        <div className="usersInfoBoolean">PREMIUM</div>
                        <div className="usersInfoBoolean">ADMIN</div>
                    </div>
                    {filteredUsers.map((user, index)=>(
                        
                        <div className="userCard" key={index}>
                            
                            <div className="userData">
                                <div className="usersInfoShort">{user.id}</div>
                                <div className="usersInfo">{user.name}</div>
                                <div className="usersInfo">{user.lastname}</div>
                                <div className="usersInfo">{user.email}</div>
                                <div className="usersInfoBoolean">{user.isPremium.toString()}</div>
                                <div className="usersInfoBoolean">{user.isAdmin.toString()}</div>
                            </div>
                            <div className="userButton" onClick={()=>deleteUser(user.id)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                        
                        </div>
                    ))}
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
))(Allusers);