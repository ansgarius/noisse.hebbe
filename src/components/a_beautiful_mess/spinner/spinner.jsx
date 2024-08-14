import React  from 'react';
import "./spinner.css";

const Spinner = ( ) => {

    return ( 
       <div className='spinerWrapper'   style={{
         
        position: 'sticky',
        top: '0px',
        zIndex:'2'



        
      
      }}>
         <div className="spinner"></div>
       </div>
    );
};
export default Spinner;