import React, { useEffect } from 'react';
import "./modal.css";
 
const Modal = (props) => {

    useEffect(()=>{
      const hideModal=(event)=> {
        if (event.target == modal) {
          props.setModalData((el)=>{
            el.show=false
            return {...el}
          })
        }
      }

      const stopWheel=e=>{

        e.stopPropagation();
      }




      
      let modal = document.getElementById("myModal");

      modal.addEventListener("wheel",stopWheel)

      modal.addEventListener("touchstart", stopWheel , { passive: false } ); 
      modal.addEventListener("touchend", stopWheel , { passive: false } ); 




      window.addEventListener("click",hideModal )
      return()=>{
        window.removeEventListener("click",hideModal)
        modal.removeEventListener("wheel",stopWheel)
        modal.removeEventListener("touchstart",stopWheel)
        modal.removeEventListener("touchend",stopWheel)
      }
    },[])
   
    return ( 
        <>  
            <div id="myModal" className="numbers_limited_modal">
              <div className="content">
                
                <div className='closeWrapper'> 
                  <div className='close'>

                  <img
            src='assets/img/equis.svg'      onClick={()=>{
              props.setModalData((el)=>{
                el.show=!el.show
                return {...el}
              })
            }}
            />  
            </div>
                
                
                 
                </div>
                
                  {props.text}
              </div>
            </div> 
        </>
    );
};
export default Modal;

