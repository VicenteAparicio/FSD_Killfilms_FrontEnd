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

    // let connection = "http://localhost:3005";
    let connection = "https://killfilmsbackend.herokuapp.com";

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
        // await axios.post('http://localhost:3005/orders/neworder', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        await axios.post(`${connection}/orders/neworder`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})

        

        } catch (err) {
            console.log({message: err.message})
        }
    }

    const updateTimesWatched = async (element) =>{
        let count = element.howManyTimesWatched+1;

        let watchDates = [];
        watchDates.push(element.watchDates);
        watchDates.push(new Date());

        let body = {
            "userId": props.logData.user.id,
            "orderId": element.id,
            "howManyTimesWatched" : count,
            "watchDates": watchDates
        }
        await axios
            // .post('http://localhost:3005/orders/modifycount', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
            .post(`${connection}/orders/modifycount`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
    }

    const watchMovie = async () => {
        let body = {
            "userId": props.logData.user.id
        }
        // let res = await axios.post('http://localhost:3005/orders/orderuserid', body, {headers: {'Authorization': `Basic ${props.logData.token}`}})
        let res = await axios.post(`${connection}/orders/orderuserid`, body, {headers: {'Authorization': `Basic ${props.logData.token}`}})

        if (res.data[0]){
            let count = 0;
                res.data.forEach(element => {
                    if (element.titleMovie === props.detail.title){
                        count = 1;
                        updateTimesWatched(element);
                    }
                });
                if (count === 0){
                    saveWatchUser();
                }
        } else {
            saveWatchUser();
        }
    }
    
        


    if (props.logData.token){
    
        return (
            <div className="containerWatch">

                <div className="playMovieBox">
                
                        <iframe className="filmTransmission" src={props.detail.urlTrailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true"></iframe>


                </div>
                <div className="menuWatch">
                    <div className="detailOptions">
                            <div className="buttonDetails" onClick={()=>back()}><FontAwesomeIcon className="faIcons" icon={faAngleLeft}/></div>
                            <div className="buttonDetails" onClick={()=>watchMovie()}><FontAwesomeIcon className="faIcons" icon={faPlayCircle}/></div>
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
    {logData:state.credentials,
    detail:state.selection}
))(Watch);