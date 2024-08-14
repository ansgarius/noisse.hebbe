import React from 'react';
import "./alert.css";

const Alert = (props) => {
    return (     
        <div className="alertComponent" style={{background:props.bg,color:props.color,borderColor:props.bc, "--bg":props.bc,
            position: 'sticky',  top: '0px',  zIndex:'2'}}> 
            <h6>
                {props.mensajeError}
            </h6> 
        </div>
    );
};

export default Alert;