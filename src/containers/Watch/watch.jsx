// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
// IMPORT ACTIONS
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

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
   

    return (
        <div className="containerWatch">

            <div className="playMovieBox">
            
                    <iframe className="filmTransmission" src={props.detail.urlTrailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>


            </div>
            <div className="menuWatch">
                <div className="detailOptions">
                        <div className="buttonDetails" onClick={()=>back()}><FontAwesomeIcon className="faIcons" icon={faAngleLeft}/></div>
                </div>
            </div>
            
        </div>
    )

}

export default connect((state)=>(
    {logData:state.credentials,
    detail:state.selection}
))(Watch);