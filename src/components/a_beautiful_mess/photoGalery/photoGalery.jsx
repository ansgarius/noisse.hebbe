import React, { useEffect,useRef,useState } from "react";
import './photoGalery.css';
import {ImageContainer} from "./images.ts";
import {GridToFullscreenEffect} from "./GridToFullscreenEffect.js";
import { useNavigate} from "react-router-dom";
 

import MenuV2 from "../menuV2/menuV2.jsx";
import Tittle from "../tittle/tittle.jsx";
import { gsap } from "gsap"; 
import {Flip} from 'gsap/Flip';
import GaleryLoader from "../galeryLoader/galeryLoader.jsx";
import GalleryCursor from "../galleryCursor/galleryCursor.jsx";
import {useParams} from 'react-router-dom';
import {helpHttp} from '../../../helpers/helpHttp'; 

/**
  Basic setup for demos.
  @param {object} options - GridToFullscreenEffect options. Lots of them
  @return {object} GridToFullscreenEffect instance  
 */

  function createDemoEffect(options,navigate,element) {

    const transitionEffect = new GridToFullscreenEffect(
      document.getElementById("app"),
      document.getElementById("itemsWrapper"),
    //  document.querySelector(".slider"),
      Object.assign(
        {
          scrollContainer: window,
          onToFullscreenStart: ({ index }) => {},
          onToFullscreenFinish: ({ index }) => {
            navigate('/Projects/Photos',{state:{data:element}});
          },
          onToGridStart: ({ index }) => {},
          onToGridFinish: ({ index, lastIndex }) => {}
        },
        options
      )
    );
  
    return transitionEffect;
  }
















const PhotoGalery=()=>{
  
  //obtiene el parametro enviado en la ruta
  const {id} = useParams();
  const navigate = useNavigate();


  //endpoint para consultar proyectos
  let api = helpHttp();  
  let host = window.location.protocol + "//" + window.location.hostname;
  let urlProject = host + "/hebbe_backend/public/api/Project";
  const headers= {
    Authorization: 'Bearer ' + localStorage.getItem('token')  
  }
  const [cargando,setCargando] = useState(false);
  const [error,setError] = useState(false);
  const [mainBg,setMainBg] = useState('white');

  //almacena las fotos de las galerias
  const [fotos, setFotos] = useState(null);
  //const [direction, setDirection] = useState('');
let direction=''

  
  const [mouseOver, setMouseOver] = useState(0);

  //controla el erros en apis
  const errorHandle=(status, msg)=>{
    if (status == 401) {
      localStorage.clear();
      setLogged(false)
    } 
    setCargando(false) 
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 10000);
    // setSuccess(false)
    setErrorMessage(msg);
  }

  //consulta los proyectos al backend
  const update = (registro) => {  
    setCargando(true)
    api.get(urlProject +'/'+ id ,{ headers})
    .then((res) => { 
     // console.log(res.sections,';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
      setCargando(false)
      if (!res.err) {
      // setFotos(res.photos.map((i)=>host+"/hebbe_backend/public/storage/"+i.name))
       // setFotos(res.sections.map((i)=>host+"/hebbe_backend/public/storage/"+i.pivot.portada))
        setFotos(res.sections.map((i)=>({foto:host+"/hebbe_backend/public/images/"+i.pivot.portada,
          title:i.title,text:i.text,subtitle:i.subtitle,textColor:i.pivot.textcolor,bgColor:i.pivot.bgcolor,photos:i.pivot.photos
        })));
        
      } 
      else {
        errorHandle(res.status,res.error_text)
      }
    }); 
  }
























  

  const threeJsZoomAnimation=(elIndex)=>{
 
    
    let currentIndex;
	const itemsWrapper = document.getElementById("itemsWrapper");
	//const itemsWrapper = document.querySelector(".slider");
 
	const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];
	const fullviewItems = [...document.querySelectorAll(".fullview__item")];
	const backToGridCtrl = document.querySelector(".fullview__close");
	const transitionEffectDuration = 1.2;



  

	const transitionEffect = createDemoEffect({
		activation: { type: "mouse" },
		timing: {
			duration: transitionEffectDuration
		},
		transformation: {
			type: "simplex",
			props: {
				seed: "8000",
				frequencyX: 0.2,
				frequencyY: 0.2,
				amplitudeX: 0.3,
				amplitudeY: 0.3
			}
		},
		onToFullscreenStart: ({ index }) => {
			currentIndex = index;
			thumbs[currentIndex].style.opacity = 0;
			transitionEffect.uniforms.uSeed.value = index * 10;
			toggleFullview();
		},
		onToGridFinish: ({ index, lastIndex }) => {
			thumbs[lastIndex].style.opacity = 1;
			fullviewItems[currentIndex].classList.remove("fullview__item--current");
		},
		seed: 800,
		easings: {
			toFullscreen: 'Power1.easeOut',
			toGrid: 'Power1.easeInOut'
		}
	},navigate,fotos[elIndex]);




	transitionEffect.init();
	const toggleFullview = () => {
		if (transitionEffect.isFullscreen) {
			TweenLite.to(fullviewItems[currentIndex].querySelector(".fullview__item-title"), 0.2, {
				ease: Quad.easeOut,
				opacity: 0,
				x: "5%"
			});
			TweenLite.to(backToGridCtrl, 0.2, {
				ease: Quad.easeOut,
				opacity: 0,
				scale: 0
			});

			transitionEffect.toGrid();
		} else {
			fullviewItems[currentIndex].classList.add("fullview__item--current");

			TweenLite.to(fullviewItems[currentIndex].querySelector(".fullview__item-title"), 1, {
				ease: 'Expo.easeOut',
				startAt: { x: "5%" },
				opacity: 1,
				x: "0%",
				delay: transitionEffectDuration * 0.6
			});
			TweenLite.to(backToGridCtrl, 1, {
				ease: 'Expo.easeOut',
				startAt: { scale: 0 },
				opacity: 1,
				scale: 1,
				delay: transitionEffectDuration * 0.6
			});
		}
	};

	backToGridCtrl.addEventListener("click", () => {
		if (transitionEffect.isAnimating) {
			return;
		}
		toggleFullview();
	});

	// Preload all the images in the page
	imagesLoaded(document.querySelectorAll("img.grid__item-img"), instance => {
		//https://www.techrepublic.com/article/preloading-and-the-javascript-image-object/
		document.body.classList.remove("loading");
    
		// Make Images sets for the transition effect
		let images = [];
		for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
      let image = {
        element: instance.elements[i],
				image: instance.images[i].isLoaded ? instance.images[i].img : null
			};
      imageSet.small = image;
      imageSet.large = image;
      images.push(imageSet);
/* 			if (i % 2 === 0) {
        imageSet = {};
				imageSet.small = image;
			}
      
			if (i % 2 === 1) {
        imageSet.large = image;
				images.push(imageSet);
			} */
      console.log(images);
		}
		//transitionEffect.createTextures(images);
		transitionEffect.loadImage(images);


    
	});
  }


























  //estado de montaje consulta de proyectos
  useEffect(()=>{
    update(id)
  },[])


