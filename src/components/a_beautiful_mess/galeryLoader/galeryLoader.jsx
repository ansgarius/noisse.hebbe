import React, { useEffect,useRef } from 'react';
import "./galeryLoader.css";
import { gsap } from "gsap"; 

const GaleryLoader = ( ) => {
    const PercentageID=useRef();
    const tl=gsap.timeline({})
    useEffect(()=>{
        tl.to('.loadbar', {  width: "95%"/* , stagger: 0.04 */, duration:5});
        tl.to('.spinning-plus', {   
        /* display:'none', */
        /*  delay:7,  */
        /*  stroke:"red" */ 
      /*   background:'red',
        duration:.5 ,  
        transform:'rotate(120deg)', */
            repeat:3,
           // repeatDelay:,
        rotateZ:360,
        duration: 1,
        /* 
        rotateX: 120,
        autoAlpha: 0,
        yPercent: -200,
        delay: .6,
        ease: "elastic.out(1, 0.75)",
        */
        },'<');
        tl.to('.preloader-intro span',{ xPercent:-100,color:'red',delay:5},'<')
        tl.to('#precent',{ xPercent:150,color:'red'},'<')
        tl.to('.spinning-plus',{ opacity:0,duration:1},'<')
        tl.to('.percentage-intro',{ opacity:0,duration:1},'<')
        tl.to('.preloader-wrap',{ opacity:0 },'<')
        tl.to('.preloader-wrap',{ display:'none' },'<')

        
    animateValue(PercentageID, 0, 100, 4000);
    function animateValue(id, start, end, duration) {
        var range = end - start,
          current = start,
          increment = end > start? 1 : -1,
          stepTime = Math.abs(Math.floor(duration / range)),
          obj =id;
        var timer = setInterval(function() {
            current += increment;
          //  obj.text(current);
          obj.current.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    },[])

    return (     
         
        /* <!-- Preloader --> */
        <div className="preloader-wrap" >
            <div className="outer">
                <div className="inner"> 
                                   
                    <div className="trackbar">                    	
                        <div className="loadbar">
                        	<div className="preloader-intro"><span>LD.</span></div>
                            <div className="percentage-wrapper"><div className="percentage" id="precent" ref={PercentageID}> </div></div>
                        </div>
                    </div>
                    
                    <div className="spinning-plus">
                        <div className="spinning-plus-wrapper">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    
                    <div className="percentage-intro">PLEASE WAIT, CONTENT IS LOADING</div>                     
                </div>
            </div>
        </div>
       /*  <!--/Preloader --> */
    );
};
export default GaleryLoader;