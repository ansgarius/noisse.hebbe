import React, { useEffect, useState }  from 'react';
import "./gallery.css";
import Menu from '../menu/menu';
import Background from '../background/Background';
import {Link} from "react-router-dom";
import { useLocomotiveScroll } from 'react-locomotive-scroll'
const Gallery=({x,setX,imagen1,imagen2,numItems,reverse,dark, setDark,name,isRowLeftImg2,isRowLeftText, rowLeftContentReverse, DesckRowRightImg1Right,
    isRowRightText, TabletaRowRightTextTop, DeskRowRightImg1Width, DeskRowRightImg1Height, DeskRowRightImg2Width, DeskRowRightImg2Height,rowRightImg1MR,DesckRowRightImg2MR,
    DeskRowLeftImg1Width , DeskRowLeftImg1Right,DeskRowLeftImg1Bottom,  DeskRowLeftImg1Height,TabletaRowLeftImg1Height,TabletaRowLeftImg1Width, TabletaRowLeftImg1Left, TabletaRowRightImg2Right,
    TabletaRowRightImg2Width,  TabletaRowRightImg2Height, TabletaRowRightImg2Top, TabletaRowRightTextLeft,TabletaRowLeftImg1Top,TabletaRowRightImg2Bottom,

    TabletaRowRightImg1Width,   TabletaRowRightImg1Height , TabletaRowRightImg1Top,TabletaRowRightImg1Left,TabletaRowRightImg1Bottom,
    DeskRowRightImg1Top,DeskRowRightImg1Left,DeskRowRightImg2Left,DeskRowRightImg2Bottom,

 setisportal,

              CelRowRightImg2Width,
              CelRowRightImg2Height,
              CelRowRightImg2Top,
              CelRowRightImg2Right,
              CelRowRightImg2Left,CelRowRightImg2Bottom,

    CelRowRightImg1Width,
    CelRowRightImg1Height,
    CelRowRightImg1Top,CelRowRightImg1Bottom,
    CelRowRightImg1Left,
    CelRowRightImg1Right,

    CelRowLeftTextLeft,
    DesckRowLeftTextLeft,



    CelRowLeftImg1Width,CelRowLeftImg1Top,
    CelRowLeftImg1Height,
    CelRowLeftImg1Left,
 urlLink1 ,urlLink2
})=>{



    const { scroll } = useLocomotiveScroll()
    useEffect(()=>{
        if (scroll) { 
 

    scroll.on("call", ((e,t,a)=>{ 
        //console.log(t);
                      //  const i = document.querySelector("body").classList;
                        switch (e) {
                        case "unconditional":
                        case "embrace":
                        case "bliss":
                        case "graces":{

                            if ("enter" === t) {
                                setisportal(0);
                                 (setDark(false));   
                            }
                            else{

                              /*   "exit" === t && */
                                 (setisportal(1));
                            }

                            
                            break;}
                        case "blues":
                        case "anxiety":
                        case "scrutiny":
                            case "otra":
                            "enter" === t && (setDark(true))
                        }
                    }))
            
    /*         scroll.on('scroll', (args) => {
             
                if(typeof args.currentElements['blues'] === 'object') {
                    let progress = args.currentElements['blues'].progress;
                    console.log(progress);
                      setDark(true)
                      // ouput log example: 0.34
                    // gsap example : myGsapAnimation.progress(progress);
                }



             }); */


             
      /*       scroll.on('call', func  => { 
                    switch (func) {
                      case "blues":
                      setDark(true)

                      default:
                        setDark(false)

                    }
             }); */
        }
      },[scroll])

/*     useEffect(() => {
        const observer= new IntersectionObserver((entries)=>{
            entries.forEach(entry=>
                {
                    console.log(entry);
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show')
                    }else{
                        entry.target.classList.remove('show')
                    }
                }
            )
        })
        const hiddenElements=document.querySelectorAll('.hidden');
        hiddenElements.forEach(el=>{observer.observe(el)});

 

        },
      [ ]
    ); */


    return(
        <>
            <section className="a_beautiful_mess_gallery   section unconditional "
                data-scroll-section="true"   data-scroll-section-id="section1"  data-scroll-section-inview   >
                    <div data-scroll="true"  style={{height:'100%'}} data-scroll-repeat="true"
                    data-scroll-id={name} data-scroll-call={name} className='wrapper'>
                        
                        {/*  <div data-scroll="true" className="locomotive-fadeInUp is-inview"></div> */}

                        {/* {numItems!=3?  */}
                            <div  data-scroll="true"  className=" wrapperTitle locomotive-fadeInUp delayp1  ">
                                <h2 className="section-title white-space-nowrap">I chose you, because you are my destiny.</h2>
                            </div>
                        {/* 
                            :""
                     } */}
                            
                            
                            
                            
                        <div className='row'>
                            <div className='left'  style={{order:reverse?"2":""}} data-scroll="true" data-scroll-speed="1">
                                   





                            <Link  to={urlLink1}>
                   
                                <div className='ratio  delayp4 locomotive-revealUp' 
                                
                                
                                style={{order:rowLeftContentReverse?"2":"", "--DeskRowLeftImg1Width":DeskRowLeftImg1Width,"--DeskRowLeftImg1Height":DeskRowLeftImg1Height,
                                "--TabletaRowLeftImg1Width":TabletaRowLeftImg1Width,"--TabletaRowLeftImg1Height":TabletaRowLeftImg1Height,
                                "--TabletaRowLeftImg1Left":TabletaRowLeftImg1Left,  "--DeskRowLeftImg1Right":DeskRowLeftImg1Right,"--TabletaRowLeftImg1Top":TabletaRowLeftImg1Top,
                                "--DeskRowLeftImg1Bottom":DeskRowLeftImg1Bottom,"--CelRowLeftImg1Width":CelRowLeftImg1Width,
                                "--CelRowLeftImg1Height":CelRowLeftImg1Height,"--CelRowLeftImg1Top":CelRowLeftImg1Top,
                                "--CelRowLeftImg1Left":CelRowLeftImg1Left
                                
                                
                                
                      
                                
                                
                                }} data-scroll="true">
                                    {/* <div className='outer-content'>
                                        <div className='inner-content'>
                                        <div className='img-grapper'>
                                    */}
                                    <picture className="">
                                        <source type="image/webp" 
                                            srcSet={imagen1 +" 300w,"+
                                                    imagen1 +" 600w,"+
                                                    imagen1 +" 1200w" }
                                                    sizes="(min-width: 1200px) 1200px, 100vw"/>
                                                    <img width="1200" height="1601" data-main-image="" style={{objectFit: "cover", opacity: "1"}} 
                                                        sizes="(min-width: 1200px) 1200px, 100vw" decoding="async" loading="lazy" 
                                                        src="assets/img/img-1.jpg" 
                                                        srcSet="assets/img/img-1.jpg 300w,
                                                            assets/img/img-1.jpg 600w,
                                                            assets/img/img-1.jpg 1200w" alt="img-unconditional-1"/>
                                    </picture>
                                    {/*
                                        </div>
                                        </div>
                                    </div> */}
                                </div> 

 
                                </Link> 







                                {isRowLeftText?    
                                    <div className='  wrapperTextLeft' style={{order:rowLeftContentReverse?"1":"",
                                    "--CelRowLeftTextLeft":CelRowLeftTextLeft,
                                    "--DesckRowLeftTextLeft":DesckRowLeftTextLeft}} data-scroll  data-scroll-speed="3">
                                        <div data-scroll  className="locomotive-fadeInUp is-inview">
                                            <h2 className="section-title">Blues</h2>
                                        </div> 
                                        <p  data-scroll="true"  className="section-textOriginal locomotive-fadeInUp is-inview ">
                                            <span style={{animationDelay: "0.25s"}}>she accepts them, no matter the</span>
                                            <span style={{animationDelay: "0.4s"}}>judgements.</span>
                                            <span style={{animationDelay: "0.55s"}}>she embraces them, no matter the</span>
                                            <span style={{animationDelay: "0.7s"}}>arguments.</span>
                                            <span style={{animationDelay: "0.85s"}}>she cherishes them, no matter the</span>
                                            <span style={{animationDelay: "1s"}}>distance.</span>
                                            <span style={{animationDelay: "1.15s"}}>the end of her adoration does not</span>
                                            <span style={{animationDelay: "1.3s"}}>exist.</span>
                                            <span style={{animationDelay: "0.65s"}}>her love is pure —</span>
                                            <span style={{animationDelay: "0.75s"}}>it never blames, seeks no motive,</span>
                                            <span style={{animationDelay: "0.9s"}}>and will never fade.</span>
                                        </p> 
                                    </div> 
                                :""}



                                {/* {isRowLeftImg2?<div className='ratio  delayp4 locomotive-revealUp'  data-scroll="true"> 
                                    <picture className="">
                                        <source type="image/webp" 
                                            srcSet={imagen1 +" 300w,"+
                                                    imagen1 +" 600w,"+
                                                    imagen1 +" 1200w" }
                                                    sizes="(min-width: 1200px) 1200px, 100vw"/>
                                                    <img width="1200" height="1601" data-main-image="" style={{objectFit: "cover", opacity: "1"}} 
                                                        sizes="(min-width: 1200px) 1200px, 100vw" decoding="async" loading="lazy" 
                                                        src="assets/img/img-1.jpg" 
                                                        srcSet="assets/img/img-1.jpg 300w,
                                                            assets/img/img-1.jpg 600w,
                                                            assets/img/img-1.jpg 1200w" alt="img-unconditional-1"/>
                                    </picture> 
                                </div> :''} */}

                                </div>
















                                
                                <div className='right' style={{order:reverse?"1":""/*, marginTop:numItems==3?"-7.5rem":"" */}} data-scroll="true" data-scroll-speed="3"
                                >

                                    
                            
                            <Link  to={urlLink2}>
                                    <div className='ratio   imgSmall  locomotive-revealUp' data-scroll

style={{"--DeskRowRightImg1Width": DeskRowRightImg1Width,  
"--DeskRowRightImg1Height":DeskRowRightImg1Height,"--rowRightImg1MR":rowRightImg1MR,
"--DesckRowRightImg1Right":DesckRowRightImg1Right,
"--TabletaRowRightImg1Width":TabletaRowRightImg1Width,"--TabletaRowRightImg1Height":TabletaRowRightImg1Height,
"--TabletaRowRightImg1Top":TabletaRowRightImg1Top, "--TabletaRowRightImg1Left":TabletaRowRightImg1Left,
"--DeskRowRightImg1Left":DeskRowRightImg1Left,"--DeskRowRightImg1Top":DeskRowRightImg1Top,"--TabletaRowRightImg1Bottom":TabletaRowRightImg1Bottom,


"--CelRowRightImg1Width":CelRowRightImg1Width, "--CelRowRightImg1Height":CelRowRightImg1Height,
"--CelRowRightImg1Top":CelRowRightImg1Top, "--CelRowRightImg1Left":CelRowRightImg1Left,"--CelRowRightImg1Bottom":CelRowRightImg1Bottom,
"--CelRowRightImg1Right":CelRowRightImg1Right,  
}}


                                     >
                                        {/* <div className='outer-content'>
                                        
                                        <div className='inner-content'>
                                            <div className='img-grapper'>
                                        */}




                                                <picture>
                                                    <source type="image/webp" srcSet={imagen2 +" 218w,"+
                                                                    imagen2 +" 435w,"+
                                                                    imagen2 +" 870w" }
                                                        sizes="(min-width: 870px) 870px, 100vw"/>
                                                    <img width="870" height="1158" data-main-image="" style={{objectFit: "cover", opacity: "1"}} 
                                                        sizes="(min-width: 870px) 870px, 100vw" decoding="async" loading="lazy" src="assets/img/img-2.jpg" 
                                                        srcSet="assets/img/img-2.jpg 218w,
                                                        assets/img/img-2.jpg 435w,
                                                        assets/img/img-2.jpg 870w" alt="img-unconditional-02"/>
                                                </picture>
                                {/* 
                                        </div>
                                        </div>
                                    </div> */}
                                </div>

                                </Link>














                                {isRowRightText?<div className='section-text locomotive-fadeInUp  ' 
                                style={{"--TabletaRowRightTextTop":TabletaRowRightTextTop, "--TabletaRowRightTextLeft":TabletaRowRightTextLeft}}
                                data-scroll>
                                         <span style={{animationDelay: "0.25s"}}>  I chose you, among all the paths that opened before me</span>
                                         <br></br> 
                                         <span style={{animationDelay: "0.4s"}}>that openend up before me, out of all the souls</span>
                                        
                                         <br></br> 
                                         <span style={{animationDelay: "0.55s"}}> I cold have loved  </span>
                                         <br></br>
                                         <br></br>
                                         <span style={{animationDelay: "0.7s"}}>   </span>
                                         <span style={{animationDelay: "0.85s"}}>I chose you, because your are my destiny.</span>
                                      {/*    <span style={{animationDelay: "1s"}}>distance.</span>
                                         <span style={{animationDelay: "1.15s"}}>the end of her adoration does not</span>
                                         <span style={{animationDelay: "1.3s"}}>exist.</span>
                                    
                                         <span style={{animationDelay: "0.65s"}}>her love is pure —</span>

                                         <span style={{animationDelay: "0.75s"}}>it never blames, seeks no motive,</span>
                                    
                                         <span style={{animationDelay: "0.9s"}}>and will never fade.</span> */}
                                    </div>:""}




                                    <div className='ratio   imgMedium  locomotive-revealUp' data-scroll
                                    style={{ "--DeskRowRightImg2Width": DeskRowRightImg2Width,  
                                    "--DeskRowRightImg2Height":DeskRowRightImg2Height,"--DesckRowRightImg2MR":DesckRowRightImg2MR,
                                "--TabletaRowRightImg2Width":TabletaRowRightImg2Width, 
                                "--TabletaRowRightImg2Height":TabletaRowRightImg2Height,
                                "--TabletaRowRightImg2Top":TabletaRowRightImg2Top,"--TabletaRowRightImg2Bottom":TabletaRowRightImg2Bottom,
                                "--TabletaRowRightImg2Right":TabletaRowRightImg2Right,
"--DeskRowRightImg2Left":DeskRowRightImg2Left,"--DeskRowRightImg2Bottom":DeskRowRightImg2Bottom,
                                "--CelRowRightImg2Width":CelRowRightImg2Width,
                                "--CelRowRightImg2Height":CelRowRightImg2Height,
                                "--CelRowRightImg2Top":CelRowRightImg2Top,
                                "--CelRowRightImg2Right":CelRowRightImg2Right,
                                "--CelRowRightImg2Left":CelRowRightImg2Left,
                                "--CelRowRightImg2Bottom":CelRowRightImg2Bottom,
 
                                
                                }}
                                     >
                                        {/* <div className='outer-content'>
                                        
                                        <div className='inner-content'>
                                            <div className='img-grapper'>
                                        */}




                                                <picture>
                                                    <source type="image/webp" srcSet={imagen2 +" 218w,"+
                                                                    imagen2 +" 435w,"+
                                                                    imagen2 +" 870w" }
                                                        sizes="(min-width: 870px) 870px, 100vw"/>
                                                    <img width="870" height="1158" data-main-image="" style={{objectFit: "cover", opacity: "1"}} 
                                                        sizes="(min-width: 870px) 870px, 100vw" decoding="async" loading="lazy" src="assets/img/img-2.jpg" 
                                                        srcSet="assets/img/img-2.jpg 218w,
                                                        assets/img/img-2.jpg 435w,
                                                        assets/img/img-2.jpg 870w" alt="img-unconditional-02"/>
                                                </picture>
                                {/* 
                                        </div>
                                        </div>
                                    </div> */}
                                </div>
                                </div>
                        </div>
                     
                </div> 
            </section>
        </>
    );
}

export default Gallery;