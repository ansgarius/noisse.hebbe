import React,{ useEffect,useRef} from 'react';
import "./drop_zone.css";

const DropZone = ({setFotos,fotos,title,multipleFile}) => {
  const dropZoneElement=useRef();
  const inputElement=useRef();
  
  useEffect(()=>{
    if (fotos.length==0) {
      inputElement.current.files = null;
      dropZoneElement.current.querySelector(".drop-zone__prompt").style.display="block";
      dropZoneElement.current.querySelectorAll(".drop-zone__thumb").forEach((item) => {
        item.remove();
      });
    }
  //  updateThumbnail(dropZoneElement, fotos);
  },[fotos])
  
  useEffect(()=>{

      //buscar el elemento mas cercano hacia arriba con la clase drop-zone
     // const dropZoneElement = inputElement.closest(".drop-zone");
      //al darle click a la drop-zone desencadena el click del input file
      const clickInput=(e) => {
        inputElement.current.click();
      }

      const dragoverHandle=(e) => {
        e.preventDefault();
        dropZoneElement.current.classList.add("drop-zone--over");
      }

      const changeHandle=(e)=>{
        if (inputElement.current.files.length) {
          updateThumbnail(dropZoneElement, inputElement.current.files);
        }
      }

      const dragleave_dragendHandle=(e) => {
        dropZoneElement.current.classList.remove("drop-zone--over");
      }

      const dropHandle=(e)=>{
        e.preventDefault();
        if (e.dataTransfer.files.length) {
           inputElement.current.files = e.dataTransfer.files;
           updateThumbnail(dropZoneElement, e.dataTransfer.files);
        }
        dropZoneElement.current.classList.remove("drop-zone--over");
      }

      dropZoneElement.current.addEventListener("click", clickInput);
      inputElement.current.addEventListener("change", changeHandle);
      dropZoneElement.current.addEventListener("dragover",dragoverHandle);
      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.current.addEventListener(type, dragleave_dragendHandle );
      });
      dropZoneElement.current.addEventListener("drop",dropHandle );




    const loadImage= (el,file)=>{ 
      if (file.type.startsWith("image/")) { 
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =  () => { 
          el.style.backgroundImage = `url('${reader.result}')`;
        }
      }   
      else {
        el.style.backgroundImage = null;
      } 
    };
  
    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File[]} files
     */
    const updateThumbnail=(dropZoneElement, files) =>{
      let thumbnailElement = dropZoneElement.current.querySelector(".drop-zone__thumb");
      // First time - remove the prompt
      if (dropZoneElement.current.querySelector(".drop-zone__prompt")) { 
//        dropZoneElement.current.querySelector(".drop-zone__prompt").remove();
        dropZoneElement.current.querySelector(".drop-zone__prompt").style.display="none";
      }
      // Remove all drop-zone__thumb
      dropZoneElement.current.querySelectorAll(".drop-zone__thumb").forEach((item) => {
        item.remove();
      });
      setFotos(files)
      for (let file of files) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.current.appendChild(thumbnailElement);
        thumbnailElement.dataset.label = file.name;
        loadImage(thumbnailElement,file)
      }
    }

    return ()=>{
     /*  inputElement.removeEventListener("change", changeHandle);
      dropZoneElement.removeEventListener("drop",dropHandle );
      dropZoneElement.removeEventListener("click", clickInput);
      dropZoneElement.removeEventListener("dragover",dragoverHandle);
      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.removeEventListener(type, dragleave_dragendHandle );
      }); */
    }

  },[])
  
  return (     
    <div className='hebbe_drop-zone'>
      <div className="drop-zone" ref={dropZoneElement}>
        <span className="drop-zone__prompt">
          <svg  preserveAspectRatio="none"  viewBox="0 0 493.246 493.246" fill='var(--primary-color)'>
            <path d="M466.33 155.291c-11.969-12.967-26.9-22.486-43.363-27.834-6.442-47.746-47.455-84.664-96.94-84.664a95.15 95.15 0 0 0-12.497.805C289.237 16.873 254.7 1.344 218.104 1.344c-32.698 0-63.868 12.259-87.788 34.537-18.461 17.187-31.283 39.062-37.276 63.097C40.141 109.06 0 155.677 0 211.492c0 63.162 51.386 114.545 114.529 114.545h10.421c-1.835 12 0 24.469 5.848 35.68 8.15 15.592 22.648 26.498 39.578 30.074v41.801c0 16.607 6.894 31.361 18.122 42.059 10.469 10.004 24.582 16.252 40.173 16.252h35.889c15.593 0 29.705-6.248 40.174-16.252 12.212-11.664 18.123-26.965 18.123-42.059v-41.801c16.928-3.576 31.425-14.482 39.577-30.074 5.847-11.211 7.683-23.68 5.847-35.68h23.179c56.121 0 101.787-45.666 101.787-101.803-.001-25.613-9.552-50.098-26.917-68.943zM321.534 340.373a12.156 12.156 0 0 1-10.776 6.539h-34.019v86.68c0 6.717-5.479 12.178-12.179 12.178h-35.889c-6.701 0-12.178-5.461-12.178-12.178v-86.68H182.473c-4.526 0-8.667-2.512-10.793-6.539a12.122 12.122 0 0 1 .838-12.596l64.109-91.914a12.216 12.216 0 0 1 9.989-5.201 12.21 12.21 0 0 1 9.986 5.201l64.11 91.914a12.079 12.079 0 0 1 .822 12.596z" />
          </svg>
          <br />
          {/* 
          Drag and drop your */} {title} {/* here  
          <br/> 
          or click to browse your files */}
        </span>
        <span  className="drop-zone__prompt"></span>
        {multipleFile&& <input type="file" name="myFile" className="drop-zone__input" ref={inputElement} multiple/>  }
        {!multipleFile&& <input type="file" name="myFile" className="drop-zone__input" ref={inputElement}/>  }

      </div> 
    </div>
  );
};

export default DropZone;