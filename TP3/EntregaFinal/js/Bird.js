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
	}


	makeJump(jump) {
		this.changeClass("flapping");
		this.position = this.validJump(jump);
        this.div.style.top = this.position + "px";
    }

	//Para que no se vaya del div
	validTop()
	{
		if (this.getPositionTop() < 0)
		{return 0;}
		else
		if (this.getPositionTop() > this.maxLow)
		{return this.maxLow;}
		else
		{return this.getPositionTop();}
	}

	//Si esta tocando tierra
	isGrounded(){
		return(this.position === this.maxLow);
	}

	isFalling()
	{
		return this.falling;
	}

	changeClass(clase){
		console.log(this.validTop());
		this.div.style.top = this.validTop() + "px";
		super.changeClass(clase);
		this.state = clase;	
	}
} //FIN DE LA CLASE
