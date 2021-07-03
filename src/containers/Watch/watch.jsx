// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const Watch = (props) => {

    let history = useHistory();

    const back = () => {
        props.dispatch({type:ADMINACTION,payload:"moviedetail"})
        if (props.logData.user.isAdmin){
            history.push("/admin")
        } else {
            history.push("/client")
        }
    }
    
    const saveWatchUser = async () =>{
        try{
            let body = {
                "userId": props.logData.user.id,
                "movieId": props.detail.id,
                "posterMovie": props.detail.poster_path,
                "titleMovie": props.detail.title,
                "howManyTimesWatched": 1,
                "watchDates": new Date()
            }
        await axios.post('http://localhost:3005/orders/neworder', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})

        } catch (err) {
            console.log({message: err.message})
        }
    }

    const updateTimesWatched = async (element) =>{
        let count = element.howManyTimesWatched+1;
        let watchDates = [];
        watchDates.push(element.watchDates);
        console.log("esto es el watchDates que llega", watchDates)
        watchDates.push(new Date());
        console.log("esto es el watchDates con la nueva date", watchDates)
        let body = {
            "orderId": element.id,
            "howManyTimesWatched" : count,
            "watchDates": watchDates
        }
        axios
            .post('http://localhost:3005/orders/modifycount', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
    }

    const watchMovie = async () => {
        let body = {
            "userId": props.logData.user.id
        }
        console.log("pasamos userId para búsqueda de las películas vistas de User id ", body.userId)
        let res = await axios.post('http://localhost:3005/orders/orderuserid', body)
        console.log("devuelve resultado de búsqueda", res.data)
        if (res?.data[0]){
                res.data.forEach(element => {
                    console.log("cada película", element)
                    console.log("cada titulo", element.titleMovie)
                    console.log("el id de la orden", element.id)
                    console.log("cuantas veces vista", element.howManyTimesWatched)
                    if (element.titleMovie === props.detail.title){
                        updateTimesWatched(element);
                        }
                });
        } else {
            saveWatchUser();
            }
        }
    
        


if (props.logData.token){
    
    return (
        <div className="containerWatch">

            <div className="playMovieBox">
            
                    <iframe className="filmTransmission" src={props.detail.urlTrailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>


            </div>
            <div className="menuWatch">
                <div className="detailOptions">
                        <div className="buttonDetails" onClick={()=>back()}><FontAwesomeIcon className="faIcons" icon={faAngleLeft}/></div><div className="buttonDetails" onClick={()=>watchMovie()}><FontAwesomeIcon className="faIcons" icon={faPlayCircle}/></div>
                </div>
            </div>
            
        </div>
    )
} else {
    setTimeout(()=>{
        history.push('/register')
    }, 1000)
    return (
        <div className="">Not allowed</div>
    )
}


}
export default connect((state)=>(
    {logData:state.credentials,
    detail:state.selection}
))(Watch);