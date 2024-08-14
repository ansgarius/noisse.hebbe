class ImageContainer{

    translateX: number;
    el: HTMLElement;
    image: HTMLImageElement;
    viewPort: HTMLElement
    centerRef: number;
    parentCenter: number;
    translateNum: number;
    direction:string
    constructor(
        public imgSrc: string, 
        public parentEl: HTMLElement,
        public indexElement:number,
        public textcolor: string,
        public bgColor: string,
        public title: string,
        public text: string,
        public subtitle: string
        // No need to use this keyword for these parameters as they use the public keyword which automatically asigns these.
    ){




  




        this.translateX = 0;
        this.direction=''
        this.viewPort = document.querySelector('.slider__viewport')
        this.translateNum = +this.parentEl.dataset.transform;
        this.appendImage(indexElement,textcolor,bgColor, title,text,subtitle);//pega la imagen
        this.setDimensions()
        this.addEventListeners();
    }

    appendImage(indexElement,textcolor: string,bgColor: string, title: string,text: string,subtitle: string){
        this.el = document.createElement('div');
        this.el.classList.add('image__container');

        this.el.dataset.title = title;
        this.el.dataset.subtitle = subtitle;
        this.el.dataset.text = text;
        this.el.dataset.textColor = textcolor;
        this.el.dataset.bgColor = bgColor;
        this.el.dataset.index = indexElement;
        
   
        
        
        
        this.el.style.width = this.parentEl.dataset.width;  


        this.image = document.createElement('img');
        this.image.src = this.imgSrc;
        this.el.appendChild(this.image);
        this.parentEl.appendChild(this.el);
    }

    setDimensions(){
        this.centerRef = window.innerWidth / 2;
        
    }

    advance(amount:number){
        if (amount>0) {
            this.direction='left'
        }
        else{
            this.direction='right'

        }
        this.translateX -= amount;
    }

    move(slideWidth:number,slidesArray:Array<Element>,origin:number,el:number){ 
        
 

this.parentEl.style.transform = `translateX(${(this.translateX / (window.innerWidth * .6)) * 100}%)`;

if(this.direction=='right'){
    
    if(this.parentEl.getBoundingClientRect().left > slideWidth * ((slidesArray.length  /2 )-1 )){                 
        this.parentEl.style.left = ` ${ -(((slidesArray.length/2)+(slidesArray.length-el))*100)       }%`;
        if (this.translateX<0  && this.direction=='right') this.translateX=this.translateX+ (  ((slidesArray.length*100)/100)* (window.innerWidth * .6))
        
                if((this.translateX / (window.innerWidth * .6)) * 100>slidesArray.length*100){   
                    this.parentEl.style.opacity='0'; 
                    this.translateX=this.translateX-  (  ((slidesArray.length*100)/100)* (window.innerWidth * .6))
                    // this.parentEl.style.transform = `translateX(${-(  ((slidesArray.length*100)/100)* (window.innerWidth * .6))}%)`;
                    this.parentEl.style.transform = `translateX(${(this.translateX / (window.innerWidth * .6)) * 100}%)`;
                    setTimeout(() => {
                            this.parentEl.style.opacity='1'; 
                        }, 1500);
                }
           
            }
        }

        if(this.direction=='left'){
            if(this.parentEl.getBoundingClientRect().left < -(slideWidth * ((slidesArray.length  /2 )-2 ))){ 
                this.parentEl.style.left = ` ${ (((slidesArray.length/2)+el)*100)       }%`;
if (this.translateX>0  &&  this.direction=='left') this.translateX=this.translateX=this.translateX- (  ((slidesArray.length*100)/100)* (window.innerWidth * .6))

                if((this.translateX / (window.innerWidth * .6)) * 100<-(slidesArray.length*100)){ 
                    this.parentEl.style.opacity='0'; 
                    this.translateX=this.translateX+  (  ((slidesArray.length*100)/100)* (window.innerWidth * .6))
                    this.parentEl.style.transform = `translateX(${(this.translateX / (window.innerWidth * .6)) * 100}%)`;
                    setTimeout(() => {
                        this.parentEl.style.opacity='1'; 
                    }, 1500);
                }
        }}
        
    }

    addEventListeners(){
        window.addEventListener('resize', () => {
           this.setDimensions();
        })
    }

    animate(){
        //alert('[[[[[[[[[[[[[[[')
        let {left, width } = this.parentEl.getBoundingClientRect();

        
        this.parentCenter = left + (width / 2);
        //mitad de la oantalla -    la distancia a limite izquierdo de la pantalla + la mitad del ancho del elemenmto
        this.el.style.transform = `translateX(${(this.centerRef - this.parentCenter) * -this.translateNum}px)`
    }
}

const images: string[] = [
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1713350472373-fb79157678b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    
]

export  {ImageContainer, images};