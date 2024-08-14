import React, {useEffect,useState} from 'react';
import "./controlAudio.css";
const ControlAudio  = (props) => {
 
  const [audio] = useState(new Audio("./assets/sound/Gravity.mp3"));
  const [playing, setPlaying] = useState(0);
  const toggle = () => {setPlaying(!playing);  };

  useEffect(() => {
    if(props.musicinit)
      setPlaying(1);   
    },
    [props.musicinit]
  );

  let audioAnalizer= async()=>{
    const canvas=document.querySelector('canvas');
    const ctx=canvas.getContext('2d')
    ctx.fillRect(0,0,canvas.width,canvas.height)
    const initAnalyser= async(_audio)=>{
      const contexto= new AudioContext();
      const src=contexto.createMediaElementSource(_audio);
      const analyser=contexto.createAnalyser();
      src.connect(analyser);
      analyser.connect(contexto.destination);
      analyser.fftSize=256;
      return analyser;
    } 
    const drawAudio=(_analyser)=>{
      const WIDTH=canvas.width, HEIGHT=canvas.height;
      requestAnimationFrame(()=>drawAudio(_analyser));
      const bufferLenght=_analyser.frequencyBinCount;
      const dataArray=new Uint8Array(bufferLenght);
      const barWidth=(WIDTH/(bufferLenght/8));
      //const barWidth=(WIDTH/bufferLenght);
      let x=0;
      _analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle="#111111"//backgrouwn color
      ctx.fillRect(0,0,WIDTH,HEIGHT)
      dataArray.forEach((decibel,index)=>{
        const c=index/bufferLenght;
        const r=decibel+25*c;
        const g=250*c;
        const b=250
        //ctx.fillStyle=`rgb(${r},${g},${b})`
        ctx.fillStyle=`white`
        ctx.fillRect(x,HEIGHT-decibel,barWidth,decibel)
        x+=barWidth+1;
      })
    }
    const analyser= await initAnalyser(audio);
    drawAudio(analyser)
  }

  useEffect(  () => {   
    if (playing) {
      audioAnalizer()
    }
    playing ? 
      audio.play():
      audio.pause();
    return () => {
      audio.removeEventListener('ended', () => setPlaying(0));
    };
  },
  [playing]
  );

  useEffect(() => {
    const canvas=document.querySelector('canvas');
    const ctx=canvas.getContext('2d')
    ctx.fillRect(0,0,canvas.width,canvas.height)
    audio.addEventListener('ended', () => setPlaying(0));
  },[]);
  
    return ( 
    <>
      <div className='audioAnalizerComponent'>
        <div className="abm-audio-controls " style={{opacity: "1", transform: "none",mixBlendMode:props.isportal?'normal':'difference'}}>
          <div className="lottie-audio-controls"  onClick={toggle}>
            <canvas></canvas>
          </div>
        </div>
      </div>
    </>
    );
};

export default ControlAudio;