'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class JugadorIA extends Jugador{
    //Constructor de la clase
	constructor(color) {
		super("IA",color);
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

		//Para un jugador tipo maquina, elige una columna no llena al azar para tirar una ficha.
		movimientoAzar() {
			//Crea un movimiento al azar
			let movimiento=  parseInt( (Math.random() * this.matriz[0].length ));
			//Controla que no esta generando un movimiento en una columna llena
			while ( this.llenaColumna(this.matriz[0], movimiento) )
				movimiento=  parseInt( (Math.random() * this.matriz[0].length ));
			return movimiento;
		}
	

} //FIN DE LA CLASE
