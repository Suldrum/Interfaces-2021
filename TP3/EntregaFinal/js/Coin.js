'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */
	//	this.div.style.setProperty("animation-delay", delay + "s");
class Coin extends ObjetoInteractivo {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, baseClase, stateClass, delay) {
		super(div, baseClase, stateClass,delay);
        this.touched = false;
        this.value = 5;
        this.setTop();
	}

    //Coloca un tope al azar
    setTop(){
        this.div.style.top= ((Math.random() * 60 ) +20)+ "vh";
    }

    setLeft(value)
    {
        this.div.style.left =value+"px";
    }

    getValue(){return this.value;}

    setValue(value){this.value = value;}

    isTouch(bird,left){
        if(super.isTouch(bird) && !this.touched)
        {
            this.removeDelay();
            this.touched = true;
            this.setLeft(left);
            this.changeStateClass("collected");
        }  
    }
    reset(index,value){
        this.setTop();                  
        if (this.touched )
       {
            this.touched = false;
            this.setLeft(value);
            this.setValue(5);
            this.setAnimationDelay(((Math.random() * 5 )+ 16 * index)); 
            this.changeStateClass("moveCoinToLeft");
       } 	    
    }

    stopAnimation(left)
    {
        this.removeDelay();
        this.setLeft(left);
        this.changeStateClass("rotating");
    }

} //FIN DE LA CLASE
