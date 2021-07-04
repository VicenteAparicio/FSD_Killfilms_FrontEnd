import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Allorders = (props) => {
    let history = useHistory();

    const [orders, setOrders] = useState([]);
    const [search, setSearch] =useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showDelete, setShowDelete] = useState('');
    const [showSearchBar, setShowSearchBar] = useState('');
    
    

    useEffect(()=>{
        if (props.logData.user.isAdmin){
            allOrders();
        } else {
            ordersByUserId();
        }
        userControl();
    },[]);

    const ordersByUserId = async () => {
        try{
            let body = {
                "userId": props.logData.user.id
            }
            let res = await axios.post('http://localhost:3005/orders/orderuserid', body, {headers: {'Authorization': `Basic ${props.logData.token}`}});
            setOrders(res.data)
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const userControl = () => {
        switch (props.logData.user.isAdmin){
            case true:
                setShowDelete("deleteOrderButton");
                setShowSearchBar("searchBar");
                break;
            case false:
                setShowDelete("hide");
                setShowSearchBar("hide");
                break;
            default:
                
                break;
        }
    }

    useEffect(()=>{
        let orderFilter = [];

        if (!search){
            setFilteredOrders(orders);

        } else {
            orders.map((order, index)=>{
                if (order.userId === search){
                    orderFilter.push(order);
                }
            })
            setFilteredOrders(orderFilter);

        }
    }, [search, orders]);

    
    const searchOrderId = (arg) =>{
        setSearch(arg);
    }

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
                "orderId": orderId
            }
            await axios.post('http://localhost:3005/orders/delete', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        } catch (err) {
            console.log({message: err.message})
        }
        allOrders();
    }
    if (props.logData.token){
        return (
            <div className="allOrdersContainer">

                <div className="searchMovieContainer">
                    <input className={showSearchBar} name="orderSearch" type="text" placeholder="Search by user id" onChange={(e)=>searchOrderId(e.target.value)}></input>

                </div>
                        
                <div className="ordersBox">
                    <div className="titlesBox">
                        <div className="orderInfo">ID</div>
                        <div className="orderMovieName">TITLE</div>
                        <div className="orderInfo">USER ID</div>
                        <div className="orderInfo">VIEWS</div>
                        <div className="orderDate">CREATE AT</div>
                    </div>
                    {filteredOrders.map((order, index)=>(
                        
                        <div className="orderCard" key={index}>
                            
                            <div className="orderData">
                                <div className="orderInfo">{order.id}</div>
                                <div className="orderMovieName">{order.titleMovie}</div>
                                <div className="orderInfo">{order.userId}</div>
                                <div className="orderInfo">{order.howManyTimesWatched}</div>
                                <div className="orderDate">{order.createdAt}</div>
                            </div>
                            <div className={showDelete} onClick={()=>deleteOrder(order.id)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                        
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
))(Allorders);