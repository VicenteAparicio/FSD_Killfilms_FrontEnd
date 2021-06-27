import React from "react";

import {connect} from 'react-redux';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
//IMPORT STYLES
import '../../Global.css'
import { ADMINACTION } from '../../redux/types';

const Client = (props) => {

    

    const clientFn = (arg) => {
        switch (arg) {
            case "allmovies":
                props.dispatch({type:ADMINACTION,payload:"allmovies"})
                break;
            // case "allusers":
            //     props.dispatch({type:ADMINACTION,payload:"allusers"})
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
                <div className="clientActions" onClick={()=>clientFn("allmovies")}>ALL MOVIES</div>
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