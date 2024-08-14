import React from 'react';
import "./projects_photos_gallery.css";
import {Link} from "react-router-dom";
import {   useLocation } from "react-router-dom";
import MenuV2 from '../../../components/a_beautiful_mess/menuV2/menuV2';
import Tittle from '../../../components/a_beautiful_mess/tittle/tittle';
import HeroImage from '../../../components/a_beautiful_mess/heroImage/heroImage';

const ProjectsPhotosGallery  = (props) => {

    const location = useLocation();
  console.log(    
    
      location.state.data
  );

return ( 
 
    <div className="projects_photos_gallery"  >
        <MenuV2 isportal={false} ></MenuV2>
          <Tittle isportal={false}></Tittle>
     <HeroImage  bgCoverImage={location.state.data.foto}/>
    </div>

 
    );
};
export default ProjectsPhotosGallery;