//almacena el progreso global del scroll
  const [progress,setProgress]=useState(0)


//agrega el plugin flip a gsap
  gsap.registerPlugin(Flip) 

//controles del scroll
  const arrowsWrapperNext=useRef()
  const nextArrow=useRef()
  const arrowsWrapperPrev=useRef()
  const prevArrow=useRef()





  
  useEffect(()=>{
    if (fotos) {
      
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
    //arrows folow to cursor
    const {left:nextLeft,width : widthArrowNext ,top:nextTop,height:nextHeight  } = nextArrow.current.getBoundingClientRect();
    const {left:prevLeft,width : widthArrowPrev ,top:prevTop,height:prevHeight  } = prevArrow.current.getBoundingClientRect();
    arrowsWrapperNext.current.addEventListener("mousemove", function( event ) {
      const { clientX, clientY} = event;
      event.target.style.transform='scale(2,2)';
      nextArrow.current.style.transform= '  translateX('+ (clientX- ((nextLeft+widthArrowNext/2)))*.4+'px) translateY('+ (clientY- ((  nextTop+nextHeight/2)))*.4+'px)'
    });

    arrowsWrapperPrev.current.addEventListener("mousemove", function( event ) {
      const { clientX, clientY} = event;
      event.target.style.transform='scale(2,2)';
     prevArrow.current.style.transform= '  translateX('+ (clientX- ((prevLeft+widthArrowPrev/2)))*.4+'px) translateY('+ (clientY- ((  prevTop+prevHeight/2)))*.4+'px)'
    });
    
    
    arrowsWrapperNext.current.addEventListener("mouseout", function( event ) {
      event.target.style.transform='scale(1,1)';
    nextArrow.current.style.transform= '  translateX(0px)  translateY(0px)'

    });
    
    arrowsWrapperPrev.current.addEventListener("mouseout", function( event ) {
      event.target.style.transform='scale(1,1)';
    prevArrow.current.style.transform= '  translateX(0px)  translateY(0px)'

    });
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
    // Slider
    const slider  = document.querySelector('.slider');//GUARDA LA REFERENCUA DEL DIV SLIDER PARA AGREGARLE LOS EVENTOS WHEEL Y TOUCH
    let slides  = Array.from(document.querySelectorAll('.slide')); //array con cada una de lOS CONTENEDORES DE  fotis
    let slidesArray = Array.from(slides);//array con cada una de lOS CONTENEDORES DE  fotis
    let slideWidth  = slides[0].getBoundingClientRect().width; //ancho de CONTENEDOR DE  foto



// Counters
    let counters  = Array.from(document.querySelectorAll('.counter__li'));
    let countersArray  = Array.from(counters);
    let transform = 0;
    let originX= slides[0].getBoundingClientRect().left;  
    const beginingCounter=countersArray[0].getBoundingClientRect().top;
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
          //element.style.transform = `translateX(${percent}%)`;
          element.style[`${position}`] = `${percent}%`;
      })
    }




