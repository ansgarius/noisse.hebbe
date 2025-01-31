import React, {useRef,useEffect,useState} from 'react';
 
import "./a_beautiful_mess.css";
import "./locomotive-scroll.css";
import Gallery from '../../../components/a_beautiful_mess/gallery/gallery';
import Pasarela from '../../../components/a_beautiful_mess/pasarela/pasarela';
import Cursor from '../../../components/a_beautiful_mess/cursor/cursor';
import ControlAudio from '../../../components/a_beautiful_mess/controlAudio/controlAudio';
import { LocomotiveScrollProvider ,useLocomotiveScroll } from 'react-locomotive-scroll'
import Tittle from '../../../components/a_beautiful_mess/tittle/tittle';
import Main from '../../../components/a_beautiful_mess/main/main';
import Footer from '../../../components/a_beautiful_mess/footer/footer';
import { gsap } from "gsap";
import MenuV2 from '../../../components/a_beautiful_mess/menuV2/menuV2';
import Menus from '../../../components/a_beautiful_mess/menus/menus';
import Menu from '../../../components/a_beautiful_mess/menu/menu';
import CookieBanner from '../../../components/a_beautiful_mess/cookieBanner/cookieBanner';
/* 
import Rack from "../components/rack/Rack";
import CursorFollowerCircle from "../components/CursorFollowerCircle/CursorFollowerCircle";
import Background from "../components/enifBackground/Background";
import EnidNav from "../components/nav/EnidNav"; */

