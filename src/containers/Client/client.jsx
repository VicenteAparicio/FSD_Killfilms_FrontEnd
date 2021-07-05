// IMPORT MOTORS
import React from "react";
import {connect} from 'react-redux';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faIdCard, faReceipt} from '@fortawesome/free-solid-svg-icons';
const Client = (props) => {

    

    const clientFn = (arg) => {
        switch (arg) {
            case "allmovies":
                props.dispatch({type:ADMINACTION,payload:"allmovies"})
                break;
            case "allorders":
                props.dispatch({type:ADMINACTION,payload:"allorders"})
                break;
            case "profile":
                props.dispatch({type:ADMINACTION,payload:"profile"})
                break;

            default:
                break;

        }
    }


    return (
        <div className="clientContainer">
            <div className="clientBox">
            <div className="clientActions" onClick={()=>clientFn("allmovies")}><FontAwesomeIcon className="faIcons" icon={faFilm}/></div>
            <div className="adminActions" onClick={()=>clientFn("allorders")}><FontAwesomeIcon className="faIcons" icon={faReceipt}/></div>
            <div className="adminActions" onClick={()=>clientFn("profile")}><FontAwesomeIcon className="faIcons" icon={faIdCard}/></div>
                {/* <div className="adminActions" onClick={()=>AdminFn("allusers")}>ALL USERS</div>
                <div className="adminActions" onClick={()=>AdminFn("createmovies")}>CREATE MOVIES</div> */}
                
            </div>

            <Visual/>                
        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Client);