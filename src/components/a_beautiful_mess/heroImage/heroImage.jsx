import React,{useEffect, useState} from 'react';
import "./heroImage.css";

const HeroImage =  ({bgCoverImage}) => {
  
    return ( 
    <> 
      <section className='heroImage cover-section'  >  
        <div data-scroll="true" data-scroll-call="cover" data-scroll-position="top" className="cover active " style={{height:"100dvh"}}>      
          <div className="heroImage_cover-bg-wrapper active"  >
            <div className="cover-bg">
              <div data-gatsby-image-wrapper="" className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
                <picture>
                  <source type="image/webp" 
                  srcSet={"assets/img/couple-image-mobil-cover.jpg 360w, assets/img/couple-image-tablet-cover.jpg 720w,  "+bgCoverImage+" 1440w"} sizes="(min-width: 1440px) 1440px, 100vw" />
                  <img   width="1440 " height="717" 
                    style={{objectFit: "cover", opacity: "1" }} data-main-image=""
                    sizes="(min-width: 1440px) 1440px, 100vw" 
                    srcSet={" assets/img/couple-image-mobil-cover.jpg 360w, assets/img/couple-image-tablet-cover.jpg 720w,"+bgCoverImage+" 1440w"}  src={bgCoverImage} alt="bg-cover"  decoding="async" loading="lazy"/>
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    );
};
export default HeroImage;