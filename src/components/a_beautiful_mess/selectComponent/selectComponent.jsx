import React from 'react';
import "./selectComponent.css";

const SelectComponent = ({form,label,name,handleChange,data,children}) => {
    return (     
        <div className='SelectComponent'>
            <select name={name} value={form[name]}  onChange={handleChange}>
            <option  value='' >{label}</option> 
            {data?.map((registro,index)=>
                <option value={Object.keys(registro)[0]} key={index} > {registro[Object.keys(registro)[0]]}</option>
            )} 
            </select>
        </div>
    );
};
export default SelectComponent;