import React from 'react';

import {useHistory} from 'react-router-dom';
import './link.css'


const Link = (props) => {

    let history = useHistory();

    const Vamos = () => {
        if (props.llevame !== "") {
            history.push(props.to);
            console.log("me llevas a, ", props.to)
        } else {
            history.push("/");
        }
    }

    return (
        <div className="navLinkText" onClick={()=>Vamos()}>
            {props.name}
        </div>
    )

}

export default Link;