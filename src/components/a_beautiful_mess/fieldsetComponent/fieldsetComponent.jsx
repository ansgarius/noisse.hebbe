import React  from 'react';
import "./fieldsetComponent.css";

const FieldsetComponent=({children, tittle})=>{

    return(
        <fieldset className='fieldsetComponent'>
            <legend >{tittle}</legend>
            {children}
        </fieldset>
    );
}

export default FieldsetComponent;