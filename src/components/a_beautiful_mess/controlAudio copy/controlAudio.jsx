import React, {useRef,useEffect,useState} from 'react';
import "./controlAudio.css";
import { gsap } from "gsap";
const ControlAudio  = (props) => {

  const [t1] = useState(gsap.timeline({defaults:{ 
      ease: "slow(0.7,0.7,false)",
      duration: 1 ,
      repeat: -1, /* repeatDelay: 1, */
      runBackwards:true,
    },
    paused:true,
  }));
  const [audio] = useState(new Audio("./assets/sound/Gravity.mp3"));
  const [playing, setPlaying] = useState(0);
  const toggle = () => {setPlaying(!playing);  };

  useEffect(() => {
    if(props.musicinit)
      setPlaying(1);   
    },
    [props.musicinit]
  );
  
  useEffect(() => {
      playing ?   t1.play():t1.pause();
      playing ? audio.play() : audio.pause();
      return () => {
        audio.removeEventListener('ended', () => setPlaying(0));
      };
    },
  [playing]
  );

  useEffect(() => { 
    audio.addEventListener('ended', () => setPlaying(0));
  },[]);
  
  const comp = useRef()
  const comp1 = useRef()
  const comp2 = useRef()
  const comp3 = useRef()
  const comp4 = useRef()
  
  useEffect(()=>{
    // console.log(comp) // { current: div.box }
    t1.from(comp.current, {
      scaleY: .6,
      delay:.5
    })
    .from(comp1.current, {
      scaleY: .6,
      delay:.4
    })
    .from(comp2.current, {
      scaleY: .6,
      delay:.3
    })
    .from(comp3.current, {
      scaleY: .6,
      delay:.2
    })
    .from(comp4.current, {
      scaleY: .6,
      delay:.1
    });
    return ()=>{}
  },[])

    return ( 
    <>
      <div className='a_beautiful_mess_audio'>
        {/* container */}
        <div className="abm-audio-controls " style={{opacity: "1", transform: "none",mixBlendMode:props.isportal?'normal':'difference'}}>
          <div className="lottie-audio-controls"  onClick={toggle}>
            <svg  
              width="40" height="40" viewBox="0 0 40 40" preserveAspectRatio="none"
              className="audio-lottie-svg" 
              style={{
                overflow:"visible",
                contentVisibility: "visible",
              }}>
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h46v46H0z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#a)">
                  <path
                    fill="transparent"
                    d="M0 0h46v46H0z"
                    style={{
                      display: "block",
                    }}
                  />
                  <path
                ref={comp}
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    d="M-9-16.875v32.25"
                    style={{
                      display: "block",
                      transformOrigin:"center",
                    }}
                                    /*   (scalex  skewx skewy scakey transformx transformy) */
                    transform="matrix(1 0 0 .2 15 20)"
                  />
                  <path    ref={comp1}
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    d="M-9-16.875v32.25"
                    style={{
                      display: "block",
                      transformOrigin:"center",
                    }}
                    transform="matrix(1 0 0 .2 20 20)"
                  />
                  <path    ref={comp2}
                    fill="none"
                    stroke="#FFF"
                    strokeWidth={2}
                    d="M-9-16.875v32.25"
                    style={{
                      display: "block",
                      transformOrigin:"center",
                    }}
                    transform="matrix(1 0 0 .2 25 20)"
                  />
                  <path    ref={comp3}
                    fill="none"
                    stroke="#FFF"
                    strokeWidth={2}
                    d="M-9-16.875v32.25"
                    style={{
                      display: "block",
                      transformOrigin:"center",
                    }}
                    transform="matrix(1 0 0 .2 30 20)"
                  />
                  <path    ref={comp4}
                    fill="none"
                    stroke="#FFF"
                    strokeWidth={2}
                    d="M-9-16.875v32.25"
                    style={{
                      display: "block",
                      transformOrigin:"center",
                    }}
                    transform="matrix(1 0 0 .2 35 20)"
                  />
                </g>
            </svg>
          </div>
        </div>
      </div>
    </>
    );
};
export default ControlAudio;