'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */


class Ficha extends Objeto {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, color, ctx) {
		super(x,y,ctx);
		this.color = color;

	}

	//Posicion del centro de la ficha
	colocarPosicion(x,y){
		this.x = x;
		this.y = y;
	}
	
	getPosicion()
	{
		return [this.x,this.y];
	}

	getColor(){
		return this.color;
	}

	dibujarFicha()
	{
		
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();	
        this.ctx.arc(this.x, this.y, RADIO, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
        this.ctx.closePath();
	
	}
	
	esAgarrada(x,y)
	{
		//Distancia entre el centro y donde se hizo click
		let dx = this.x - x;
		let dy = this.y - y;
		//Si esta dentro de la ficha
		return Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(RADIO,2);
	}
} //FIN DE LA CLASE