// Clone and position slide panels

 //   cloneElements(slides, slidesArray);// duplica los elementos
    positionElements(slidesArray, 'left')//distribuye los elementos en la pantall

// Clone and position counters

   // cloneElements(counters, countersArray);
    positionElements(countersArray, 'top')
    // Add and position images

    

    //se crea instancia de clase imagecontainer por cada seccion
    let imageContainers = [];
    for(let i = 0; i < slidesArray.length; i++){
      let imageContainer = new ImageContainer(fotos[i%(fotos.length)].foto, slidesArray[i],i%(fotos.length),fotos[i%(fotos.length)].textColor,
      fotos[i%(fotos.length)].bgColor,fotos[i%(fotos.length)].title, fotos[i%(fotos.length)].text,fotos[i%(fotos.length)].subtitle);
      imageContainers.push(imageContainer);
    }






//al posicionar cursor mostar el titulo de la seccion
const allImage=gsap.utils.toArray(".image__container")
     // const allImage=Array.from(document.querySelectorAll('.image__container'))
      allImage.forEach((element,index) => {        
        element.addEventListener('mouseover',()=>{
          progressInfoHover(true, element.dataset.title)
        });
        element.addEventListener('mouseout',()=>{
          progressInfoHover(false, element.dataset.title)
        });
      });

      const progressInfoHover=(enter,data)=>{
        const wrapperProgess=document.querySelector('.progress-info-wrapper')
        const slideTitle=document.querySelector('.slide-title')
        if (enter) {
          wrapperProgess.classList.add("hover");
          slideTitle.classList.add("hover");
          slideTitle.innerHTML = "<span>"+data+"</span>";
          setMouseOver(1)
        }
        else{
          wrapperProgess.classList.remove("hover");
          slideTitle.classList.remove("hover");
          setMouseOver(0)
        }
      }
  
  

      //-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
        //first zoom


        function showDetails(item) {
          
          if (activeItem) { // someone could click on an element behind the open details panel in which case we should just close it.
            return hideDetails();
          }
          let onLoad = () => {
            // position the details on top of the item (scaled down)
            Flip.fit(details, item, {scale: true, fitChild: detailImage});
        
            // record the state
            const state = Flip.getState(details);
            // set the final state
            gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
            
        
            gsap.set(details, {xPercent: -100, /* top: "50%", yPercent: -50, */background:data.bgColor, visibility: "visible", overflow: "hidden"});
        
            Flip.from(state, {
              duration: 0.5,
              ease: "power2.inOut",
              scale: true,
              onComplete: () => gsap.set(details, {overflow: "auto"}) // to permit scrolling if necessary
            })
              // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
              .to(detailContent, {yPercent: 0,color:data.textColor  ,opacity:1            }, 0.2);
        
            detailImage.removeEventListener("load", onLoad);
            details.addEventListener('click', hideDetails );
           
              threeJsZoomAnimation(item.dataset.index)
           

          };
        
          const data = item.dataset;          
          detailImage.addEventListener("load", onLoad);
          detailImage.src = item.querySelector('img').src;
          detailTitle.innerText = data.title;
          setMainBg(data.bgColor)
          detailSecondary.innerText = data.subtitle;
          detailDescription.innerText = data.text;
        
          // stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
       //   gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);
         // gsap.to(".app", {backgroundColor: "#888", duration: 1, delay: 0.3}); // fade out the background
          activeItem = item;

        }

        
      function hideDetails(e) {
  
      if (e.target.getAttribute("name")=='slider-zoom-wrapperImage') {

 
        return
       let elBody=document.querySelector('body');
      
       elBody.innerHTML=elBody.innerHTML+'<div class="temporary-hero"><div class="outer content-full-width text-align-center"><div class="inner"></div></div></div>'
    
       gsap.to(".slider-zoom-wrapper .secondary, .slider-zoom-wrapper .description", { 
        duration: 0.3, y:30,  opacity:0, delay:0, stagger:0, ease:'Power2.easeIn'});
       gsap.to(" .slide-link", { duration: 0.3, opacity:0, scale:0.8, delay:0, ease:'Power2.easeIn' });

       setTimeout( function(){
    //		$("body").addClass("show-loader");
        gsap.set(".slider-zoom-wrapper .title", { yPercent:0, opacity:1});
      //	gsap.set($(".slider-zoom-wrapper .slide-title span"), { yPercent:0, opacity:1});
      
        const slideTitle =  document.querySelector('.slider-zoom-wrapper .title');
        const temporaryHero = document.querySelector('.temporary-hero .inner');

        const titlePosition = Flip.getState(".slider-zoom-wrapper .title");

        slideTitle.classList.add("end-position");
    //		const titlePositionSpan = Flip.getState(".slider-zoom-wrapper .slide-title span");
        temporaryHero.append(slideTitle);
        // Apply animation to 'titlePosition'
        Flip.from(titlePosition, {
          duration: 1,
          delay:0.3,
          ease: 'Power2.easeInOut',
        });


                  
      } , 300 );
      
     //  gsap.to($(".slider-thumbs-wrapper .trigger-item"), 
     //  {duration: 0.3, y: 160, x:0,  opacity:1, stagger:0.05,  delay:0, ease:Power2.easeIn}); mini imagenes
       
    //   gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
    
     //  gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
     //  gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
      // $("#ball").removeClass("with-blur color-cursor");
      //   $('#ball p').remove();



        
        //let tltransition = gsap.timeline({paused:true})
       // .fromTo(e.target , 2.2, {scaleX: 1},{scaleX: 2, transformOrigin:'left', ease: 'Power4.easeInOut'},)
       // .fromTo($frameBlack , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},.2)
       // .fromTo($logo , 1.6, {xPercent: -100, autoAlpha:0 },{xPercent: 0, autoAlpha:1, ease: Power4.easeInOut},.7)
       // .set($frameRed, {scaleX:0})
       // .set($img2, {autoAlpha:0})
       // .to($frameBlack , 2.2, {scaleX: 0, transformOrigin:'right', ease: Power4.easeInOut})
       // .to($logo , .2, {autoAlpha:0 },'-=1.2') 
       // tltransition.play(0);
        
       
       
       return ;



      }
      details.removeEventListener('click', hideDetails);
      gsap.set(details, {overflow: "hidden"});
      // record the current state of details
      const state = Flip.getState(details);
    
      // scale details down so that its detailImage fits exactly on top of activeItem
      Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});
    
      // animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
      const tl = gsap.timeline();
      tl.set(details, {overflow: "hidden", background:'white'})
        .to(detailContent, {yPercent: 100,opacity:0})
        .to(allImage, {opacity: 1, stagger: {amount: 0.7, from: allImage.indexOf(activeItem), grid: "auto"}})
      //  .to(".app", {backgroundColor: "#fff"}, "<");
    
      // animate from the original state to the current one.
      Flip.from(state, {
        scale: true,
        duration: 0.5,
        delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
        onInterrupt: () => tl.kill()
      })
        .set(details, {visibility: "hidden"});
    
      activeItem = null;
