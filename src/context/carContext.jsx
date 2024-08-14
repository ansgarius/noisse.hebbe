import { createContext,useState } from "react";

const CarContext=createContext();

const CarProvider=({children})=>{
    const [addNotification, setAddNotification] = useState(false);
    const [numItem, setNumItem] = useState(0);
    const [conditions, setConditions] = useState([]);
    const [carItems, setCarItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [subtotalWhitOutConditions, setsubtotalWhitOutConditions] = useState(0);

    
    const [logged, setLogged] = useState(false);
    const [userData, setUserData] = useState({mail:"",name:"",role:"",address:"",phone:"",zip:"",colonia:"",reference:"",nationality:"",estado:"",ciudad:""});
    const data={numItem,setNumItem,carItems,setCarItems,subtotal, setSubtotal,addNotification, 
        userData, setUserData, setAddNotification,logged, setLogged,conditions, setConditions,subtotalWhitOutConditions, setsubtotalWhitOutConditions}
    return <CarContext.Provider value={data}>{children}</CarContext.Provider>
};

export {CarProvider};
export default CarContext;