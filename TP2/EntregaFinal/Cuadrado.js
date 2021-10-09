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
	//	this.dibujar();
		this.ctx.drawImage(imagen, this.x, this.y, this.ancho, this.alto);
	}

	esClickeada(x,y)
	{
			if (x > (this.x- this.ancho * 0.5) 
			&& x <= (this.x + this.ancho  - this.ancho  * 0.5)
			&& y > (this.y  - this.alto * 0.5)  
			&& y <= this.y + this.alto - this.alto * 0.5) 
			{
				return true; 
			}
			else{
				return false; 
			}
		
	}
} //FIN DE LA CLASE
