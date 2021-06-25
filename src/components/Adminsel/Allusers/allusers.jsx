import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const Allusers = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        Allusers();
    },[]);

    useEffect(()=>{
    });

    const Allusers = async () => {
        try{
            let res = await axios.get('http://localhost:3005/users/allUsers', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setUsers(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
    }

    if (props.logData.user?.isAdmin){
        return (
            <div className="allusersContainer">
                        
                <div className="usersBox">
                    {users.map((user, index)=>(
                        
                        <div className="usersCard" key={index}>
                            <div className="usersData">
                                <div className="usersName">{user.name}</div>
                                <div className="usersInfo">{user.lastname}</div>
                                <div className="usersInfo">{user.email}</div>
                                <div className="usersInfo">{user.country}</div>
                                <div className="usersInfo">{user.city}</div>
                            </div>
                        </div>
                    ))}
                </div>
    
            </div>
                
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Allusers);