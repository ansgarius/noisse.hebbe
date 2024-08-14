import React,{useState, useEffect,useContext,useRef} from 'react';
import "./dashboard.css";
import "../a_beautiful_mess/locomotive-scroll.css";
import CarContext  from '../../../context/carContext'; 
/* import Tarjeta from '../../../components/numbers_limited/tarjeta/tarjeta'; */
import {Link} from "react-router-dom";
import MenuV2 from '../../../components/a_beautiful_mess/menuV2/menuV2';
import Tittle from '../../../components/a_beautiful_mess/tittle/tittle';
import Footer from '../../../components/a_beautiful_mess/footer/footer';
import Gallery from '../../../components/a_beautiful_mess/gallery/gallery';
import { LocomotiveScrollProvider ,useLocomotiveScroll } from 'react-locomotive-scroll'
 
const Dashboard = () => {
  const mediaMatchD = window.matchMedia('(min-width: 992px)');
  const mediaMatchT = window.matchMedia('(min-width: 600px ) and (max-width: 991px)');
  const mediaMatchC = window.matchMedia('(max-width: 600px)');

  const [matchesD, setMatchesD] = useState(mediaMatchD.matches);
  const [matchesT, setMatchesT] = useState(mediaMatchT.matches);
  const [matchesC, setMatchesC] = useState(mediaMatchC.matches);
  const {numItem,setNumItem,setCarItems,logged,setLogged,setSubtotal,userData}=useContext(CarContext);
  const containerRef = useRef(null)

  const [isportal, setisportal] = useState(1);
  const [dark,setDark] = useState(false); 
    
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
      TabletaRowRightImg2MR:'0dvw',



      CelRowRightImg2Width:'60.9375dvw',   CelRowRightImg2Height:'91.25vw', CelRowRightImg2Top:"70.34375dvw",
      CelRowRightImg2MR:'initial', CelRowRightImg2Left:'0dvw',

      imagen1:"assets/img/manageUser.jpg", imagen2:"assets/img/pexels-photo-9016325.jpeg",numItems:2,reverse:false, name:'unconditional',


        urlLink1:"/Users",  urlLink2:"/Photos/Create",  urlLink3:""
    
    }])
  



    return ( 
        <> 

          <div className='numbers_limited_dashboard'>

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
          <MenuV2></MenuV2> 
          <Tittle/>
          {/*   <Tarjeta reverse={0} imgBg= "assets/img/faq_01.jpg" texoteffect={1}
              titulo="" layout={true} herohiden={matches?1:0}
              slidernumber=""   subtitulo="Welcome" texto="" pie={true} pie_layout={true} >
            
            
            {logged&& userData.role=='Admin' &&   <div style={{margin: "2.81dvh 0dvw 0 5dvw"}}>
                <div className='wrapper'>      
                  <Link  to={"/Crud/User"}>Manage Users</Link>
                </div>
              </div>}


             {logged&& userData.role=='Admin'&&  <div style={{margin: "2.81dvh 0dvw 0 5dvw"}}>
                <div className='wrapper'>      
                  <Link  to={"/Topics"}>Manage Topics</Link>
                </div>
              </div>}


              <div style={{margin: "2.81dvh 0dvw 0 5dvw"}}>
                <div className='wrapper'>      
                  <Link  to={"/Posts"}>Manage Posts</Link>

                </div>
              </div>


              <div style={{margin: "2.81dvh 0dvw 0 5dvw"}}>
                <div className='wrapper'>      
                  <Link  to={"/Posts/Create"}>Add Posts</Link>

                </div>
              </div>

              <div style={{margin: "2.81dvh 0dvw 0 5dvw"}}>
                <div className='wrapper'>      
                  <Link  to={"/DiscountCoupons"}>Manage Discount Coupons</Link>

                </div>
              </div>


              
            </Tarjeta> */}

{tarjetas.map((el,index)=> 
              <Gallery isRowLeftImg2={tarjetas[index].isRowLeftImg2}  isRowLeftText={tarjetas[index].isRowLeftText}
              rowLeftContentReverse={tarjetas[index].rowLeftContentReverse}  isRowRightText={tarjetas[index].isRowRightText}
               setisportal={setisportal}
              TabletaRowRightTextTop={tarjetas[index].TabletaRowRightTextTop}
              TabletaRowRightTextLeft={tarjetas[index].TabletaRowRightTextLeft}
 

              DeskRowRightImg1Width={tarjetas[index].DeskRowRightImg1Width}    DeskRowRightImg1Height={tarjetas[index].DeskRowRightImg1Height}
              TabletaRowRightImg1Width={tarjetas[index].TabletaRowRightImg1Width}    TabletaRowRightImg1Height={tarjetas[index].TabletaRowRightImg1Height}
              
              TabletaRowRightImg1Top={tarjetas[index].TabletaRowRightImg1Top} 
              TabletaRowRightImg1Left={tarjetas[index].TabletaRowRightImg1Left} 





              CelRowRightImg1Width={tarjetas[index].CelRowRightImg1Width} 
              CelRowRightImg1Height={tarjetas[index].CelRowRightImg1Height} 
              CelRowRightImg1Top={tarjetas[index].CelRowRightImg1Top} 
              CelRowRightImg1Left={tarjetas[index].CelRowRightImg1Left} 
              CelRowRightImg1Right={tarjetas[index].CelRowRightImg1Right} 

               



              DesckRowLeftTextLeft={tarjetas[index].DesckRowLeftTextLeft}




 
              DeskRowRightImg2Width={tarjetas[index].DeskRowRightImg2Width}    DeskRowRightImg2Height={tarjetas[index].DeskRowRightImg2Height}
              TabletaRowRightImg2Width={tarjetas[index].TabletaRowRightImg2Width}    TabletaRowRightImg2Height={tarjetas[index].TabletaRowRightImg2Height}
              TabletaRowRightImg2Top={tarjetas[index].TabletaRowRightImg2Top}
               
              CelRowLeftTextLeft={tarjetas[index].CelRowLeftTextLeft}
              
              
              DeskRowLeftImg1Width={tarjetas[index].DeskRowLeftImg1Width}    DeskRowLeftImg1Height={tarjetas[index].DeskRowLeftImg1Height}

              TabletaRowLeftImg1Width={tarjetas[index].TabletaRowLeftImg1Width}    TabletaRowLeftImg1Height={tarjetas[index].TabletaRowLeftImg1Height}
              TabletaRowLeftImg1Left={tarjetas[index].TabletaRowLeftImg1Left}
              CelRowLeftImg1Width={tarjetas[index].CelRowLeftImg1Width}
              CelRowLeftImg1Height={tarjetas[index].CelRowLeftImg1Height}
              CelRowLeftImg1Left={tarjetas[index].CelRowLeftImg1Left}

               

              CelRowRightImg2Width={tarjetas[index].CelRowRightImg2Width}
              CelRowRightImg2Height={tarjetas[index].CelRowRightImg2Height}
              CelRowRightImg2Top={tarjetas[index].CelRowRightImg2Top}
              CelRowRightImg2MR={tarjetas[index].CelRowRightImg2MR}
              CelRowRightImg2Left={tarjetas[index].CelRowRightImg2Left}
 


              DesckRowRightImg1Right={tarjetas[index].DesckRowRightImg1Right}

              rowRightImg1MR={tarjetas[index].rowRightImg1MR}  DesckRowRightImg2MR={tarjetas[index].DesckRowRightImg2MR}
              TabletaRowRightImg2MR={tarjetas[index].TabletaRowRightImg2MR} 

              urlLink1={tarjetas[index].urlLink1} urlLink2={tarjetas[index].urlLink2}
               imagen1={tarjetas[index].imagen1} imagen2={tarjetas[index].imagen2} numItems={tarjetas[index].numItems}
              reverse={tarjetas[index].reverse} name={tarjetas[index].name} setDark={setDark} key={index}></Gallery>
            )}
            <Footer></Footer>
           </div>
           </LocomotiveScrollProvider>
          </div>
        </>
    );
};
export default Dashboard;