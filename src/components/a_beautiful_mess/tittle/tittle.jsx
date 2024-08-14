import React from 'react';
import "./tittle.css";
import {Link} from "react-router-dom";

const Tittle  = (props) => {

  

return ( 
 
    <div className="a_beautiful_mess_tittle" style={{mixBlendMode:props.isportal? "normal":"difference"}}>
         <Link to="/">
            <span> Destination & Luxury <br></br> Weding Photografy</span>
         </Link>
    </div>

 
    );
};
export default Tittle;