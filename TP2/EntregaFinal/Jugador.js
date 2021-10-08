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
        this.color = "#FF0000";
	}

	getNombre(){
		return this.nombre;
	}

	getColor()
	{
		return this.color;
	}
	agregarFicha(ficha)
	{this.fichas.push(ficha);}

	sacarFicha(){return this.fichas.pop();}

	ponerFicha(){}

	mostrarFichas(){
		
		for (let i = 0; i < this.fichas.length ; i++)
		{
			this.fichas[i].dibujarFicha();
		}
		
	}
	
} //FIN DE LA CLASE
