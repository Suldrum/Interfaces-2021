'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Figura {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, color,ctx) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.ctx = ctx;
	//	this.draggable = false;
	}

	getColor(){
		return this.color;
	}

	//Posicion del centro de la ficha
	colocarPosicion(x,y){
		this.x = x;
		this.y = y;
	}

	obtenerPosicion(){
		return [this.x,this.y];
	}
	
	dibujar(){}

	dibujarImagen(imagen){}
	esClickeada(x,y){}
} //FIN DE LA CLASE
