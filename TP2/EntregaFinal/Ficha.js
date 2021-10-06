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

	dibujarFicha()
	{
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();	
        this.ctx.arc(this.x, this.y, RADIO, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
        this.ctx.closePath();
	}
	

} //FIN DE LA CLASE
