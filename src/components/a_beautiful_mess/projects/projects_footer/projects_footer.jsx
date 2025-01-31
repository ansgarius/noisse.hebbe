import React,{useEffect, useState} from 'react';
import "./projects_footer.css";

const ProjectFooter =  ({bgCoverImage}) => {
  
    return ( 
   
 <footer className="clapat-footer hidden">        	
                    <div id="footer-container">
                        
                        <div id="backtotop" className="button-wrap left" style={{color: "rgb(156, 80, 95)"}}>
                            <div className="icon-wrap parallax-wrap">
                                <div className="button-icon parallax-element">
                                    <i className="fa-solid fa-angle-up"></i>
                                </div>
                            </div>
                            <div className="button-text sticky left"><span data-hover="Back Top">Back Top</span></div> 
                        </div>
                        
                        <div className="footer-middle">
                            <div className="copyright" style={{color: "rgb(156, 80, 95)"}}>2024 © 
                              <a className="link" target="_blank" href="https://www.clapat.com/" style={{color: "rgb(156, 80, 95)"}}>
                              ClaPat</a>. All rights reserved.</div>
                        </div>
                        
                        
                        <div className="socials-wrap" style={{color: "rgb(156, 80, 95)"}}>            	
                            <div className="socials-icon"><i className="fa-solid fa-share-nodes"></i></div>
                            <div className="socials-text">Follow Us</div>
                            <ul className="socials">
                                <li><span className="parallax-wrap"><a className="parallax-element" href="https://www.dribbble.com/clapat" target="_blank" style={{color: "rgb(156, 80, 95)"}}>Db</a></span></li>
                                <li><span className="parallax-wrap"><a className="parallax-element" href="https://www.twitter.com/clapatdesign" target="_blank" style={{color: "rgb(156, 80, 95)"}}>Tw</a></span></li>
                                <li><span className="parallax-wrap"><a className="parallax-element" href="https://www.behance.com/clapat" target="_blank" style={{color: "rgb(156, 80, 95)"}}>Be</a></span></li>
                                <li><span className="parallax-wrap"><a className="parallax-element" href="https://www.facebook.com/clapat.ro" target="_blank" style={{color: "rgb(156, 80, 95)"}}>Fb</a></span></li>
                                <li><span className="parallax-wrap"><a className="parallax-element" href="https://www.instagram.com/clapat.themes/" style={{color: "rgb(156, 80, 95)"}}>Ig</a></span></li>
                            </ul>                
                        </div>
                        
                    </div>
                </footer>
  
    );
};
export default ProjectFooter;