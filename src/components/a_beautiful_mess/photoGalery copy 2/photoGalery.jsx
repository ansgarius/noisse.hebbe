import React, { useEffect,useState } from "react";
import './photoGalery.css';


import {ImageContainer, images} from "./images.ts";
import MenuV2 from "../menuV2/menuV2.jsx";
import Tittle from "../tittle/tittle.jsx";




const PhotoGalery=()=>{

  useEffect(()=>{

    // Slider
    const slider  = document.querySelector('.slider');//GUARDA LA REFERENCUA DEL DIV SLIDER PARA AGREGARLE LOS EVENTOS WHEEL Y TOUCH
    let slides  = Array.from(document.querySelectorAll('.slide')); //array con cada una de lOS CONTENEDORES DE  fotis
    let slidesArray = Array.from(slides);//array con cada una de lOS CONTENEDORES DE  fotis
    let slideWidth  = slides[0].getBoundingClientRect().width; //ancho de CONTENEDOR DE  foto
    console.log(slides,slidesArray,slideWidth,'------------------------');

// Counters
    let counters  = Array.from(document.querySelectorAll('.counter__li'));
    let countersArray  = Array.from(counters);
    let transform = 0;

    window.addEventListener('resize', () => {//cada vez q se renderiza la pamtalla se obtiene el whid nuevo
      slideWidth = slides[0].getBoundingClientRect().width;
    })

// Clone and positioning functions

    function cloneElements(elements  , array ){
      for(let i = 0; i < elements.length; i++){
       // elements[i].style.transitionDuration=elements[i].dataset.transform+'s'

          let clone = elements[i].cloneNode(true)  ;
          clone.classList.add('clone');
        

          elements[i].parentElement.appendChild(clone);
          array.push(clone);
      }
    }

    function positionElements(elementsArray , position){
      elementsArray.forEach((element, idx ) => {
          let percent = (idx -  (elementsArray.length /2)) * 100;
          element.style[`${position}`] = `${percent}%`;
      })
    }

// Clone and position slide panels

    cloneElements(slides, slidesArray);// duplica los elementos
    positionElements(slidesArray, 'left')//distribuye los elementos en la pantall

// Clone and position counters

    cloneElements(counters, countersArray);
    positionElements(countersArray, 'top')

// Add and position images
    let imageContainers = [];
    for(let i = 0; i < slidesArray.length; i++){
        let imageContainer = new ImageContainer(images[i], slidesArray[i]);
        imageContainers.push(imageContainer);
    }

// Desktop 
    const advance =(num)=>{
      transform -= num;
    }
    document.querySelector('#btnNext').addEventListener('click',()=>{advance(100)})
    document.querySelector('#btnPrev').addEventListener('click',()=>{advance(-100)})

    slider.addEventListener('wheel', (e) => {
      console.log(e.deltaY);
      transform -= e.deltaY;
    })







    // Touch devices
    /* 
    let isTouching = false;
    let speedX = 0;
let startX = 0;   //punto inicion en x
let startTime = 0;
let elapsedTime = 0;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    speedX = 0; // Reset speed when touch starts
    isTouching = true;
    startTime = performance.now();
})

slider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - startX;
  
    transform += deltaX;

    startX = e.touches[0].clientX; // reset delta for every move event 
    // Update the speed based on the deltaX value
    elapsedTime = performance.now() - startTime;

    speedX -= (deltaX / (elapsedTime * .1)) * -1;
})

document.addEventListener('touchend', () => {
    startX = 0;
    isTouching = false;
});


 */





// Animation loop
function animate() {
/*     if (!isTouching && Math.abs(speedX) > 0.1) {
      alert('no esta touch')
        // Apply deceleration effect
        speedX *= 0.95; // Adjust the deceleration factor as needed
        transform += speedX;  
    } */
   
   
   
  //                 *
  // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 
   
   
   
   
   
 
        // Reset transform position at limit to get infinite effect
    if(transform > slideWidth * (slidesArray.length / 4)){ transform = -(slideWidth * (slidesArray.length / 4));}
    if(transform < -(slideWidth * (slidesArray.length / 4))) {transform = (slideWidth * (slidesArray.length / 4));}
    for(let i = 0; i < slidesArray.length; i++){
        slidesArray[i].style.transform = `translateX(${(transform / (window.innerWidth * .6)) * 100}%)`;
        countersArray[i].style.transform = `translateY(${(transform / (window.innerWidth * .6)) * 100}%)`;
        imageContainers[i].animate();
    }
 







    requestAnimationFrame(animate);
}

animate();

},[])

    return (     
        <div className="photoGalery">

           <MenuV2 isportal={false} ></MenuV2>
            <Tittle isportal={false}></Tittle>
 <main>
        <div className="slider">
            <div className="counter">
                <div>
                    <h3>/</h3>
                </div>
                <div>
                    <ul className="counter__list">
                        <li className="counter__li"><h3>01</h3></li>
                        <li className="counter__li"><h3>02</h3></li>
                        <li className="counter__li"><h3>03</h3></li>
                        <li className="counter__li"><h3>04</h3></li>
                        <li className="counter__li"><h3>05</h3></li>
                        <li className="counter__li"><h3>06</h3></li>
                        <li className="counter__li"><h3>07</h3></li>
                        <li className="counter__li"><h3>08</h3></li>
                    </ul>
                </div>
            </div>
            <div className="slider__viewport">
                <div className="crosshair">
                    <span></span>
                    <span></span>
                </div>
               

               {/* .9 */}
                <div className="slide" data-transform="0" data-width="60%" data-justify="flex-start">
                    
                 
                </div>
                <div className="slide center" data-transform="0" data-width="50%" data-width="60%" data-justify="center">
                    
                </div>
                <div className="slide" data-transform="0.4" data-width="40%" data-width="60%" data-justify="flex-end">
                    
                </div>
                <div className="slide center" data-transform="0.8" data-width="60%" data-width="60%" data-justify="center">
                    
                </div>
                <div className="slide" data-transform="0.1" data-width="50%" data-width="60%" data-justify="flex-start">
                    
                </div>
                <div className="slide center" data-transform="1.7" data-width="40%" data-width="60%" data-justify="center">
                    
                </div>
                <div className="slide flex-end" data-transform="2.9" data-width="60%" data-width="60%" data-justify="flex-end">
                    
                </div>
                <div className="slide center" data-transform="0.045" data-width="50%" data-width="60%" data-justify="center">
                    
                </div>
             
            </div>
              
            
        </div>

        <div className="photoGaleryFooter">
          <div className="photoGaleryFooterSecction"></div>
          <div className="photoGaleryFooterSecction">
            <div className="progress-info-wrapper">
              <div className="progress-info-fill" style={{backgroundSize :'30% 100%'}}>SCROLL OR DRAG</div>
              <div className="progress-info-fill-2" style={{backgroundSize:" 70% 100%"}}>SCROLL OR DRAG</div>
            </div>
          </div>
          <div className="photoGaleryFooterArrows">
            <svg xmlns="http://www.w3.org/2000/svg" id='btnPrev'   width="16" height="16" viewBox="0 0 24 24" preserveAspectRatio="none"   >
              <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" preserveAspectRatio="none"  
              id='btnNext' style={{transform: 'rotateY(180deg)'}} >
              <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
            </svg>
          </div>
        </div>
    </main>
        </div>
    );
  }

export  default PhotoGalery;



 