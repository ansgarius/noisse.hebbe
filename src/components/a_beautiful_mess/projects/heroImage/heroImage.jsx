import React,{useEffect, useState} from 'react';
import "./heroImage.css";
import { gsap } from "gsap"; 
import {ScrollTrigger} from 'gsap/ScrollTrigger';


const HeroImage =  React.forwardRef( ({bgCoverImage,title,subtitle,txt,txtcolor},ref) => {
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(()=>{
    gsap.to('#hero-footer', {autoAlpha: 1, y: 0,duration:1.5 });
    gsap.to('.hero-date', {autoAlpha: 1, y: 0,duration:1.5 });
    gsap.to('.hero-title', {  y: 0,duration:1 });
    gsap.to('.hero-subtitle', { opacity:1, y: 0,duration:1.5 });








/*     ScrollTrigger.create({

    }) */


ScrollTrigger.create({
  trigger: "#hero-bg-image",
  start: "top top",
  end: "bottom top",



  end: () => "+=" + (/* document.querySelector("#main-content").getBoundingClientRect().bottom -  */
  document.querySelector("#hero-bg-image").getBoundingClientRect().bottom),
 // end: "+=100%",


//  markers: true,
  pin: true,
  scrub: 4,
  pinSpacing:false
 
});


 



/* const anim1 = gsap.from(".inner", {
  //duration: 3,
  //scale: 10,
  //y: "80vh",
  scrollTrigger: {
    trigger: "#hero-bg-image",
    start: "top top",
    end: "bottom top",
    markers: true,
    pin: true,
    scrub: true,
   // pinSpacing:false
  }
}); */



/* const anim2 = gsap.from("#hero-footer", {
  // duration: 3,
  // scale: 10,
 //  y: "80vh",
   scrollTrigger: {
     trigger: "#hero-bg-image",
     start: "top top",
     end: "bottom top",
     markers: true,
     pin: "#hero-footer",
     scrub: true,
    // pinSpacing:false
   }
 }); */
 
 


/*     gsap.to('.inner',  
      {
        yPercent: 1900  ,
        ease: "none",
        duration:2, 
        scrollTrigger:{
          trigger: ".inner",         
          start:'top center',// pone start marca 
          end: () => "+=" + document.querySelector("#hero").offsetWidth, //pone end marca
          markers:true,//muestra marca




          //  snap: 1 / (sections.length - 1),  
          scrub: 3,//liga al srcoll la animacion
         
         
       //   pin:true,//clava elemento,
          onUpdate: (self) => console.log("progress:", self.progress),
        }
      }
    ) */
    
  },[])
    return ( 
    <> 

      <div id="hero" className="has-image autoscroll">
        <div id="hero-caption" className="content-full-width hero-full-caption"  >
          <div className="inner">   
              <h1 className="hero-title caption-timeline" style={{color:txtcolor}}><span >{title}</span></h1>
              <div className="hero-subtitle caption-timeline" style={{color:txtcolor}}><span >{subtitle}</span></div>
              <div className="hero-date caption-timeline" style={{color:txtcolor}}><span >[ {txt} ]</span></div>
          </div>

          <div id="hero-footer" style={{color:txtcolor}}>
            <div className="hero-footer-left"  >                                	
              <div className="button-wrap left scroll-down">
                <div className="icon-wrap parallax-wrap">
                  <div className="button-icon parallax-element" style={{color:txtcolor}}>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
                <div className="button-text sticky left" style={{color:txtcolor}}>
                  <span data-hover="SCROLL TO EXPLORE">SCROLL TO EXPLORE</span>
                </div> 
              </div>	
            </div>
            <div className="hero-footer-right"  >
                <div id="share" className="page-action-content jssocials" data-text="SHARE:" style={{color:txtcolor}}>
                  <div className="jssocials-shares">
                    <div className="parallax-wrap">
                      <div className="parallax-element">
                        <div className="jssocials-share jssocials-share-facebook">
                          <a target="_blank" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fclapat.ro%2Fthemes%2Fbruner%2Fproject01.html" className="jssocials-share-link">
                          <i className="fa-brands fa-facebook-f jssocials-share-logo"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="parallax-wrap">
                      <div className="parallax-element">
                        <div className="jssocials-share jssocials-share-twitter">
                          <a target="_blank" href="https://twitter.com/share?url=http%3A%2F%2Fclapat.ro%2Fthemes%2Fbruner%2Fproject01.html&amp;text=Download%20the%20best%20Creative%20Portfolio%20HTML%20Template%20in%202024" className="jssocials-share-link">
                          <i className="fa-brands fa-twitter jssocials-share-logo"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="parallax-wrap">
                      <div className="parallax-element">
                        <div className="jssocials-share jssocials-share-pinterest">
                          <a target="_blank" href="https://pinterest.com/pin/create/bookmarklet/?&amp;url=http%3A%2F%2Fclapat.ro%2Fthemes%2Fbruner%2Fproject01.html&amp;description=Download%20the%20best%20Creative%20Portfolio%20HTML%20Template%20in%202024" className="jssocials-share-link">
                          <i className="fa-brands fa-pinterest-p jssocials-share-logo"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
{/*         
        <div id="hero-description" className="content-full-width" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
            <div className="inner">
            	<p className="bigger has-opacity" style="color: rgb(156, 80, 95);"><span style="opacity: 0.2;">Each </span><span>shortcode </span><span>serves </span><span>as </span><span>a </span><span>building </span><span>block, </span><span>unlocking </span><span>a </span><span>world </span><span>of </span><span>possibilities </span><span>for </span><span>expressing </span><span>your </span><span>ideas </span><span>and </span><span>presenting </span><span>your </span><span>content </span><span>in </span><span>ways </span><span>that </span><span>are </span><span>both </span><span>visually </span><span>stunning </span><span>and </span><span>highly </span><span>engaging. </span><span> </span><span> </span></p>
                <hr/>
                <div className="button-box has-animation" data-delay="100" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 0;">             
                    <div className="clapat-button-wrap parallax-wrap hide-ball" style="color: rgb(156, 80, 95);">
                        <div className="clapat-button parallax-element">
                            <div className="button-border outline rounded parallax-element-second" style="width: 50px; opacity: 1; background-color: transparent;">
                                <a target="_blank" href="https://www.behance.net/gallery/70870753/J-O-E-Y" style="color: rgb(156, 80, 95);">
                                    <span data-hover="View Website">View Website</span>
                                 </a>
                             </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div className="hero-gradient" style="background-color: rgb(225, 222, 223);"></div>
           */}                                                              
      </div>
      






      <div id="hero-bg-image" ref={ref} style={{backgroundImage: "url("+bgCoverImage+")"}}> </div>
                      











{/*       <section className='heroImage cover-section'  >  
        <div data-scroll="true" data-scroll-call="cover" data-scroll-position="top" className="cover active " style={{height:"100dvh"}}>      
          <div className="heroImage_cover-bg-wrapper active"  >
            <div className="cover-bg">
              <div data-gatsby-image-wrapper="" className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
                <picture>
                  <source type="image/webp" 
                  srcSet={"assets/img/couple-image-mobil-cover.jpg 360w, assets/img/couple-image-tablet-cover.jpg 720w,  "+bgCoverImage+" 1440w"} sizes="(min-width: 1440px) 1440px, 100vw" />
                  <img   width="1440 " height="717" 
                    style={{objectFit: "cover", opacity: "1" }} data-main-image=""
                    sizes="(min-width: 1440px) 1440px, 100vw" 
                    srcSet={" assets/img/couple-image-mobil-cover.jpg 360w, assets/img/couple-image-tablet-cover.jpg 720w,"+bgCoverImage+" 1440w"}  src={bgCoverImage} alt="bg-cover"  decoding="async" loading="lazy"/>
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
    );
});
export default HeroImage;