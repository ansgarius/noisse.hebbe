import React,{useRef} from 'react';
import "./projects_photos_gallery.css";
import {Link} from "react-router-dom";
import {   useLocation } from "react-router-dom";
import MenuV2 from '../../../components/a_beautiful_mess/menuV2/menuV2';
import Tittle from '../../../components/a_beautiful_mess/tittle/tittle';
import HeroImage from '../../../components/a_beautiful_mess/projects/heroImage/heroImage';
import ProjectFooter from '../../../components/a_beautiful_mess/projects/projects_footer/projects_footer';
import ProjectsPhotoParallax from '../../../components/a_beautiful_mess/projects/projects_photo_parallax/projects_photo_parallax';

const ProjectsPhotosGallery  = (props) => {
    const $ImageHero=useRef()
    const location = useLocation();
  console.log(    
    
      location.state.data
  );

return ( 
 
    <div className="projects_photos_gallery" style={{background:location.state.data.bgColor}} >
        <MenuV2 isportal={false} ></MenuV2>
        <Tittle isportal={false}></Tittle>
        <HeroImage ref={$ImageHero} bgCoverImage={location.state.data.foto} title={location.state.data.title} 
        subtitle={location.state.data.subtitle} txt={location.state.data.text} txtcolor={location.state.data.textColor}/>
       
       {location.state.data.photos.map((el,index)=>


       index%2==0?
       <ProjectsPhotoParallax offsetY={$ImageHero} key={index}  reverse={index%2==0?true:false} img1={el.name}></ProjectsPhotoParallax>:''
    )

       }
       
        
       {/*  <ProjectFooter/> */}
    </div>

 
    );
};
export default ProjectsPhotosGallery;