const ABeautifulMess=()=>{

  const mediaMatchD = window.matchMedia('(min-width: 992px)');
  const mediaMatchT = window.matchMedia('(min-width: 600px ) and (max-width: 991px)');
  const mediaMatchC = window.matchMedia('(max-width: 600px)');

  const [matchesD, setMatchesD] = useState(mediaMatchD.matches);
  const [matchesT, setMatchesT] = useState(mediaMatchT.matches);
  const [matchesC, setMatchesC] = useState(mediaMatchC.matches);
    
  useEffect(() => {
    const handler = e => setMatchesD(e.matches);
    mediaMatchD.addListener(handler);
    return () => mediaMatchD.removeListener(handler);
  },[matchesD]);

  useEffect(() => {
    const handler = e => setMatchesT(e.matches);
    mediaMatchT.addListener(handler);
    //console.log(matchesD,matchesT,matchesC);
    return () => mediaMatchT.removeListener(handler);
  },[matchesT]);

  useEffect(() => {
    const handler = e => setMatchesC(e.matches);
    mediaMatchC.addListener(handler);
    return () => mediaMatchC.removeListener(handler);
  },[matchesC]);







    
  const containerRef = useRef(null)
  const compPasarela = useRef()
  const compHero = useRef()

  const [isActiveMenu, setActiveMenu] = useState(false);
  const [musicinit,setmusicinitial] = useState(0); 
  const [dark,setDark] = useState(false); 
  const [t1] = useState(gsap.timeline({defaults:{}}));


  const [isportal, setisportal] = useState(1);



  const [tarjetas,settarjetas]=useState([




    {  CelRowLeftTextLeft:"10dvw",  DesckRowLeftTextLeft:'0dvw',
      isRowLeftText:matchesC?true:false, isRowLeftImg2:false,  rowLeftContentReverse:matchesC?true:false,  
      DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
      TabletaRowLeftImg1Width:'initial',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'0dvw',
      CelRowLeftImg1Width:'initial',   CelRowLeftImg1Height:'52.39583333333333dvw', CelRowLeftImg1Left:'0dvw',
      
      isRowRightText:!matchesC?true:false,   TabletaRowRightTextTop:"0dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
      DeskRowRightImg1Width:'27.76041666666667dvw',   DeskRowRightImg1Height:'27.76041666666667dvw', rowRightImg1MR:'14.79166666666667dvw', DesckRowRightImg1Right:'0dvw',
      TabletaRowRightImg1Width:'43.54838709677419dvw',   TabletaRowRightImg1Height:'65.7258064516129dvw', TabletaRowRightImg1Top:"13.44086021505376dvw",
      TabletaRowRightImg1Left:"6.451612903225806dvw",


      CelRowRightImg1Width:'60.9375dvw',   CelRowRightImg1Height:'60.9375dvw', CelRowRightImg1Top:"0dvw",
      CelRowRightImg1Left:"initial", CelRowRightImg1Right:"0dvw",


      DesckRowRightImg2MR:'0dvw',   DeskRowRightImg2Width:'42.5dvw',   DeskRowRightImg2Height:'24.0625dvw',
      TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'39.24731182795699dvw', TabletaRowRightImg2Top:"26.88172043010753dvw",
      TabletaRowRightImg2Right:'0dvw',



      CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
      CelRowRightImg2Right:'initial', CelRowRightImg2Left:'0dvw',

      imagen1:"assets/img/img-1.webp", imagen2:"assets/img/img-2.webp",numItems:2,reverse:false, name:'unconditional'
    
    },
    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'0dvw',
      isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
       isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"30dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
       DesckRowRightImg2MR:'10.79166666666667dvw',  TabletaRowRightImg2Right:'5dvw',
      
      DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
      TabletaRowLeftImg1Width:'52.39583333333333dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'27.1505376344086dvw',
      CelRowLeftImg1Width:'80dvw',   CelRowLeftImg1Height:'80dvw', CelRowLeftImg1Left:'10dvw',


      DeskRowRightImg1Width:'42.5dvw',   DeskRowRightImg1Height:'24.0625dvw', rowRightImg1MR:'2.79166666666667dvw',  DesckRowRightImg1Right:'0dvw',
      TabletaRowRightImg1Width:'27.76041666666667dvw',   TabletaRowRightImg1Height:'27.76041666666667dvw', 
      TabletaRowRightImg1Top:"0dvw", TabletaRowRightImg1Left:"6.451612903225806dvw",


      CelRowRightImg1Width:'40dvw',   CelRowRightImg1Height:'40dvw', CelRowRightImg1Top:"0dvw",
      CelRowRightImg1Left:"10dvw", CelRowRightImg1Right:"initial",

      DeskRowRightImg2Width:'27.76041666666667dvw',   DeskRowRightImg2Height:'27.76041666666667dvw',
      TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'43.54838709677419dvw', TabletaRowRightImg2Top:"13dvw",
      


      CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
      CelRowRightImg2Right:'10dvw', CelRowRightImg2Left:'initial',


      imagen1:"assets/img/img-3.webp", imagen2:"assets/img/img-4.webp",numItems:3,reverse:matchesD?true:false, name:'blues'
    },

    {  CelRowLeftTextLeft:"0dvw", DesckRowLeftTextLeft:'0dvw',
      isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:matchesC?true:false,  
      isRowRightText:matchesT?true:false, TabletaRowRightTextTop:"0dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
       DesckRowRightImg2MR:'0dvw', TabletaRowRightImg2Right:'30dvw',
      
      DeskRowLeftImg1Width:'27.76041666666667dvw',   DeskRowLeftImg1Height:'27.76041666666667dvw',
      TabletaRowLeftImg1Width:'52.39583333333333dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw',  TabletaRowLeftImg1Left:'6.451612903225806dvw',
      CelRowLeftImg1Width:'90dvw',   CelRowLeftImg1Height:'50.70422535211268dvh', CelRowLeftImg1Left:'0dvw',


      DeskRowRightImg1Width:'27.76041666666667dvw',   DeskRowRightImg1Height:'42.5dvw', rowRightImg1MR:'0dvw', DesckRowRightImg1Right:'0dvw',
      TabletaRowRightImg1Width:'55.7258064516129dvw',   TabletaRowRightImg1Height:'33.54838709677419dvw',
       TabletaRowRightImg1Top:"20dvw", TabletaRowRightImg1Left:"40.451612903225806dvw",


       CelRowRightImg1Width:'100dvw',   CelRowRightImg1Height:'50.9375dvw', CelRowRightImg1Top:"0dvw",
       CelRowRightImg1Left:"initial", CelRowRightImg1Right:"initial",

      DeskRowRightImg2Width:'42.5dvw',   DeskRowRightImg2Height:'24.0625dvw',
      TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'39.24731182795699dvw', TabletaRowRightImg2Top:"60dvw",



      CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
      CelRowRightImg2Right:'initial', CelRowRightImg2Left:'0dvw',


      imagen1:"assets/img/img-5.webp", imagen2:"assets/img/img-6.webp",numItems:3,reverse:false, name:'embrace'
    },
    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'10dvw',
      isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
       isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"15dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
       DesckRowRightImg2MR:'10.79166666666667dvw',  TabletaRowRightImg2Right:'5dvw',
      
      DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
      TabletaRowLeftImg1Width:'80dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'10dvw',
      CelRowLeftImg1Width:'100dvw',   CelRowLeftImg1Height:'80dvw', CelRowLeftImg1Left:'0dvw',


      DeskRowRightImg1Width:'60dvw',   DeskRowRightImg1Height:'24.0625dvw', rowRightImg1MR:'2.79166666666667dvw', DesckRowRightImg1Right:'initial',
      TabletaRowRightImg1Width:'65dvw',   TabletaRowRightImg1Height:'65dvw', 
      TabletaRowRightImg1Top:"45dvw", TabletaRowRightImg1Left:"20dvw",


      CelRowRightImg1Width:'50dvw',   CelRowRightImg1Height:'50dvw', CelRowRightImg1Top:"0dvw",
      CelRowRightImg1Left:"initial", CelRowRightImg1Right:"0dvw",

      DeskRowRightImg2Width:'37.76041666666667dvw',   DeskRowRightImg2Height:'27.76041666666667dvw',
      TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'39.24731182795699dvw', TabletaRowRightImg2Top:"0dvw",
      


      CelRowRightImg2Width:'75.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
      CelRowRightImg2Right:'10dvw', CelRowRightImg2Left:'initial',


      imagen1:"assets/img/img-7.webp", imagen2:"assets/img/img-8.webp",numItems:3,reverse:matchesD?true:false, name:'anxiety'
    },

    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'10dvw',
    isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
     isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"15dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
     DesckRowRightImg2MR:'10.79166666666667dvw',  TabletaRowRightImg2Right:'15dvw',
    
    DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
    TabletaRowLeftImg1Width:'80dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'10dvw',
    CelRowLeftImg1Width:'100dvw',   CelRowLeftImg1Height:'80dvw', CelRowLeftImg1Left:'0dvw',


    DeskRowRightImg1Width:'60dvw',   DeskRowRightImg1Height:'24.0625dvw', rowRightImg1MR:'2.79166666666667dvw', DesckRowRightImg1Right:'initial',
    TabletaRowRightImg1Width:'40dvw',   TabletaRowRightImg1Height:'40dvw', 
    TabletaRowRightImg1Top:"55dvw", TabletaRowRightImg1Left:"50dvw",


    CelRowRightImg1Width:'70dvw',   CelRowRightImg1Height:'50dvw', CelRowRightImg1Top:"0dvw",
    CelRowRightImg1Left:"0dvw", CelRowRightImg1Right:"initial",

    DeskRowRightImg2Width:'30dvw',   DeskRowRightImg2Height:'27.76041666666667dvw',
    TabletaRowRightImg2Width:'80dvw',   TabletaRowRightImg2Height:'52.39583333333333dvw', TabletaRowRightImg2Top:"0dvw",
    


    CelRowRightImg2Width:'70dvw',   CelRowRightImg2Height:'50vw', CelRowRightImg2Top:"70.34375dvw",
    CelRowRightImg2Right:'0dvw', CelRowRightImg2Left:'initial',


    imagen1:"assets/img/img-7.webp", imagen2:"assets/img/img-8.webp",numItems:3,reverse:matchesD?true:false, name:'bliss'
    },
    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'0dvw',
    isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
     isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"30dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
     DesckRowRightImg2MR:'5dvw',  TabletaRowRightImg2Right:'5dvw',
    
    DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
    TabletaRowLeftImg1Width:'52.39583333333333dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'5dvw',
    CelRowLeftImg1Width:'50dvw',   CelRowLeftImg1Height:'80dvw', CelRowLeftImg1Left:'10dvw',


    DeskRowRightImg1Width:'27.76041666666667dvw',   DeskRowRightImg1Height:'27.76041666666667dvw',
     rowRightImg1MR:'0dvw',  DesckRowRightImg1Right:'10dvw',
    TabletaRowRightImg1Width:'60dvw',   TabletaRowRightImg1Height:'27.76041666666667dvw', 
    TabletaRowRightImg1Top:"0dvw", TabletaRowRightImg1Left:"6.451612903225806dvw",


    CelRowRightImg1Width:'80dvw',   CelRowRightImg1Height:'40dvw', CelRowRightImg1Top:"0dvw",
    CelRowRightImg1Left:"10dvw", CelRowRightImg1Right:"initial",

    DeskRowRightImg2Width:'42.5dvw',   DeskRowRightImg2Height:'60vw',
    TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'43.54838709677419dvw', TabletaRowRightImg2Top:"33dvw",
    


    CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
    CelRowRightImg2Right:'0dvw', CelRowRightImg2Left:'initial',


    imagen1:"assets/img/img-3.webp", imagen2:"assets/img/img-4.webp",numItems:3,reverse:matchesD?true:false, name:'scrutiny'
    },
    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'0dvw',
    isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
     isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"0dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
     DesckRowRightImg2MR:'5dvw',  TabletaRowRightImg2Right:'5dvw',
    
    DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'20dvw',
    TabletaRowLeftImg1Width:'60dvw',   TabletaRowLeftImg1Height:'30dvw', TabletaRowLeftImg1Left:'27.1505376344086dvw',
    CelRowLeftImg1Width:'50dvw',   CelRowLeftImg1Height:'60dvw', CelRowLeftImg1Left:'50dvw',


    DeskRowRightImg1Width:'30.0625dvw',   DeskRowRightImg1Height:'42.5dvw', rowRightImg1MR:'10dvw',  DesckRowRightImg1Right:'0dvw',
    TabletaRowRightImg1Width:'60dvw',   TabletaRowRightImg1Height:'27.76041666666667dvw', 
    TabletaRowRightImg1Top:"50dvw", TabletaRowRightImg1Left:"6.451612903225806dvw",


    CelRowRightImg1Width:'80dvw',   CelRowRightImg1Height:'40dvw', CelRowRightImg1Top:"0dvw",
    CelRowRightImg1Left:"10dvw", CelRowRightImg1Right:"initial",

    DeskRowRightImg2Width:'45dvw',   DeskRowRightImg2Height:'27.76041666666667dvw',
    TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'43.54838709677419dvw', TabletaRowRightImg2Top:"0dvw",
    


    CelRowRightImg2Width:'90dvw',   CelRowRightImg2Height:'60vw', CelRowRightImg2Top:"70.34375dvw",
    CelRowRightImg2Right:'initial', CelRowRightImg2Left:'0dvw',


    imagen1:"assets/img/img-3.webp", imagen2:"assets/img/img-4.webp",numItems:3,reverse:matchesT?true:false, name:'graces'
    },

    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'0dvw',
    isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
     isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"30dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
     DesckRowRightImg2MR:'0dvw',  TabletaRowRightImg2Right:'5dvw',
    
    DeskRowLeftImg1Width:'initial',   DeskRowLeftImg1Height:'52.39583333333333dvw',
    TabletaRowLeftImg1Width:'52.39583333333333dvw',   TabletaRowLeftImg1Height:'52.39583333333333dvw', TabletaRowLeftImg1Left:'0dvw',
    CelRowLeftImg1Width:'50dvw',   CelRowLeftImg1Height:'80dvw', CelRowLeftImg1Left:'10dvw',


    DeskRowRightImg1Width:'27.76041666666667dvw',   DeskRowRightImg1Height:'27.76041666666667dvw',
     rowRightImg1MR:'0dvw',  DesckRowRightImg1Right:'10dvw',
    TabletaRowRightImg1Width:'60dvw',   TabletaRowRightImg1Height:'27.76041666666667dvw', 
    TabletaRowRightImg1Top:"0dvw", TabletaRowRightImg1Left:"6.451612903225806dvw",


    CelRowRightImg1Width:'80dvw',   CelRowRightImg1Height:'40dvw', CelRowRightImg1Top:"0dvw",
    CelRowRightImg1Left:"10dvw", CelRowRightImg1Right:"initial",

    DeskRowRightImg2Width:'50dvw',   DeskRowRightImg2Height:'50vw',
    TabletaRowRightImg2Width:'39.24731182795699dvw',   TabletaRowRightImg2Height:'43.54838709677419dvw', TabletaRowRightImg2Top:"33dvw",
    


    CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
    CelRowRightImg2Right:'0dvw', CelRowRightImg2Left:'initial',


    imagen1:"assets/img/img-3.webp", imagen2:"assets/img/img-4.webp",numItems:3,reverse:matchesD?true:false, name:'otra'
    },















    {  CelRowLeftTextLeft:"10dvw", DesckRowLeftTextLeft:'0dvw',
      isRowLeftImg2:true,  isRowLeftText:!matchesT?true:false,  rowLeftContentReverse:true, 
       isRowRightText:matchesT?true:false,  TabletaRowRightTextTop:"30dvw",  TabletaRowRightTextLeft:"6.451612903225806dvw",
       DesckRowRightImg2MR:'0dvw',  
      
   /*d ===>> */   DeskRowLeftImg1Width:'24.42708333333333dvw',   DeskRowLeftImg1Height:'27.91666666666667dvw',
   /*d =======>> */ DeskRowLeftImg1Right:"14.0625dvw", DeskRowLeftImg1Bottom:"17.70833333333333dvw",
    /* t.leftImg1  ======>> */   TabletaRowLeftImg1Width:'82.79569892473118dvw',   TabletaRowLeftImg1Height:'46.63978494623656dvw',
    /* t.leftImg1  ======>> */ TabletaRowLeftImg1Left:'9.139784946236559dvw',TabletaRowLeftImg1Top:"27.68817204301075dvw",
     
    
  /* c.leftImg1  ======>> */  CelRowLeftImg1Width:'94.375dvw',   CelRowLeftImg1Height:'53.125dvw', CelRowLeftImg1Left:'2.8125dvw',
    /* c.leftImg1  ======>> */  CelRowLeftImg1Top:'75.625dvw',
  
     /*d ===>> */ DeskRowRightImg1Width:'52.08333333333333dvw', DeskRowRightImg1Height:'29.27083333333333dvw',
     /*d ====>>> */DeskRowRightImg1Left:"14.0625dvw",DeskRowRightImg1Top:"18.80208333333333dvw",

     /*d ====>>> */DeskRowRightImg2Width:'31.77083333333333dvw',   DeskRowRightImg2Height:'31.77083333333333vw',
 /*d ====>>> */DeskRowRightImg2Left:"14.0625dvw", DeskRowRightImg2Bottom:"14.16666666666667dvw",


       rowRightImg1MR:'0dvw',  DesckRowRightImg1Right:'10dvw',
 /* t.rightImg1  ======>> */   TabletaRowRightImg1Width:'45.16129032258065dvw',   TabletaRowRightImg1Height:'45.16129032258065dvw', 
   /* t.rightImg1  ======>> */   TabletaRowRightImg1Top:"initial", TabletaRowRightImg1Left:"5.10752688172043dvw",TabletaRowRightImg1Bottom:"58.06451612903226dvw",
  
  
   /* c.rightImg1  ======>> */    CelRowRightImg1Width:'67.5dvw',   CelRowRightImg1Height:'67.5dvw', CelRowRightImg1Top:"initial",
    /* c.rightImg1  ======>> */   CelRowRightImg1Left:"16.25dvw", CelRowRightImg1Right:"16.25dvw",CelRowRightImg1Bottom:"128.75dvw",
  
   /*t.rightImg2  ==> */  TabletaRowRightImg2Width:'38.03763440860215dvw',   TabletaRowRightImg2Height:'47.58064516129032dvw', 
    /*t.rightImg2  ==> */  TabletaRowRightImg2Top:"initial",TabletaRowRightImg2Bottom:"15.99462365591398dvw",TabletaRowRightImg2Right:'4.56989247311828dvw',
      
  
  
   /*c.rightImg2  ==> */   CelRowRightImg2Width:'67.1875dvw',   CelRowRightImg2Height:'84.0625dvw', CelRowRightImg2Top:"initial",
   /*c.rightImg2  ==> */   CelRowRightImg2Right:'initial', CelRowRightImg2Left:'16.40625dvw',CelRowRightImg2Bottom:"27.8125DVW",
  
  
      imagen1:"assets/img/img-3.webp", imagen2:"assets/img/img-4.webp",numItems:3,reverse:matchesD?true:false, name:'otra'
      },

  ]);

