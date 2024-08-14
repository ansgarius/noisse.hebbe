import { Navigate,Outlet } from 'react-router-dom';
import React,{useContext} from 'react';
import CarContext  from '../context/carContext';

const PrivateRouter = ( ) => { 
    const {logged}=useContext(CarContext);
    return logged?<Outlet/>:<Navigate to="/"/>;
};

export default PrivateRouter;