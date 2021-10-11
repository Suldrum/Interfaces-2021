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
	constructor(nombre,color) {
		//Segun de quien sea el turno da el valor a la ficha
		this.nombre= nombre;
		this.fichas = [];
        this.color = color;
		this.turno = false;
	}

	getNombre(){
		return this.nombre;
	}

	getColor()
	{
		return this.color;
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

	//El jugador elige una ficha para jugar

	juegaFicha(x,y)
	{
		//Si toco una de sus fichas
		for (let i = 0; i < this.fichas.length ; i++)
		{
			if (this.fichas[i].esClickeada(x,y))
			{
				return this.fichas[i];
			}
		}
		//Si toco en cualquier otro lado
		return null;	
	}

} //FIN DE LA CLASE