useEffect(() => {
  t1.to(compPasarela.current, { 
    opacity: 0,
    display:'none',
    duration:2 ,  
    delay:8, 
       }).to(compHero.current, { 
        opacity: 1, 
        duration:2 ,  
        scale:1
           },"-=8")

    /*  let scrollTimer = null;
  const wheel=(e)=> {
    e.preventDefault();
  +
    window.clearInterval(scrollTimer);
    scrollTimer = window.setTimeout(()=> {
      setX(item=>item+e.deltaY);
      if (e.deltaY < 0) {
          console.log(e.deltaY,"ariba");
      }
      else{
         console.log(e.deltaY);
      }     
    }, 600);
  
  }

  window.addEventListener('wheel', wheel, { passive: false });

  return () => { 
    window.removeEventListener('wheel', wheel);
  }; */

},
[ ]
);

    return(<> 
      <div className='a_beautiful_mess '>
        <Pasarela  data-scroll ref={compPasarela}></Pasarela>
        <LocomotiveScrollProvider
          options={{
            smooth: true, // ... all available Locomotive Scroll instance options 
            smartphone: {
              smooth: true
            },
            tablet: {
              smooth: true
            }
          }}
          watch={
            [
                //..all the dependencies you want to watch to update the scroll.
                //  Basicaly, you would want to watch page/location changes
                //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <div    className={` ${ dark? 'body-black' : 'body-white'}`}   data-scroll-container ref={containerRef}>
           

            <Cursor  ></Cursor>
            <MenuV2 isportal={isportal}  setisportal={setisportal}></MenuV2>
            
            {/* <Menu  isActive={isActiveMenu} setActive={ setActiveMenu}></Menu>
            <Menus isActiveMenu={isActiveMenu}></Menus> */}
            <ControlAudio musicinit={musicinit} isportal={isportal}></ControlAudio>
            <CookieBanner termsPage={'/Photos/Create'}/>
            <Tittle isportal={isportal}></Tittle>
            <Main  ref={compHero}  musicinit={musicinit} setmusicinitial={setmusicinitial}  ></Main>
            {tarjetas.map((el,index)=> 
              <Gallery isRowLeftImg2={tarjetas[index].isRowLeftImg2}  isRowLeftText={tarjetas[index].isRowLeftText}
              rowLeftContentReverse={tarjetas[index].rowLeftContentReverse}  isRowRightText={tarjetas[index].isRowRightText}
               setisportal={setisportal}
              TabletaRowRightTextTop={tarjetas[index].TabletaRowRightTextTop}
              TabletaRowRightTextLeft={tarjetas[index].TabletaRowRightTextLeft}
 

              DeskRowRightImg1Width={tarjetas[index].DeskRowRightImg1Width}    DeskRowRightImg1Height={tarjetas[index].DeskRowRightImg1Height}
              TabletaRowRightImg1Width={tarjetas[index].TabletaRowRightImg1Width}    TabletaRowRightImg1Height={tarjetas[index].TabletaRowRightImg1Height}
              
              TabletaRowRightImg1Top={tarjetas[index].TabletaRowRightImg1Top}  TabletaRowRightImg1Bottom={tarjetas[index].TabletaRowRightImg1Bottom}
              TabletaRowRightImg1Left={tarjetas[index].TabletaRowRightImg1Left} 

              DeskRowRightImg1Left={tarjetas[index].DeskRowRightImg1Left}
              DeskRowRightImg1Top={tarjetas[index].DeskRowRightImg1Top}
              DeskRowRightImg2Left={tarjetas[index].DeskRowRightImg2Left}
              DeskRowRightImg2Bottom={tarjetas[index].DeskRowRightImg2Bottom}


              CelRowRightImg1Width={tarjetas[index].CelRowRightImg1Width} 
              CelRowRightImg1Height={tarjetas[index].CelRowRightImg1Height} 
              CelRowRightImg1Top={tarjetas[index].CelRowRightImg1Top} 
              CelRowRightImg1Bottom={tarjetas[index].CelRowRightImg1Bottom}
              CelRowRightImg1Left={tarjetas[index].CelRowRightImg1Left} 
              CelRowRightImg1Right={tarjetas[index].CelRowRightImg1Right} 

               



              DesckRowLeftTextLeft={tarjetas[index].DesckRowLeftTextLeft}




 
              DeskRowRightImg2Width={tarjetas[index].DeskRowRightImg2Width}    DeskRowRightImg2Height={tarjetas[index].DeskRowRightImg2Height}
              TabletaRowRightImg2Width={tarjetas[index].TabletaRowRightImg2Width}    TabletaRowRightImg2Height={tarjetas[index].TabletaRowRightImg2Height}
              TabletaRowRightImg2Top={tarjetas[index].TabletaRowRightImg2Top} TabletaRowRightImg2Bottom={tarjetas[index].TabletaRowRightImg2Bottom}
               
              CelRowLeftTextLeft={tarjetas[index].CelRowLeftTextLeft}
              
              DeskRowLeftImg1Right={tarjetas[index].DeskRowLeftImg1Right} DeskRowLeftImg1Bottom={tarjetas[index].DeskRowLeftImg1Bottom}
              DeskRowLeftImg1Width={tarjetas[index].DeskRowLeftImg1Width}    DeskRowLeftImg1Height={tarjetas[index].DeskRowLeftImg1Height}

              TabletaRowLeftImg1Width={tarjetas[index].TabletaRowLeftImg1Width}    TabletaRowLeftImg1Height={tarjetas[index].TabletaRowLeftImg1Height}
              TabletaRowLeftImg1Left={tarjetas[index].TabletaRowLeftImg1Left} TabletaRowLeftImg1Top={tarjetas[index].TabletaRowLeftImg1Top}
              CelRowLeftImg1Width={tarjetas[index].CelRowLeftImg1Width} CelRowLeftImg1Top={tarjetas[index].CelRowLeftImg1Top}
              CelRowLeftImg1Height={tarjetas[index].CelRowLeftImg1Height}
              CelRowLeftImg1Left={tarjetas[index].CelRowLeftImg1Left}

               

              CelRowRightImg2Width={tarjetas[index].CelRowRightImg2Width}
              CelRowRightImg2Height={tarjetas[index].CelRowRightImg2Height}
              CelRowRightImg2Top={tarjetas[index].CelRowRightImg2Top}
              CelRowRightImg2Right={tarjetas[index].CelRowRightImg2Right}
              CelRowRightImg2Left={tarjetas[index].CelRowRightImg2Left}
              CelRowRightImg2Bottom={tarjetas[index].CelRowRightImg2Bottom}


              DesckRowRightImg1Right={tarjetas[index].DesckRowRightImg1Right}

              rowRightImg1MR={tarjetas[index].rowRightImg1MR}  DesckRowRightImg2MR={tarjetas[index].DesckRowRightImg2MR}
              TabletaRowRightImg2Right={tarjetas[index].TabletaRowRightImg2Right} 

 
               imagen1={tarjetas[index].imagen1} imagen2={tarjetas[index].imagen2} numItems={tarjetas[index].numItems}
              reverse={tarjetas[index].reverse} name={tarjetas[index].name} setDark={setDark} key={index}></Gallery>
            )}
        
            <Footer></Footer>             
            {/*  <LocomotiveScroll  data-scroll-section="true"   data-scroll-section-id="section2"  data-scroll-section-inview ></LocomotiveScroll> */}
          </div>
        </LocomotiveScrollProvider>
      </div>
    </>);
}

export default ABeautifulMess;