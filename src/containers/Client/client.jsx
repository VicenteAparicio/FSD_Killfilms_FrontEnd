// IMPORT MOTORS
import React from "react";
import {connect} from 'react-redux';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faReceipt} from '@fortawesome/free-solid-svg-icons';
const Client = (props) => {

    

    const clientFn = (arg) => {
        switch (arg) {
            case "allmovies":
                props.dispatch({type:ADMINACTION,payload:"allmovies"})
                break;
                case "orders":
                    props.dispatch({type:ADMINACTION,payload:"orders"})
                    break;
            //     break;
            // case "createmovies":
            //     props.dispatch({type:ADMINACTION,payload:"createmovies"})
            //     break;
            default:
                break;

        }
    }


    return (
        <div className="clientContainer">
            <div className="clientBox">
            <div className="clientActions" onClick={()=>clientFn("allmovies")}><FontAwesomeIcon className="faIcons" icon={faFilm}/></div>
            <div className="adminActions" onClick={()=>clientFn("orders")}><FontAwesomeIcon className="faIcons" icon={faReceipt}/></div>
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