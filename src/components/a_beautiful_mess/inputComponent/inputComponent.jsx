import React from 'react';
import "./inputComponent.css";

const InputComponent = ({type,form,label,name,handleChange,children}) => {
    return (     
        <div className='InputComponent'>
            <div className="InputComponentGroup">
                <div className='InputComponentWrapper' >
                    <input type={type} name={name} onChange={handleChange} value={form[name]}/>
                    <span className="InputComponentHighlight"></span>
                    <span className="InputComponentBar"></span>
                    <label>{label}</label>
                    {children}
                </div>
            </div>
        </div>
    );
};
export default InputComponent;