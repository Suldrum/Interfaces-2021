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
	constructor(x, y, color,ctx, nombre, cantidadColumnas) {
		super(x, y, color,ctx, nombre);
		this.random = cantidadColumnas;
	}

	//El jugador elige una ficha para jugar

	juegaFicha()
	{
		let ficha = this.fichas[0];
		let columna = this.movimientoAzar();
		juego.meterFicha(columna,ficha);
		
	}
	
	//Para un jugador tipo maquina, elige una columna no llena al azar para tirar una ficha.
	movimientoAzar() {
		//Crea un movimiento al azar
		let movimiento=  parseInt( (Math.random() * this.random ));
		//Controla que no esta generando un movimiento en una columna llena
		while (!juego.tablero.espacioLibre(juego.tablero.matriz[0], movimiento) )
			{
				movimiento=  parseInt( (Math.random() * this.random ));}
		return movimiento;
	}

} //FIN DE LA CLASE
