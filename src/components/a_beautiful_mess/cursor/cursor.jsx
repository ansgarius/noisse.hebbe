import React, {useRef,useEffect} from 'react';
import "./cursor.css";

const Cursor  = () => {

    let overlay = useRef();

    useEffect(() => {  
 
//events object(stores events for touch,mouse)
let events = {
    mouse: {
      move: "mousemove",
    },
    touch: {
      move: "touchmove",
    },
  };

  
//guarda el tipo de dispositivo en el q se esta visualizamdo
let deviceType = "";
//Checks for device type
function isTouchDevice() {
  try {
    //We try to create touch event (it would fail for desktops and throw error)
    deviceType = "touch";
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
}


 
  //Check device so that deviceType variable is set to touch or mouse
  isTouchDevice();
  /*In addEventListener we use the events object to set the event so deviceType would be set to touch or mouse since we called 'isTouchDevice()' above
  E.g:
  if deviceType = "mouse" => the statement for event would be events[mouse].move which equals to mousemove.
  if deviceType = "touch" => the statement for event would be events[touch].move which equals to touchstart.
  */

  let getMouse=(e) => {
    //Try, catch to avoid any errors for touch screens
    try {
      //pageX and pageY return the position of client's cursor from top left pf screen
      var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
      var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    } catch (e) {}
 
  

   
     //move the overlay with cursor
    overlay.current.style.top = y-(overlay.current.offsetHeight/2)   + "px";
    overlay.current.style.left = x-(overlay.current.offsetWidth/2)  + "px";
  }
  
  window.addEventListener(events[deviceType].move, getMouse);


        //elimino el evento
        return () => {
          window.removeEventListener(events[deviceType].move, getMouse); 
      };
    }, [])

    return ( 
    <>  
 
      <div ref = {overlay}  id="a_beautiful_mess_overlay"></div>
 

    </>
    );
};
export default Cursor;