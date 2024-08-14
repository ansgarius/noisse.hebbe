import React,{useEffect, useState} from 'react';
import "./main.css";

import { useLocomotiveScroll } from 'react-locomotive-scroll'
const Main = React.forwardRef((props,ref) => {

 
  
  
  const mediaMatchD = window.matchMedia('(min-width: 992px)');

  const [matchesD, setMatchesD] = useState(mediaMatchD.matches);
  useEffect(() => {
    const handler = e => setMatchesD(e.matches);
    mediaMatchD.addListener(handler);
    return () => mediaMatchD.removeListener(handler);
  },[matchesD]);

const { scroll } = useLocomotiveScroll()

/* useEffect(()=>{

  const line = document.querySelector(".camino");
  const lineLength = line.getTotalLength();
  console.log(line,lineLength);
  line.setAttribute("stroke-dasharray", lineLength);
  line.setAttribute("stroke-dashoffset", lineLength);


  let progress = 0;

const updateSVG = () => {
  line.setAttribute("stroke-dashoffset", lineLength - progress);
};
progress=100;
updateSVG();
},[]) */



const f=()=>{ scroll.start(); /* console.log(scroll); */}



useEffect(()=>{
  if (scroll) { 
    scroll.stop()
    let el=document.querySelector('.btn-experience-the-journey')
    el.addEventListener('click',()=>{
      let elTarget=document.querySelector('.a_beautiful_mess_gallery')
      //console.log(elTarget);
    
    props.setmusicinitial(1)
      scroll.start();
      scroll.scrollTo(elTarget)
    })
/*   console.log(scroll);

return()=>{*/
return ()=>{scroll.destroy();   }
  }
},[scroll])





 
    return ( 
    <> 
      <section className='a_beautiful_mess_main cover-section' data-scroll-section
        data-scroll-section-id="section0"  data-scroll-section-inview >  
        <div data-scroll="true" data-scroll-call="cover" data-scroll-position="top" className="cover active " style={{height:"100dvh"}}>      
          <div className="cover-bg-wrapper active"  ref={ref} >
            <div className="cover-bg"
          /*   
            style={{backgroundImage:"url('assets/img//couple-image-desk-cover.jpg')"}} */
            >
            










              <div data-gatsby-image-wrapper="" className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
{/*                
 <div style={{maxWidth:"1440px",display:"block"}}>
                  <img alt="" role="presentation" aria-hidden="true" 
                    src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='717'%20width='1440'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E" 
                    style={{maxWidth:"100%",display:"block",position:"static"}}/>
                </div>
                <img aria-hidden="true" data-placeholder-image="" 
                  style={{opacity: "0", transition: "opacity 500ms linear 0s", objectFit: "cover"}} 
                  decoding="async" src="data:image/jpeg;base64,/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wgARCAAKABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAcFCAn/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAHMlIvGs5HAH//EABsQAAMAAgMAAAAAAAAAAAAAAAMEBQABAhEU/9oACAEBAAEFAoM3yBvtLu08TKXiq3ro+f/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EACYQAAMAAgECBAcAAAAAAAAAAAECAwQREgUhAAYQIhMUIzFBQnH/2gAIAQEABj8CyOsShj5Py2HOiJfIniy+PSQvClK0PaUQwtQL73Ewg4hy6ZObBld8p3vktJDOByau9KmQZmPHbaGgkxr6a8dH0kq0oqv5e6JzCuwD6wAo5AH3aUle/wCpI+3igHYb/H8Hp//EABoQAQACAwEAAAAAAAAAAAAAAAEAERAhMVH/2gAIAQEAAT8hShWzRugQTmLZsIJdY8MeFu2TijHRjQURVoHZIAgA0Cg8g1j/2gAMAwEAAgADAAAAEHAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPxA//8QAGRABAQADAQAAAAAAAAAAAAAAAREAEDFx/9oACAEBAAE/EGVS2tIgSOqcAng2jLLRmyHDQ8kieRZEeYFIe4EudgBVVh1Xq6//2Q=="
                  alt=""/> */}


<picture>
                  <source type="image/webp" srcSet="assets/img/couple-image-mobil-cover.jpg 360w,
                     assets/img/couple-image-tablet-cover.jpg 720w,
                    assets/img/couple-image-desk-cover.jpg 1440w" sizes="(min-width: 1440px) 1440px, 100vw" />

                  <img   width="1440 " height="717" 
                  style={{objectFit: "cover", opacity: "1" }} data-main-image=""
                    sizes="(min-width: 1440px) 1440px, 100vw" 
                    srcSet=" assets/img/couple-image-mobil-cover.jpg 360w,
                    assets/img/couple-image-tablet-cover.jpg 720w,
                    assets/img/couple-image-desk-cover.jpg 1440w
                       "  src="assets/img/couple-image-desk-cover.jpg" alt="bg-cover"  decoding="async" loading="lazy"/>
                </picture>


 




    {/*     <div className="image-container" id="image-container">  
          <div className='wrapper'>
            <div className='content'>
              <div className='tittle'>
                A Beautiful Mess
              </div>
              <div className='text'>
                <p>
                  from nothing, something beautiful was born, like it was a miracle. <br></br>
                  mother dearest, you are radiant.
                </p>       
              </div>
              <div className='scroll-down'>
                <span className="write show" data-write="circle" onClick={e=>{alert('sss')}}> 
                  <svg  viewBox="0 0 248 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.5 30C247.5 33.8481 244.262 37.6658 238.007 41.2433C231.791 44.7989 222.763 48.0177 211.564 50.7272C189.173 56.1444 158.214 59.5 124 59.5C89.7859 59.5 58.8273 56.1444 36.4363 50.7272C25.2369 48.0177 16.2089 44.7989 9.99279 41.2433C3.7384 37.6658 0.5 33.8481 0.5 30C0.5 26.1519 3.7384 22.3342 9.99279 18.7567C16.2089 15.2011 25.2369 11.9823 36.4363 9.27278C58.8273 3.85561 89.7859 0.5 124 0.5C158.214 0.5 189.173 3.85561 211.564 9.27278C222.763 11.9823 231.791 15.2011 238.007 18.7567C244.262 22.3342 247.5 26.1519 247.5 30Z" 
                      stroke="white"    strokeWidth="2"     ></path></svg>
                  Experience the Journey
                </span>
              <div className='icon'  onClick={toggle}>
  <span />
  <span />
  <span />
  <span />
  <span />
</div>
        </div>
      </div>
      </div>
         </div> */}
        
              </div>







            </div>
          </div>

          <div className="content-data">
                <h1 className="cover-title scroll-fadeInUpAlt fadeInUpAlt d15"  >
                  <span >A LOVE STORY</span>
                </h1>
                <p className="cover-text scroll-fadeInUpAlt fadeInUpAlt d17">From nothing, <br className="d-md-none"/> something beautiful was born, 
                  <br className="d-md-none"/> like it was a miracle.</p>
                <p className="cover-text scroll-fadeInUpAlt fadeInUpAlt d18">My dearest, you look, <br className="d-md-none"/>  radiant.</p>
              </div>



              <div className="content-button">
                <div className='btn-experience-the-journey'>

         
                {/* <div className={matchesD?"oval":"ovalLoop"}> */}
                <div className={matchesD?"ovalLoop":"ovalLoop"}>
                  <svg   viewBox="0 0 248 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.5 30C247.5 33.8481 244.262 37.6658 238.007 41.2433C231.791 44.7989 222.763 48.0177 211.564 50.7272C189.173 56.1444 158.214 59.5 124 59.5C89.7859 59.5 58.8273 56.1444 36.4363 50.7272C25.2369 48.0177 16.2089 44.7989 9.99279 41.2433C3.7384 37.6658 0.5 33.8481 0.5 30C0.5 26.1519 3.7384 22.3342 9.99279 18.7567C16.2089 15.2011 25.2369 11.9823 36.4363 9.27278C58.8273 3.85561 89.7859 0.5 124 0.5C158.214 0.5 189.173 3.85561 211.564 9.27278C222.763 11.9823 231.791 15.2011 238.007 18.7567C244.262 22.3342 247.5 26.1519 247.5 30Z" stroke="white"></path>
                </svg></div>
            
                <span>Experience the Journey</span>
                </div>
       </div>
        </div>

        

      </section>

    </>
    );
});
export default Main;