setMainBg('white')

    }

    

    //  const items = gsap.utils.toArray(".image__container"),
      const details = document.querySelector('.slider-zoom-wrapper'),
      detailContent = document.querySelector('.content'),
      detailImage = document.querySelector('.slider-zoom-wrapper img'),
      detailTitle = document.querySelector('.slider-zoom-wrapper .title'),
      detailSecondary = document.querySelector('.slider-zoom-wrapper .secondary'),
      detailDescription = document.querySelector('.slider-zoom-wrapper .description');
    //  gsap.set(detailContent, { yPercent: 100 }); // close the details "drawer" (content) initially

      let activeItem; // keeps track of which item is open (details)
        
      // Add click listeners
     // gsap.utils.toArray('.image__container').forEach(item => item.addEventListener('click', () => showDetails(item)));
      allImage.forEach(item => item.addEventListener('click', () => showDetails(item)));
  
  
  
  
  
      /* 
  
      const transitionEffect = new GridToFullscreenEffect();

     
       */
  
    
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
















    
    
    //avanzar por el scroll
    const advance =(num)=>{
      if (num>0) {
        //setDirection('left')
        direction='left'
    }
    else{
      //  setDirection('right')
      direction='right'

    }
      transform -= num;
      for(let i = 0; i < slidesArray.length; i++){
         imageContainers[i].advance(num);

         
         countersArray[i].dataset.translateX=countersArray[i].dataset.translateX||0;
         countersArray[i].dataset.translateX -= num;




/* 
               // slidesArray[i].style.transform = `translateX(${(transform / (window.innerWidth * .6)) * 100}%)`;
       imageContainers[i].move(slideWidth,slidesArray,originX,i);
       moveCounter(countersArray[i], transform,i)
        setProgress((transform / (window.innerWidth * .6)) * 100)
        imageContainers[i].animate(); */
      }
    }

    document.querySelector('.cp-button-next').addEventListener('click',()=>{advance(500)})
    document.querySelector('.cp-button-prev').addEventListener('click',()=>{advance(-500)})

    slider.addEventListener('wheel', (e) => {
      advance( e.deltaY)
     // transform -= e.deltaY;
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



const moveCounter=(el,amount,index)=>{
  el.style.transform = `translateY(${(parseFloat(el.dataset.translateX) / (window.innerWidth * .6)) * 100}%)`;
 
 


 
 if (direction=='right') {
  
 
  if(el.getBoundingClientRect().top > (el.getBoundingClientRect().width * countersArray.length)+ beginingCounter){ 
    el.style.top = ` ${ -(((countersArray.length/2)+(countersArray.length-index))*100)       }%`;
   
    if (parseFloat(el.dataset.translateX)   <0  && direction=='right') 
      {
  
        el.dataset.translateX=parseFloat(el.dataset.translateX)+ (  (((countersArray.length+1)*100)/100)* (window.innerWidth * .6))
        //  if (index==2) {
            alert(index)  
            console.log(index,'cambio de dir')
         // }
   
      }
    
    //=============================================================================================
     if((parseFloat(el.dataset.translateX) / (window.innerWidth * .6)) * 100>((countersArray.length*2)-1)*100){   
      el.dataset.translateX=parseFloat(el.dataset.translateX)-  (  (((countersArray.length+1.5)*100)/100)* (window.innerWidth * .6))
      el.style.transform = `translateY(${(parseFloat(el.dataset.translateX)/ (window.innerWidth * .6)) * 100}%)`;
    }
//======================================================================================= 

} }


 if (direction=='left') {

//======================================================================================= 
  if(el.getBoundingClientRect().top < -(el.getBoundingClientRect().width  *countersArray.length)+ beginingCounter){ 
    
    el.style.top = ` ${ (((countersArray.length/2)+((index)))*100)       }%`;
    if((parseFloat(el.dataset.translateX) / (window.innerWidth * .6)) * 100<-((countersArray.length*2)-2)*100){ 

      console.log(index,'reposiciona',parseFloat(el.dataset.translateX)+  (  (((countersArray.length+1.5)*100)/100)* (window.innerWidth * .6)));
      el.dataset.translateX=parseFloat(el.dataset.translateX)+  (  (((countersArray.length+1.5)*100)/100)* (window.innerWidth * .6))
      el.style.transform = `translateY(${(parseFloat(el.dataset.translateX) / (window.innerWidth * .6)) * 100}%)`;
      /*     
        */
      } 
    }
  }
    //======================================================================================= 




}


// Animation loop
function animate() {
  //  if (!isTouching && Math.abs(speedX) > 0.1) {
  //    alert('no esta touch')
  //      // Apply deceleration effect
  //      speedX *= 0.95; // Adjust the deceleration factor as needed
  //      transform += speedX;  
  //  }
   

   
   
 
        // Reset transform position at limit to get infinite effect
    //if(transform > slideWidth * (slidesArray.length / 4)){ transform = -(slideWidth * (slidesArray.length / 4));}
   // if(transform < -(slideWidth * (slidesArray.length / 4))) {transform = (slideWidth * (slidesArray.length / 4));}
    for(let i = 0; i < slidesArray.length; i++){
     
     
      // slidesArray[i].style.transform = `translateX(${(transform / (window.innerWidth * .6)) * 100}%)`;
       imageContainers[i].move(slideWidth,slidesArray,originX,i);
       moveCounter(countersArray[i], transform,i)
        setProgress((transform / (window.innerWidth * .6)) * 100)
        imageContainers[i].animate();




    }
    requestAnimationFrame(animate);
}

    //animacion de entrada
    gsap.from('.photoGaleryFooter', {autoAlpha: 0, yPercent: 30, stagger: 0.04,delay:6});
    gsap.from('.counter', {autoAlpha: 0, yPercent: 30, stagger: 0.04,delay:6});
    gsap.from('.clapat-counter-intro', {autoAlpha: 0, yPercent: 30, stagger: 0.04,delay:6});
    gsap.from('.crosshair', {autoAlpha: 0,scale:.1, stagger: 0.04,delay:6});
    gsap.from(".image__container", {autoAlpha: 0.5, xPercent:200, duration:1, ease: "power2.out", delay:5});
    setTimeout(() => {
      animate();
      
    }, 6000);
      







    }

},[fotos])

    return (     
      <div className="photoGalery">
        <GaleryLoader></GaleryLoader>
        <MenuV2 isportal={false} ></MenuV2>
        <Tittle isportal={false}></Tittle>
        <GalleryCursor    mouseOver={mouseOver}/>
        <main style={{background:mainBg}}>

          <div className="slider">
            <div className="counter">
                <div>
                   {/*  / */}
                </div>
                <div>
                  <ul className="counter__list">

                    
                {fotos?.map((foto,index)=>
                  <li className="counter__li" key={index}>/{(index+1).toString().padStart(2, '0')}</li>
                )}
                   {/*  <li className="counter__li">/01</li>
                    <li className="counter__li">/02</li>
                    <li className="counter__li">/03</li>
                    <li className="counter__li">/04</li>
                    <li className="counter__li">/05</li>
                    <li className="counter__li">/06</li>
                    <li className="counter__li">/07</li>
                    <li className="counter__li">/08</li> */}
                  </ul>
                </div>
            </div>
            

              <div className="clapat-counter-intro  "  >
                <span>PR.</span>
              </div>
              <div className="slider__viewport">
                <div className="crosshair"> 
                  {
                    
                    mouseOver?
                    
                  <svg xmlns="http://www.w3.org/2000/svg"  width="32" height="32" viewBox="0 0 24 24" preserveAspectRatio="none"  
                  id='btnNext' style={{transform: 'rotateY(180deg)'}} >
                  <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
                </svg>
                    :
                    <svg viewBox="0 0 30 30" preserveAspectRatio="xMidYMid slice" >
                    <defs>
                      <clipPath id="__lottie_element_5630">
                        <rect width={30} height={30} x={0} y={0} />
                      </clipPath>
                      <clipPath id="__lottie_element_5632">
                        <path d="M0,0 L200,0 L200,200 L0,200z" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_5630)">
                      <g
                        clipPath="url(#__lottie_element_5632)"
                        transform="matrix(0.15000000596046448,0,0,0.15000000596046448,0,0)"
                        opacity={1}
                        style={{
                          display: "block",
                        }}
                      >
                        <g
                          transform="matrix(9,0,0,9,100,100)"
                          opacity={1}
                          style={{
                            display: "block",
                          }}
                        >
                          <g opacity={1} transform="matrix(1,0,0,1,0,0)">
                            <path
                              strokeLinecap="butt"
                              strokeLinejoin="bevel"
                              fillOpacity={0}
                              stroke="black"
                              strokeOpacity={1}
                              strokeWidth={1}
                              d=" M-0.006000000052154064,9.59000015258789 C-0.006000000052154064,9.59000015258789 -0.006000000052154064,-9.59000015258789 -0.006000000052154064,-9.59000015258789 C-0.006000000052154064,-9.59000015258789 0.125,-4.9079999923706055 2.3289999961853027,-2.494999885559082 C4.790999889373779,0.20000000298023224 9.59000015258789,-0.004000000189989805 9.59000015258789,-0.004000000189989805 C9.59000015258789,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 C-9.59000015258789,-0.004000000189989805 -4.796000003814697,-0.04699999839067459 -2.441999912261963,2.322999954223633 C-0.007000000216066837,4.775000095367432 -0.006000000052154064,9.59000015258789 -0.006000000052154064,9.59000015258789z"
                            />
                          </g>
                        </g>
                        <g
                          transform="matrix(9,0,0,9,100,100)"
                          opacity={1}
                          style={{
                            display: "block",
                          }}
                        >
                          <g opacity={1} transform="matrix(1,0,0,1,0,0)">
                            <path
                              strokeLinecap="butt"
                              strokeLinejoin="bevel"
                              fillOpacity={0}
                              stroke="black"
                              strokeOpacity={1}
                              strokeWidth={0.1}
                              d=" M-0.006000000052154064,9.59000015258789 C-0.006000000052154064,9.59000015258789 -0.006000000052154064,-9.59000015258789 -0.006000000052154064,-9.59000015258789 C-0.006000000052154064,-9.59000015258789 0.125,-4.9079999923706055 2.3289999961853027,-2.494999885559082 C4.790999889373779,0.20000000298023224 9.59000015258789,-0.004000000189989805 9.59000015258789,-0.004000000189989805 C9.59000015258789,-0.004000000189989805 0.0020000000949949026,-0.004000000189989805 0.0020000000949949026,-0.004000000189989805 C0.0020000000949949026,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 C-9.59000015258789,-0.004000000189989805 -4.796000003814697,-0.04699999839067459 -2.441999912261963,2.322999954223633 C-0.007000000216066837,4.775000095367432 -0.006000000052154064,9.59000015258789 -0.006000000052154064,9.59000015258789z"
                            />
                          </g>
                        </g>
                        <g
                          transform="matrix(9,0,0,9,100,100)"
                          opacity={1}
                          style={{
                            display: "block",
                          }}
                        >
                          <g opacity={1} transform="matrix(1,0,0,1,0,0)">
                            <path
                              strokeLinecap="butt"
                              strokeLinejoin="bevel"
                              fillOpacity={0}
                              stroke="black"
                              strokeOpacity={1}
                              strokeWidth={0.1}
                              d=" M-0.006000000052154064,9.59000015258789 C-0.006000000052154064,9.59000015258789 -0.006000000052154064,-9.59000015258789 -0.006000000052154064,-9.59000015258789 C-0.006000000052154064,-9.59000015258789 0.125,-4.9079999923706055 2.3289999961853027,-2.494999885559082 C4.790999889373779,0.20000000298023224 9.59000015258789,-0.004000000189989805 9.59000015258789,-0.004000000189989805 C9.59000015258789,-0.004000000189989805 0.0860000029206276,-0.004000000189989805 0.0860000029206276,-0.004000000189989805 C0.0860000029206276,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 C-9.59000015258789,-0.004000000189989805 -4.796000003814697,-0.04699999839067459 -2.441999912261963,2.322999954223633 C-0.007000000216066837,4.775000095367432 -0.006000000052154064,9.59000015258789 -0.006000000052154064,9.59000015258789z"
                            />
                          </g>
                        </g>
                        <g
                          transform="matrix(9,0,0,9,100,100)"
                          opacity={1}
                          style={{
                            display: "block",
                          }}
                        >
                          <g opacity={1} transform="matrix(1,0,0,1,0,0)">
                            <path
                              strokeLinecap="butt"
                              strokeLinejoin="bevel"
                              fillOpacity={0}
                              stroke="black"
                              strokeOpacity={1}
                              strokeWidth={0.1}
                              d=" M-0.006000000052154064,9.59000015258789 C-0.006000000052154064,9.59000015258789 -0.006000000052154064,-9.59000015258789 -0.006000000052154064,-9.59000015258789 C-0.006000000052154064,-9.59000015258789 0.125,-4.9079999923706055 2.3289999961853027,-2.494999885559082 C4.790999889373779,0.20000000298023224 9.59000015258789,-0.004000000189989805 9.59000015258789,-0.004000000189989805 C9.59000015258789,-0.004000000189989805 0.0860000029206276,-0.004000000189989805 0.0860000029206276,-0.004000000189989805 C0.0860000029206276,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 -9.59000015258789,-0.004000000189989805 C-9.59000015258789,-0.004000000189989805 -4.796000003814697,-0.04699999839067459 -2.441999912261963,2.322999954223633 C-0.007000000216066837,4.775000095367432 -0.006000000052154064,9.59000015258789 -0.006000000052154064,9.59000015258789z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                
                }




                </div>

 
                {fotos?.map((foto,index)=>
                  <div className="slide"    data-transform={index%2==0?"0.5":"0"}     data-width={((index%3)*10)+40+'%'} 
                   data-justify= {index%3==1?"flex-end" :index%3==2?"flex-start":"center"} /*  data-textcolor={foto.textColor}
                   data-bgcolor={foto.bgColor}  data-title={foto.title} data-text={foto.text} data-subtitle={foto.subtitle}  */
                    key={index}>
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                )}
          {/*       <div className="slide"    data-transform="0.5" data-width="60%" data-justify="flex-end">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide center"    data-transform="0" data-width="50%"  data-justify="flex-start">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide"    data-transform="0.5" data-width="40%"  data-justify="center">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide center"    data-transform="0"  data-width="60%" data-justify="flex-end">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide"    data-transform="0.5" data-width="50%"  data-justify="center">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide center"    data-transform="0" data-width="40%"  data-justify="flex-start">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide flex-end"     data-transform="0.5"  data-width="60%" data-justify="flex-end">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div>
                <div className="slide center"    data-transform="0" data-width="50%"  data-justify="center">
                  <a className="slide-link" data-type="page-transition" href="project06.html"></a>
                </div> */}
            </div>
              
            
        </div>

        <div className="photoGaleryFooter">
          <div className="photoGaleryFooterSecction"></div>
         
          <div className="photoGaleryFooterSecction  progress-info">
            <div className="progress-info-wrapper">
              <div className="progress-info-fill" style={{
                backgroundSize :
                progress<=0?
                Math.abs((progress/8)%100)+'% 100%'
                :
                
               100- Math.abs((progress/8)%100)+'% 100%'
              
              }}
                >SCROLL OR DRAG </div>
             
              <div className="progress-info-fill-2"
               style={{

                
               
                backgroundSize:progress<=0?
                 100- Math.abs( ((progress)%800))<0?0:100- Math.abs( ((progress)%800))+"% 100%"
                :
                 (progress-(700*(Math.trunc (progress/800) +1)))<0?0:(progress-700)%700 +"% 100%"

                
                }}>SCROLL OR DRAG   </div>
            </div>
          </div>

          <div className="external-caption">
            <div className="slide-title" data-caption="1">
               
            </div>
          </div>

          <div className="photoGaleryFooterArrows">
           
           <div className="cp-button-prev">

            <div className="buttonWrapper" ref={arrowsWrapperPrev} >
              <div className="buttonArrow" ref={prevArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" id='btnPrev'   width="16" height="16" viewBox="0 0 24 24" preserveAspectRatio="none"   >
                  <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
                </svg>
              </div>

            </div>
           </div>
           <div className="cp-button-next">

            <div className="buttonWrapper"   ref={arrowsWrapperNext}>
              <div className="buttonArrow"  ref={nextArrow}> 
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24" preserveAspectRatio="none"  
                  id='btnNext' style={{transform: 'rotateY(180deg)'}} >
                  <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
                </svg>
              </div>
            </div>
          </div>
          </div>








        </div>
    </main>

{/* ============================================================================================
================================================================================================
================================================================================================
================================================================================================
                first zoom dom */}
 
 


      <div className="slider-zoom-wrapper" >
   <div id="app"></div>                       {/*   para three js effect */}

   <div className="grid" id="itemsWrapper">
<figure className="grid__item">
<img name="slider-zoom-wrapperImage"  className="grid__item-img" />
        <figcaption className="content  grid__item-caption">
          <div className="title grid__item-title">Placeholder title</div>
          <div className="secondary"></div>
          <div className="description grid__item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.</div>
        </figcaption>
</figure>
</div>
</div>



{/*       <div className="grid" id="itemsWrapper">

<figure className="grid__item">
  <img className="grid__item-img" src="assets/img/12.jpg" alt="A picture of a street in Rome" />
  <img className="grid__item-img grid__item-img--large" src="assets/img/12_large.jpg" />
  <figcaption className="grid__item-caption">
    <h2 className="grid__item-title">Wisma Green</h2>
    <p className="grid__item-text">
      This present moment is perfect simply due to the fact you're experiencing it. We're trying to teach you a technique here and how to use it. 
    </p>
  </figcaption>
</figure>
</div> */}


{/* ============================================================================================
================================================================================================
================================================================================================
================================================================================================
                three js animation dom */}




      <div className="fullview">
     <div className="fullview__item">
       <h2 className="fullview__item-title">Neka Lax</h2>
     </div>
     <div className="fullview__item">
       <h2 className="fullview__item-title">André Free</h2>
     </div>
     <div className="fullview__item">
       <h2 className="fullview__item-title">Wisma Green</h2>
     </div>
     <button className="fullview__close" aria-label="Close preview"><svg aria-hidden="true" width="24" height="22px" viewBox="0 0 24 22"><path d="M11 9.586L20.192.393l1.415 1.415L12.414 11l9.193 9.192-1.415 1.415L11 12.414l-9.192 9.193-1.415-1.415L9.586 11 .393 1.808 1.808.393 11 9.586z" /></svg></button>
   </div>





    </div>
    );
  }

export  default PhotoGalery;



 
