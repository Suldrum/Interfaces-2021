'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */


class Cuadrado extends Objeto {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, color, ctx, ancho, alto) {
		super(x,y,color,ctx);
		this.ancho = ancho;
		this.alto = alto;
	}

	dibujar()
	{
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = "#000000";
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.fillRect(this.x, this.y, this.ancho, this.alto);
		if (this.imagen !== null)
		{
			this.dibujarImagen();
		}
        this.ctx.closePath();
	}
	
	dibujarImagen(){
		this.ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
	}

	esClickeada(x,y)
	{	
		return (x > this.x && x < this.x + this.ancho) && (y > this.y && y < this.y + this.alto)
		
	}
} //FIN DE LA CLASE
