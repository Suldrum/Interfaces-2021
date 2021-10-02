'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Mas frontend que no scrolle, ugh 
 */

class Ficha {
    //Constructor de la clase, da valor a la ficha
	constructor(turno) {
		//Segun de quien sea el turno da el valor a la ficha
		if (turno)
			{this.fichaValor= 'A';} // Para el primer jugador
		else
            {this.fichaValor= 'R';} //Para el segundo jugador o la maquina
        /*
        * this.color = color;
        */ 
        
	}
	
} //FIN DE LA CLASE
