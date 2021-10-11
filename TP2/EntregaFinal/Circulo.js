'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */


class Circulo extends Figura {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, color, ctx) {
		super(x,y,color,ctx);
		this.radio = RADIO;
	}

	dibujar()
	{
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = "#000000";
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();	
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
        this.ctx.closePath();
	
	}

	dibujarImagen(imagen){
		super.dibujarImagen(imagen);
		this.ctx.drawImage(imagen, (this.x - this.radio), (this.y - this.radio),  Math.pow(this.radio,2),  Math.pow(this.radio,2));
	}

	esClickeada(x,y)
	{
		//Distancia entre el centro y donde se hizo click
		let dx = this.x - x;
		let dy = this.y - y;
		//Si esta dentro de la ficha
		return Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(this.radio,2);
	}
} //FIN DE LA CLASE
