import React, { useEffect,useState } from "react";
import './photoGalery.css';
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {helpHttp} from '../../../helpers/helpHttp'; 
import {useParams} from 'react-router-dom';

const PhotoGalery=()=>{
    const {id} = useParams();
    gsap.registerPlugin(ScrollTrigger);
    let host = window.location.protocol + "//" + window.location.hostname;
    let urlregistro = host + "/hebbe_backend/public/api/Project";
    const headers= {
      Authorization: 'Bearer ' + localStorage.getItem('token')  
    }
    const [cargando,setCargando] = useState(false);
    const [fotos, setFotos] = useState(null);
    const [Clientes,setClientes] = useState([]);
    let api = helpHttp();  
    const [form, setForm] = useState({});

    const update = (registro) => {  
      setCargando(true)
      api.get(urlregistro +'/'+ id ,{ headers})
      .then((res) => {
        console.log(res);
        setCargando(false)
        if (!res.err) {
          setForm({"date":res.date,"id":res.id})
          setClientes(res.clientes.map((e)=>{return {"id_client":e.id,"id":e.id}}))
          setFotos(res.photos)
        } 
        else {
          errorHandle(res.status,res.error_text)
        }
      }); 
    }
  
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

    useEffect(()=>{
      if (fotos) {

        gsap.to('.foto1',
          {
            xPercent: 100  ,
            ease: "none",
            duration:2,
            scrollTrigger:{
              trigger: ".container",
              //  snap: 1 / (sections.length - 1),  
              markers:true,//muestra marca
              start:'top top',// pone start marca 
              end: () => "+=" + document.querySelector(".container").offsetWidth, //pone end marca
              scrub: 3,//liga al srcoll la animacion
             
             
           //   pin:true,//clava elemento,
              onUpdate: (self) => console.log("progress:", self.progress),
            }
          }
        )
      /*   let sections = gsap.utils.toArray(".panel");
        const t1=gsap.timeline({
          scrollTrigger:{
            trigger: ".container",
            //  snap: 1 / (sections.length - 1),  
            markers:true,//muestra marca
            start:'top top',// pone start marca 
            end: () => "+=" + document.querySelector(".container").offsetWidth, //pone end marca
            scrub: 3,//liga al srcoll la animacion
           
           
            pin:true,//clava elemento,
            onUpdate: (self) => console.log("progress:", self.progress),
          }
        })



        t1.to('.foto2',
          {
            duration:2,
            xPercent:100,
          //  repeat:-1,
            ease:'none' 
          },'-=2'
        ).totalProgress(1)

        t1.to('.foto3',
          {
            duration:2,
            x:300, 
          },'-=2'
        ).totalProgress(2)


        const goscroll=()=>{
         // console.log(t1.scroll());
        }

        document.querySelector('.progressBar').addEventListener('click',goscroll)

 */


        
gsap.from(".progressBar",{
  scrollTrigger:{
    markers:true,
    trigger: ".container",
    //  snap: 1 / (sections.length - 1),  
    start:'top top',// pone start marca 
    end: () => "+=" + document.querySelector(".container").offsetWidth, //pone end marca
    scrub: true,//liga al srcoll la animacion
    pin:true//clava elemento
  },
 
  scaleX:0,
  transformOrigin:"left center",
  ease:"none"
} )


      /*   let sections = gsap.utils.toArray(".panel");

console.log(sections);

ScrollTrigger.defaults({markers: {startColor: "blue", endColor: "red"}});
gsap.set(".foto1", {y: 100});
gsap.set(".foto2", {y:-100});
        let scrollTween = gsap.to(".foto1", {
               xPercent: -100  ,
               ease: "none", // <-- IMPORTANT!
               scrollTrigger: {
                 trigger: ".container",
                 pin: true,
                 scrub: 0.1,
                 //snap: directionalSnap(1 / (sections.length - 1)),
              //   end: "+=3000"
               }
             });
               gsap.to(".foto2", {
              xPercent: -100 ,
              ease: "none", // <-- IMPORTANT!
              scrollTrigger: {
                trigger: ".container",
               // pin: true,
                scrub: 0.1,
                //snap: directionalSnap(1 / (sections.length - 1)),
              //  end: "+=3000"
              }
            }); */
   /* 
   ********************************************************************************************
   ********************************************************************************************
   ********************************************************************************************
   ********************************************************************************************
   ******************************************************************************************** */
   
   
            /*      
gsap.to(".foto1", {
  //y:300,
  xPercent: -100 ,
  //duration: 2,
  ease: "none",
  scrollTrigger: {
    trigger: ".foto1",
    containerAnimation: scrollTween,
    start: "left center",
    toggleActions: "play none none reset",
    id: "1",


     
    
  }
});

gsap.to(".foto2", {
 // y: -120,
  backgroundColor: "#1e90ff",
  ease: "none",
  scrollTrigger: {
    trigger: ".foto2",
    containerAnimation: scrollTween,
    start: "center 80%",
    end: "center 20%",
    scrub: true,
    id: "2"
  }
});

ScrollTrigger.create({
  trigger: ".foto3",
  containerAnimation: scrollTween,
  toggleClass: "active",
  start: "center 60%",
  id: "3"
});
 */

/* ScrollTrigger.create({
  trigger: ".green",
  containerAnimation: scrollTween,
  start: "center 65%",
  end: "center 51%",
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack: () => console.log("leaveBack"),
  onToggle: self => console.log("active", self.isActive),
  id: "4"
}); */





        



      }
    },[fotos])

    useEffect(()=>{
      update(id)
    },[])

    return (     
        <>
          <div className="container">
<span className="progressBar" ></span>
            {fotos?.map((value,index)=>(
              <section  className={` panel red foto${index%3+1}`}  key={index}>  
                <div className="slide-moving">
                  <div className="trigger-item">
                    <div className="slide">
                      <div className="img-mask">
                        
                        <img src={host+"/hebbe_backend/public/storage/"+value.name} className="item-image grid__item-img" alt=""/>
                      </div>
                    </div>              
                  </div>
                </div>
              </section>
            ))}
          </div>
        </>
    );
  }

export  default PhotoGalery;



 