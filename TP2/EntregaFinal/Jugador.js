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
	getTurno(turno){
		return this.turno;
	}
	agregarFicha(ficha)
	{this.fichas.push(ficha);}

	sacarFicha(){return this.fichas.pop();}

	ponerFicha(){}

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
				this.fichas[i].draggable = true;
				return this.fichas[i];
			}
		}
		//Si toco en cualquier otro lado
		return null;	

	}


} //FIN DE LA CLASE
