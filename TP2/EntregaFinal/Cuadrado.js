'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */


class Cuadrado extends Figura {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, color, ctx, ancho, alto) {
		super(x,y,color,ctx);
		this.ancho = ancho;
		this.alto = alto;
	}

	dibujar()
	{
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.closePath();
	}
	
	dibujarImagen(imagen){
		super.dibujarImagen(imagen);
		this.ctx.drawImage(imagen, this.x, this.y, this.ancho, this.alto);
	}

	esClickeada(x,y)
	{	
		return (x > this.x && x < this.x + this.ancho) && (y > this.y && y < this.y + this.alto)
		
	}
} //FIN DE LA CLASE
