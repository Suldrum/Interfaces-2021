'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Objeto {
    //Constructor de la clase, da propiedades a la ficha
	constructor(x, y, ctx) {
		this.x = x;
		this.y = y;
		this.ctx = ctx; 
	}

	//Posicion del centro de la ficha
	colocarPosicion(x,y){
		this.x = x;
		this.y = y;
	}
	
} //FIN DE LA CLASE
