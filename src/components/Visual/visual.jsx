// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
// IMPORT COMPONENTS
import Allmovies from '../Adminsel/Allmovies/allmovies';
import Createmovies from '../Adminsel/Createmovies/createmovies';



const Visual = (props) => {

    console.log(props.adminAction)
    switch (props.adminAction) {
        case "allmovies":
            return (
                <div className="visualContainer">
                    <Allmovies/>
                </div>
            )
        case "createmovies":
            return(
                <div className="visualContainer">
                    <Createmovies/>
                </div>
            )
        default:
            return (
                <div>

                </div>
            )
    }


}

export default connect((state)=>(
    {adminAction: state.adminActions}
))(Visual);