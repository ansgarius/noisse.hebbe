class ImageContainer{

    translateX: number;
    el: HTMLElement;
    image: HTMLImageElement;
    viewPort: HTMLElement
    centerRef: number;
    parentCenter: number;
    translateNum: number;

    constructor(
        public imgSrc: string, 
        public parentEl: HTMLElement,
        // No need to use this keyword for these parameters as they use the public keyword which automatically asigns these.
    ){
        this.translateX = 0;
        this.viewPort = document.querySelector('.slider__viewport')
        this.translateNum = +this.parentEl.dataset.transform;
        this.appendImage();//pega la imagen
        this.setDimensions()
        this.addEventListeners();
    }

    appendImage(){
        this.el = document.createElement('div');
        this.el.classList.add('image__container');
        this.el.style.width = this.parentEl.dataset.width;        
        this.image = document.createElement('img');
        this.image.src = this.imgSrc;
        this.el.appendChild(this.image);
        this.parentEl.appendChild(this.el);
    }

    setDimensions(){
        this.centerRef = window.innerWidth / 2;
        
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
        console.log(this.centerRef ,this.parentCenter, width,left);
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