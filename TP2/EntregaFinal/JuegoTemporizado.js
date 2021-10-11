'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 *
 */
// Ni bien se carga la página me aseguro que este en su estado por defecto
class JuegoTemporizado extends Juego {

	constructor(tablero,jugador1,jugador2,reloj,ctx){
		super (tablero,jugador1,jugador2,ctx);
		this.reloj = reloj;
    }

	empezarJuego(){
		super.empezarJuego();
		this.reloj.iniciar();
	}

	terminarJuego(victoria) {
		this.reloj.terminar();
		super.terminarJuego(false);
	}
}//FIN DE LA CLASE
