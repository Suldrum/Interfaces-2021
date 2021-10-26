'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Coin extends ObjetoInteractivo {
    //Constructor de la clase, da propiedades al objeto
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

    //Coloca un nuevo valor de estilo izquierda al div
    setLeft(value)
    {
        this.div.style.left =value+"px";
    }

    //Obtiene el valor de la moneda
    getValue(){return this.value;}

    //Coloca un valor a la moneda
    setValue(value){this.value = value;}

    //Controla si una moneda fue tomada por el avatar
    isTouch(object,left){
        if(super.isTouch(object) && !this.touched)
        {
            //Si fue tomada le quito el delay para que pueda seguir la proxima animacion inmediatamente
            this.removeDelay();
            //La marco como tomada
            this.touched = true;
            //Acomodo su valor a la izquierda para que la proxima animacion tenga un punto de inicio
            this.setLeft(left);
            //Cambia la animacion
            this.changeStateClass("collected");
        }  
    }

    //Las monedas que salieron de la pantalla se resetan al alterar su tope
    reset(index,value){
        //Altera el tope
        this.setTop();
        //Si fue tomada vuelve a recuperar sus valores default y a desplazarse por la pantalla                 
        if (this.touched )
       {
            //Valores por defecto
            this.touched = false;
            this.setLeft(value);
            this.setAnimationDelay(13 * (index + 1));
            //Animacion de desplazamiento por la pantalla
            this.changeStateClass("moveCoinToLeft");
       } 	    
    }

    //Cuando se termina el juego las monedas quedan girando sobre si mismas
    stopAnimation(left)
    {
        //Le quito el delay para el inicio inmediato de la proxima animacion
        this.removeDelay();
        //Acomodo su valor a la izquierda para la proxima animacion
        this.setLeft(left);
        //Animacion de giro en el lugar
        this.changeStateClass("rotating");
    }

} //FIN DE LA CLASE
