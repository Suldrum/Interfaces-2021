'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 *
 */

// Clase para un juego con un reloj que limita el tiempo de juego
class JuegoTemporizado extends Juego {

	constructor(tablero,jugador1,jugador2,reloj,ctx){
		super (tablero,jugador1,jugador2,ctx);
		this.reloj = reloj;
    }

	empezarJuego(){
		super.empezarJuego();
		this.reloj.iniciar();
	}

	terminarJuego(victoria){
		this.reloj.terminar();
		super.terminarJuego(victoria);
	}
}//FIN DE LA CLASE
