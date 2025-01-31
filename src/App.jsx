import React, { Suspense } from 'react' 
import {HashRouter as Router,  Route,  Routes, Link,  NavLink, useLocation} from "react-router-dom";
import PrivateRouter from './helpers/PrivateRouter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
const Dashboard = React.lazy(() => import('./pages/a_beautiful_mess/dashboard/dashboard'));
 

import ABeautifulMess from './pages/a_beautiful_mess/a_beautiful_mess/a_beautiful_mess';    
import Crud from './components/a_beautiful_mess/crud/crud';
import PhotoCreate from './pages/a_beautiful_mess/dashboard/photos/create/photoCreate';
import PhotoGalery from './components/a_beautiful_mess/photoGalery/photoGalery';
import Sections from './pages/a_beautiful_mess/dashboard/sections/sections';
import ProjectsPhotosGallery from './pages/a_beautiful_mess/projects_photos_gallery/projects_photos_gallery';

 function WrappedApp() {
  const location = useLocation();

  return (
  
/*     <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={1000}
      classNames="page"
    > */
      <Routes location={location}> 

        <Route exact path="/" element={
          <Suspense >
            <ABeautifulMess/>
          </Suspense>}/> 


          <Route exact path="/Projects/Photos" element={
          <Suspense >
            <ProjectsPhotosGallery></ProjectsPhotosGallery>

          </Suspense>}/> 

    {/*       <Route element={<PrivateRouter isLogged={false}/>}> */}


          <Route exact path="/Dashboard/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Dashboard></Dashboard> */}
            <PhotoGalery></PhotoGalery>
          </Suspense>}/>

          <Route exact path="/Users" element={
        <Suspense fallback={<div>Loading...</div>}>
          <Crud/>
        </Suspense>}/> 


        <Route exact path="/Photos/Create" element={
        <Suspense fallback={<div>Loading...</div>}> 
          <PhotoCreate/>
        </Suspense>}/> 

        <Route exact path="/Sections" element={
        <Suspense fallback={<div>Loading...</div>}> 
          <Sections/>
        </Suspense>}/> 


     {/*   
      
      <Route exact path="/Posts" element={
        <Suspense fallback={<div>Loading...</div>}>
          <Post/>
        </Suspense>}/> 

x

      <Route exact path="/Topics" element={
        <Suspense fallback={<div>Loading...</div>}>
          <Topic/>
        </Suspense>}/> 


        <Route exact path="/DiscountCoupons" element={
        <Suspense fallback={<div>Loading...</div>}>
          <DiscountCoupons/>
        </Suspense>}/>
*/}
        

     {/*    </Route> */}







        </Routes>

/*         </CSSTransition>

        </TransitionGroup> */
 
  );
}


function App() { 
  return (
      <Router>
      <WrappedApp />
    </Router>
  )
}

export default App
