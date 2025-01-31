import React,{useEffect,useRef} from 'react';
import "./projects_photo_parallax.css";
import { gsap } from "gsap"; 
import {ScrollTrigger} from 'gsap/ScrollTrigger';


const ProjectsPhotoParallax =  ({offsetY,reverse, img1} ) => {
    gsap.registerPlugin(ScrollTrigger);

    const postsSection=useRef()
    const smallImage=useRef()

    useEffect(()=>{ 
     //   gsap.set(smallImage.current, {yPercent:400 });
    
        // apply parallax effect to any element with a data-speed attribute
        gsap.to(smallImage.current, {
          //y: (i, el) => (-1 * parseFloat(el.getAttribute("data-speed"))) * (postsSection.current.offsetHeight / 3),
          y:-40,
          ease: "none",
          scrollTrigger: {
            trigger:postsSection.current,
            invalidateOnRefresh: true,
            scrub: 2,
            markers: true,
    pinSpacing:false,
            start: 'top bottom'
          }
        });    


        gsap.set(postsSection.current, {y: offsetY.current.getBoundingClientRect().bottom});
        /*   gsap.to(section, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: () => "top 50%+=" + (document.querySelector("#hero-bg-image").offsetHeight / 2) + "px",
                end: "+=" + document.querySelector("#hero-bg-image").offsetHeight,
                scrub: true
            }
            });
            */
  
            },[])
            return ( 
            <>
    


    <div id="main-content" className="solid-color" ref={postsSection}>

 


  <div id="main-page-content" className="project-page" style={{  opacity: "1"}}>
                  
                   
                      <div className="light-section-wrapper" 
                      style={{backgroundColor: "rgb(225, 222, 223)"}}>
                        <div className="light-section-container content-max-width">
                          <div className="content-row row_padding_top row_padding_bottom light-section" data-bgcolor="#e1dedf"
                          
                     
                          
                          >
                          
                          <div className="two_third vertical-parallax" data-startparallax="0" data-endparallax="0"   
                          data-speed="0"
                          >
                              <figure>
                                  <a href="images/projects/wolly01.jpg" className="image-link"
                                   style={{color: "rgb(156, 80, 95)"}}>
                                    <img src="http://localhost/hebbe_backend/public/images/projects/2024-07-08/Kids-News-ArrozDacsa-Publicidad-Campana-Parte4_011.jpg" alt="Image Title"/></a>
                              </figure>
                          </div>
                          
                          <div className="one_third last vertical-parallax" data-startparallax="0.9" data-endparallax="0" 
                           data-speed="1" ref={smallImage} style={{transform: "translateY(400%)"}}
                           >                                
                              <figure>
                                  <a href="images/projects/wolly02.jpg" className="image-link"
                                   style={{color: "rgb(156, 80, 95)"}}>
                                    <img src={"http://localhost/hebbe_backend/public/images/"+img1} alt="Image Title"/></a>
                              </figure>                                    
                          </div>                                 
                          
                      </div></div></div> 
                       
                     {/*  <div className="light-section-wrapper" style={{backgroundColor: "rgb(225, 222, 223)"}}>
                        <div className="light-section-container content-max-width">
                          <div className="content-row light-section text-align-center" data-bgcolor="#e1dedf">
                          
                          <div className="pin-spacer" style="order: 0; place-self: auto; grid-area: auto; z-index: auto; float: none; flex-shrink: 1; display: block; margin: 0px; inset: 0px; position: relative; flex-basis: auto; overflow: visible; box-sizing: border-box; width: 934px; height: 2654px; padding: 0px 0px 2373px;">
                            <div className="pinned-lists-wrapper scale-mode" data-duration="3x" style="translate: none; rotate: none; scale: none; inset: 0px auto auto 0px; margin: 0px; max-width: 934.4px; width: 934.4px; max-height: 280.875px; height: 280.875px; padding: 0px; transform: translate(0px, 2373px);">                   
                              <ul className="pinned-lists">
                                  <li style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(156, 80, 95);">INDULGE IN</li>
                                  <li style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(156, 80, 95);">LUXURY</li>
                                  <li style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(156, 80, 95);">WRAP</li>
                                  <li style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(156, 80, 95);">YOURSELF</li>
                                  <li style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(156, 80, 95);">IN CASHMERE</li>
                              </ul>
                          </div></div>
                          
                      </div></div></div> 
                      
                      <div className="light-section-wrapper" style="background-color: rgb(225, 222, 223);"><div className="light-section-container content-max-width"><div className="content-row row_padding_top row_padding_bottom light-section" data-bgcolor="#e1dedf"> 
                          
                          <div className="one_third vertical-parallax" data-startparallax="0.9" data-endparallax="0" style="translate: none; rotate: none; scale: none; transform: translate3d(0px, 406.065px, 0px);">                                
                              <figure>
                                  <a href="images/projects/wolly03.jpg" className="image-link" style="color: rgb(156, 80, 95);"><img src="images/projects/wolly03.jpg" alt="Image Title"></a>
                              </figure>                                    
                          </div>
                          
                          <div className="two_third last vertical-parallax" data-startparallax="0" data-endparallax="0" style="translate: none; rotate: none; scale: none; transform: translate3d(0px, 0px, 0px);">
                              <figure>
                                  <a href="images/projects/wolly04.jpg" className="image-link" style="color: rgb(156, 80, 95);"><img src="images/projects/wolly04.jpg" alt="Image Title"></a>
                              </figure>
                          </div>
                          
                      </div></div></div> 
                     
                   */}
                  
                  </div> 
                 {/*  <div id="project-nav" className="pinned-nav-caption auto-trigger move-title-onload" data-next-modify-color="#ece7e0" style="bottom: -1582px; height: 1582px;">
                      <div className="pin-spacer" style="order: 0; place-self: auto; grid-area: auto; z-index: 10; float: none; flex-shrink: 1; display: block; margin: 0px; inset: 0px 0px 791px; position: absolute; flex-basis: auto; overflow: visible; box-sizing: border-box; width: 1054px; height: 1582px; padding: 0px 0px 791px;"><div className="next-project-wrap" style="translate: none; rotate: none; scale: none; inset: 0px auto auto 0px; margin: 0px; max-width: 1054.4px; width: 1054.4px; max-height: 791px; height: 791px; padding: 0px; transform: translate(0px, 0px);">
                          
                          <div className="all-works"><a className="link-text ajax-link" data-type="page-transition" href="index.html" style="color: rgb(156, 80, 95);">[ <span className="link" data-hover="View All Works">View All Works</span> ]</a></div>
                          
                          <div id="next-project-caption" className="text-align-center content-full-width">
                              <div className="next-caption-wrapper" style="opacity: 1;">
                                  <a className="next-ajax-link-project" data-type="page-transition" href="project02.html" data-firstline="Next" data-secondline="Project" style="color: rgb(156, 80, 95);"></a>
                                  <div className="next-caption">
                                      <div className="next-hero-title caption-timeline modify-color" data-firstline="Keep" data-secondline="Scrolling" style="color: rgb(156, 80, 95);"><div><span style="translate: none; rotate: none; scale: none; transform: translate(0px, 75.4375px); opacity: 1;">ONLY</span></div> <div><span style="translate: none; rotate: none; scale: none; transform: translate(0px, 75.4375px); opacity: 1;">DANCING</span></div></div>
                                  </div>                                    
                              </div>                   
                          </div>
                          
                          <div className="next-hero-progress"><span style="width: 0%;"></span></div>
                          
                          <div className="next-project-image-wrapper" style="height: 791px;">
                              <div className="next-project-image next-project-image-effects" style="translate: none; rotate: none; scale: none; top: 119px; transform: scale(0.7, 0.7); clip-path: inset(0px 25%);">
                                  <div className="next-project-image-bg" style="background-image:url(images/02hero.jpg)"></div>
                              </div>            
                          </div>
                          
                      </div></div>
                  </div>                                                  
                           */}
              </div>

    
    </>
  
    );
};
export default ProjectsPhotoParallax;