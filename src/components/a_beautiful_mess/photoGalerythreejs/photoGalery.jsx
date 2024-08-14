import React, { useEffect,useRef,useState } from "react";
import './photoGalery.css';
 

import MenuV2 from "../menuV2/menuV2.jsx";
import Tittle from "../tittle/tittle.jsx";
import { gsap,TweenLite } from "gsap"; 
import {Flip} from 'gsap/Flip';
import GaleryLoader from "../galeryLoader/galeryLoader.jsx";
import GalleryCursor from "../galleryCursor/galleryCursor.jsx";
import {useParams} from 'react-router-dom';
import {helpHttp} from '../../../helpers/helpHttp';

import * as THREE from "three";
import {GridToFullscreenEffect} from "./GridToFullscreenEffect"
 
   
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; 



/**
  Basic setup for demos.
  @param {object} options - GridToFullscreenEffect options. Lots of them
  @return {object} GridToFullscreenEffect instance  
 */

  function createDemoEffect(options) {
    const transitionEffect = new GridToFullscreenEffect(
      document.getElementById("app"),
      document.getElementById("itemsWrapper"),
      Object.assign(
        {
          scrollContainer: window,
          onToFullscreenStart: ({ index }) => {},
          onToFullscreenFinish: ({ index }) => {},
          onToGridStart: ({ index }) => {},
          onToGridFinish: ({ index, lastIndex }) => {}
        },
        options
      )
    );
  
    return transitionEffect;
  }
  

const PhotoGalery = () => {
 
  useEffect(()=>{ 



    let currentIndex;
	const itemsWrapper = document.getElementById("itemsWrapper");
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
	});
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
	imagesLoaded(document.querySelectorAll("img"), instance => {
		//https://www.techrepublic.com/article/preloading-and-the-javascript-image-object/
		document.body.classList.remove("loading");

		// Make Images sets for the transition effect
		let images = [];
		for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
			let image = {
				element: instance.elements[i],
				image: instance.images[i].isLoaded ? instance.images[i].img : null
			};
			if (i % 2 === 0) {
				imageSet = {};
				imageSet.small = image;
			}

			if (i % 2 === 1) {
				imageSet.large = image;
				images.push(imageSet);
			}
		}
		transitionEffect.createTextures(images);
	});
  },[])
  return (
<main>
 

   <div id="app"></div>
   <div className="grid" id="itemsWrapper">

     <figure className="grid__item">
       <img className="grid__item-img" src="http://localhost/hebbe_backend/public/storage/projects/2024-07-08/Kids-MisterCorn-BestInFood-Award-Creativity-Advertising.jpg" alt="A picture of a street in Rome" />
       <img className="grid__item-img grid__item-img--large" src="http://localhost/hebbe_backend/public/storage/projects/2024-07-08/Kids-MisterCorn-BestInFood-Award-Creativity-Advertising.jpg" />
       <figcaption className="grid__item-caption">
         <h2 className="grid__item-title">Wisma Green</h2>
         <p className="grid__item-text">
           This present moment is perfect simply due to the fact you're experiencing it. We're trying to teach you a technique here and how to use it. 
         </p>
       </figcaption>
     </figure>
   </div>




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
 </main>
  );
}; 


export  default PhotoGalery;



 
