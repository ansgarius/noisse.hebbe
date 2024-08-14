import React from 'react';
import "./buttonComponent.css";

const ButtonComponent = ({form,label,name,handleClick,data,children}) => {
    return ( 
        <div className='buttonComponent'>
            < button type = "button" className = "btn btn-sm btn-info" onClick = {handleClick } > {label} </button>
        </div>    
    );
};
export default ButtonComponent;