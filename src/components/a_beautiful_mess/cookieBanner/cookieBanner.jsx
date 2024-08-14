import React,{useState, useEffect} from 'react'
import './cookieBanner.css'
import {Link} from "react-router-dom";

const CookieBanner=({termsPage})=>{
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
   const [manage,setManage]=useState(false)


   useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    if (consent === "true") {
      setCookiesAccepted(true);
    } else {
        clearCookies();
      }
  }, []);


  useEffect(() => {
    if (!cookiesAccepted) {
      clearCookies();
      // Aquí puedes evitar cargar scripts o servicios que dependen de cookies
    }
  }, [cookiesAccepted]);


  const handleAccept = () => { 
    setCookiesAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  const handleDecline = () => {
    setCookiesAccepted(false);
    localStorage.setItem("cookiesAccepted", "false");
    clearCookies();
  };

  const clearCookies = () => { 
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };
  

   const agree=(e)=> {
        if (e.target.checked){
            console.log(e.target.checked);
        } 
        else {
        }  
    }

    return(
        !cookiesAccepted &&  <div className="CookieBannerComponent">
          {manage&&  <div className="CookieBanner_content">
                <div className="Settings_root__qoica">
                    <div className="Settings_header__30dSg">
                        <div className="Settings_title__btj9R Text_size-m-subtitle__NKQd_ Text_mobileSize-m-subtitle__0hTz9">
                            Manage Cookies
                        </div>
                        <div className="">
                            We use cookies in order to improve your site experience and deliver personalised content. By 
                            continuing to use this site, you agree to our    

                            <Link to={termsPage}  className="Button_root__6x15K Button_underline-out__Qf2Cq Button_underline__JDAqa" >
                            terms
                            </Link>
                            .
                            
                        </div>
                    </div>
                    <div className="Options_root__vSLRd">
                        <div className="Text_size-s-subtitle__O9i9J Text_mobileSize-s-subtitle__aTZQ_">
                            Options
                        </div>
                        <div className="Options_section__ramyy">
                            <div className="Options_sectionTop__tkMFa Text_size-small-p__ff29y Text_mobileSize-small-p__zdWuz
                                Text_transform-uppercase__HnQ0Y">
                                <span>Required</span>
                                <span>Always active</span>
                            </div>
                            <p className="">These cookies are essential for the basic functioning of our website. They enable you to navigate
                                through the site and use its features. Without these cookies, certain services you request may not be
                                possible.
                            </p>
                        </div>
                        <div className="Options_section__ramyy">
                            <div className="Options_sectionTop__tkMFa Text_size-small-p__ff29y Text_mobileSize-small-p__zdWuz 
                                Text_transform-uppercase__HnQ0Y">
                                <span>Analytics</span>
                                <div className="Switcher_root__xfgvq">
                                    <input type="checkbox" name="analytics" className="Switcher_input__FejQB" aria-label="switcher input"
                               onClick={agree} />
                                    <div className="Switcher_body__jKBNx">
                                        <div className="Switcher_circle__vdEV1">
                                        </div>
                                    </div>
                                    <div className="Switcher_bg__HQxip">
                                    </div>
                                </div>
                            </div>
                            <p className="">We use analytical cookies to gather data on website usage, helping us 
                                improve performance and user experience by tracking page visits and identifying
                                issues. This information is anonymous and aggregated.
                            </p>
                        </div>
                    </div>
                    <div className="Settings_footer__bRKQM">
                        <button type="button" className="Button_root__6x15K CookieBanner_btn2wI4f 
                            Settings_btn__MvzQU Text_size-small-p__ff29y Text_mobileSize-small-p__zdWuz
                            Text_transform-uppercase__HnQ0Y">
                            <span>Save Options</span>
                        </button>
                        <button type="button" className="Button_root__6x15K CookieBanner_btn2wI4f 
                           Settings_btn__MvzQU Text_size-small-p__ff29y 
                           Text_mobileSize-small-p__zdWuz Text_transform-uppercase__HnQ0Y">
                            <span>Accept all</span>
                        </button>
                    </div>
                </div>
            </div>}
            <div className="CookieBanner_body">
                <div className="CookieBanner_title">
                    This website uses cookies.
                </div>
                <button type="button" className="Button_root__6x15K CookieBanner_btn2wI4f
                     CookiePane_btn__m_4li Text_size-small-p__ff29y 
                     Text_mobileSize-small-p__zdWuz Text_transform-uppercase__HnQ0Y" onClick={()=>{setManage(!manage)}}>
                    <span>Manage</span>
                </button>
                <button type="button" className="Button_root__6x15K
                    CookieBanner_btn2wI4f CookiePane_btn__m_4li 
                    Text_size-small-p__ff29y Text_mobileSize-small-p__zdWuz 
                    Text_transform-uppercase__HnQ0Y" onClick={handleAccept}><span>Accept</span>
                </button>
                <button type="button" className="Button_root__6x15K
                    CookieBanner_btn2wI4f CookiePane_btn__m_4li 
                    Text_size-small-p__ff29y Text_mobileSize-small-p__zdWuz 
                    Text_transform-uppercase__HnQ0Y" onClick={handleDecline}><span>Decline</span>
                </button>
            </div>
        </div>
    )
}
 

export default CookieBanner;