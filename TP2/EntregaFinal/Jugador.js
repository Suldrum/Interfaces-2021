'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Jugador extends Objeto{
    //Constructor de la clase
	constructor(x, y, color,ctx, nombre) {
		
		super(x, y, color,ctx);
		this.nombre= nombre;
		this.fichas = [];
		this.turno = false;
	}

	getNombre(){
		return this.nombre;
	}

	setTurno(turno){
		this.turno = turno;
	}
	getTurno(){
		return this.turno;
	}
	agregarFicha(ficha)
	{this.fichas.push(ficha);}

	sacarFicha(ficha){this.fichas.splice(ficha, 1);}

	mostrarFichas(){
		
		for (let i = 0; i < this.fichas.length ; i++)
		{
			this.fichas[i].dibujar();
		}
		
	}

	juegaFicha(){}
	
	dibujar(){
		// Inicializamos una ruta
		this.ctx.beginPath(); 
		// Trazo sin terminaciones
		this.ctx.lineCap = "butt";
		//Adios contorno 
		this.ctx.strokeStyle = this.getColor();
		this.ctx.lineWidth = 4;
		this.ctx.fillStyle = this.getColor(); 
		// Establecemos la tipografía
		this.ctx.font = "45px Verdana"; 
		this.ctx.strokeText(this.nombre, this.x ,this.y );
		this.ctx.fillText(this.nombre, this.x ,this.y );
		this.ctx.closePath();
	}

} //FIN DE LA CLASE
