import React, {useEffect,useRef} from 'react';
import "./galleryCursor.css";

const GalleryCursor  =  ({mouseOver}) => {


     //cursor
     let overlay = useRef();
  
 useEffect(()=>{
  if (mouseOver) {
    
    overlay.current.classList.add('with-blur')  
  }
  else{

    overlay.current.classList.remove('with-blur') 
  }
 },[mouseOver])
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
 
      {/* <div ref = {overlay}  id="GalleryCursorComponent"></div> */}
      <div   id="magic-cursor">
        <div id="ball"  ref = {overlay}  style={{borderWidth:mouseOver?'2px':'4px', transform:mouseOver?'scale(1.4,1.4)':'scale(.5,.5)',
          background:mouseOver?'rgba(170,170,170,.2)':'transparent', borderColor:mouseOver?'rgba(170,170,170,0)':'rgb(153,153,153)'}} >
        	<div id="ball-drag-x"></div>
            <div id="ball-drag-y"></div>
        	<div id="ball-loader" ></div>
         {
          mouseOver!=0&&<p className="center-first">VIEW</p>
         }

        </div>
    </div>

    </>
    );
};
export default GalleryCursor;