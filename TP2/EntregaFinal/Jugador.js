'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Jugador {
    //Constructor de la clase
	constructor() {
		//Segun de quien sea el turno da el valor a la ficha
		this.nombre= "jugador";
		this.fichas = [];
        
	}

	getNombre(){
		return this.nombre;
	}
	agregarFicha(ficha)
	{this.fichas.push(ficha);}

	sacarFicha(){this.fichas.pop();}

	ponerFicha(){}
	
} //FIN DE LA CLASE
