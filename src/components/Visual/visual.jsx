import React from 'react';
import {connect} from 'react-redux';
import Allmovies from '../Allmovies/allmovies';

const Visual = () => {




    return (
        <div className="visualContainer">
            <Allmovies/>
        </div>
    )
}

export default connect((state)=>(
    {adminAction: state.adminActions}
))(Visual);