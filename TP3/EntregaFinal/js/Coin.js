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
        this.value = 5;
        this.setTop();
	}

    //Esto se cambiara a Math random
    setTop(){
        this.div.style.top= ((Math.random() * 60 ) +20)+ "vh";
    }

    setLeft(value)
    {
        this.div.style.left =value+"px";
    }

    getValue(){return this.value;}

    setValue(value){this.value = value;}

    isOutScreen(){
        let object = this.getPositionData();
        return (object.left < (0 - (object.width + 5)) ) ;

    }

    isTouch(bird){
        super.stopAnimation();
        let left = this.getPositionLeft();
        if(super.isTouch(bird) && !this.touched)
        {
            super.removeDelay();
            this.touched = true;
            this.setLeft(left);
            this.changeStateClass("collected");
            super.playAnimation();
        }
            
    }
    reset(index,value){
        super.stopAnimation();
        this.setTop();                  
        if (this.touched )
       {
            this.touched = false;
            this.setLeft(value);
            this.setValue(5);
            this.setAnimationDelay(((Math.random() * 5 )+ 16 * index)); 
            super.changeStateClass("moveCoinToLeft");
       } 	    
        super.playAnimation();
    }


} //FIN DE LA CLASE
