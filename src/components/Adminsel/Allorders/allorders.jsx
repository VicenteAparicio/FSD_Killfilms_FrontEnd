import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Allorders = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        allOrders();
    },[]);

    useEffect(()=>{
    });

    const allOrders = async () => {
        try{
            let res = await axios.get('http://localhost:3005/orders', {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setOrders(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const deleteOrder = async (orderId) => {
        
        try{
            let body = {
                "id": orderId
            }
            await axios.post('http://localhost:3005/orders/delete', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        } catch (err) {
            console.log({message: err.message})
        }
        allOrders();
    }

    if (props.logData.user?.isAdmin){
        return (
            <div className="allOrdersContainer">
                        
                <div className="ordersBox">
                    {orders.map((order, index)=>(
                        
                        <div className="orderCard" key={index}>
                            
                            <div className="orderData">
                                <div className="orderInfo">{order.id}</div>
                                <div className="orderMovieName">{order.titleMovie}</div>
                                <div className="orderInfo">{order.userId}</div>
                                <div className="orderInfo">{order.howManyTimesWatched}</div>
                                <div className="orderDate">{order.createdAt}</div>
                            </div>
                            <div className="orderButton" onClick={()=>deleteOrder(order.id)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                        
                        </div>
                    ))}
                </div>
    
            </div>
                
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Allorders);