'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Bird extends Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, clase, maxLow) {
		super(div, clase);
		//Limite de la zona de juego, sera la altura del body o del div donde se encuentre
		this.maxLow = maxLow;
		this.falling = true;
		this.interval;
	}

	//Inicia la caida del ave
	startFalling(){
		this.interval = setInterval(() => {
			bird.makeJump(20);
			//Si se sale de la zona del juego deja de caer
			if(this.isGrounded())
			{	this.stoptFalling(); }
		}, 125);
	}
	makeJump(jump) {
		this.position = this.validJump(jump);
        this.div.style.top = this.position + "px";
    }

	//Para que no se vaya del div
	validJump(jump)
	{
		if (this.position + jump < 0)
		{return 0;}
		else
		if (this.position + jump > this.maxLow)
		{return this.maxLow}
		else
		{return this.position + jump;}
	}

	//Si esta tocando tierra
	isGrounded(){
		return(this.position === this.maxLow);
	}

	isFalling()
	{
		return this.falling;
	}
	//Finaliza la caida del ave
	stoptFalling(){
		this.falling = false;
		clearTimeout(this.interval);
	}
} //FIN DE LA CLASE
