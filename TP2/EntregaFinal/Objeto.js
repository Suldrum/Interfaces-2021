'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(x, y, color,ctx) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.ctx = ctx;
	}

	//Devuelve el color del objeto
	getColor(){
		return this.color;
	}

	//Coloca el objeto en la posicion x, y dada por parametro
	colocarPosicion(x,y){
		this.x = x;
		this.y = y;
	}

	//Devuelve la posicion del objeto como un vector de 2 valores
	obtenerPosicion(){
		return [this.x,this.y];
	}
	
	//
	dibujar(){}

	//
	dibujarImagen(imagen){
		this.dibujar();
	}

	//
	esClickeada(x,y){}
} //FIN DE LA CLASE
