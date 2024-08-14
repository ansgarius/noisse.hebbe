import React from 'react';
import "./searchComponent.css";

const SearchComponent = ({handleChange,handleClick,name}) => {
    return (     
        <div className="searchComponent">
            <input  type="text"   name='buscarValue'  onChange={handleChange}
             value={name} className="searchComponentSearchTerm"  placeholder="What are you looking for?"/>
            <button type="button" onClick={handleClick} className="searchComponentSearchButton">buscar</button>
        </div>
    );
};
export default SearchComponent;