import React ,{useEffect,useRef, useState} from 'react';
import "./menuLayoutMovileTablet.css";
import {Link} from "react-router-dom";
import Pie from '../pie/pie';
 
const MenuLayoutMovileTablet = ({children,  toOpen , t,language, openMenu, direction,toClose ,handleLanguage,bgcolor}) => {

  const [rect, setRect] = useState(null);//almacena la cordenas de la cortinilla
  let mainMenu = useRef(); //apunta a la cortinilla

  useEffect(() => {
    /*     let ofsset=(window.innerWidth-menu.current.getBoundingClientRect().left);  
        alert(ofsset)
        if (ofsset>0) { 
        } */

    if (direction=="left") {
      // posiciona la crtinilla a la derecha
      mainMenu.current.style.left= window.innerWidth+"px ";  
    }
    else if (direction=="right") {
      // posiciona la crtinilla a la derecha
      mainMenu.current.style.right= window.innerWidth+"px "; 
    }
    //// posiciona la crtinilla exactamente debajo de la barra de cabecera, menuWrapper apunta a la cabecera
    //mainMenu.current.style.top= menuWrapper.current.getBoundingClientRect().height+"px ";  //---------------==================== poner va en la version de bill
    //posisiioan la cortinilla al top de la pantalla
    mainMenu.current.style.top=0;
    //le da la altura de la oantalla a la cortinilla
    //   mainMenu.current.style.height= (window.innerHeight-menuWrapper.current.getBoundingClientRect().height)+"px ";   //version de bill       
    mainMenu.current.style.height= window.innerHeight+"px ";  //---------------====================  quitar no va en la version de bill
    /* 
    alert((window.innerHeight ))
    alert( menuWrapper.current.getBoundingClientRect().height )
    alert((window.innerHeight-menuWrapper.current.getBoundingClientRect().height)+"px ")
    512     763<-------------------------------------
    45        45
    467       718 */
    setRect(mainMenu.current.getBoundingClientRect())
      const updateWindowDimensions = () => { 
        if (direction=="left") {
          mainMenu.current.style.left= window.innerWidth+"px ";  
        }
        else if (direction=="right") {
          // posiciona la crtinilla a la derecha
          mainMenu.current.style.right= window.innerWidth+"px "; 
        }
        //  mainMenu.current.style.top= menuWrapper.current.getBoundingClientRect().height+"px ";  
        // mainMenu.current.style.height= (window.innerHeight-menuWrapper.current.getBoundingClientRect().height)+"px ";  
        mainMenu.current.style.top=0;//---------------====================  quitar no va en la version de bill
        mainMenu.current.style.height= window.innerHeight+"px ";  //---------------====================  quitar no va en la version de bill
        setRect(mainMenu.current.getBoundingClientRect())  
      };
      window.addEventListener("resize", updateWindowDimensions);
      return () => window.removeEventListener("resize", updateWindowDimensions) 
  },[]);
    
  useEffect(()=>{ 
    if (rect) {
      if (direction=="left") {
        if (toOpen) { 
          mainMenu.current.style.transform="translate(-"+rect.left+"px, 0)";   
        }
        else{ 
          mainMenu.current.style.transform="translate("+ rect.left+"px, 0)";   
        }
      }
      else if (direction=="right") {
        if (toOpen) { 
          mainMenu.current.style.transform="translate("+Math.abs(rect.left)+"px, 0)"; 
        }
        else{ 
          mainMenu.current.style.transform="translate("+ rect.left+"px, 0)";    
        }
      }
    }
  },[toOpen])

  return (  
    <ul id="menu" className='a_beautiful_mess_menuLayoutMovileTablet'  ref={mainMenu} style={{background:bgcolor}}>
      {children}
    </ul>
  );
};

export default MenuLayoutMovileTablet;