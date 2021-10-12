'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class JugadorHumano extends Jugador{
    //Constructor de la clase
	constructor(x, y, color,ctx, nombre) {
		//Segun de quien sea el turno da el valor a la ficha
		super(x, y, color,ctx, nombre);
	}

	//El jugador elige una ficha para jugar

	esFicha(x,y)
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

	juegaFicha()
	{
		
		canvas.addEventListener('mousemove', mouseMove);
		 function mouseMove(e) {
			if (juego != null && fichaJugada != null) {
				let x = e.offsetX;
				let y = e.offsetY;
				x = permanecerDentro(x,canvas.width);
				y = permanecerDentro(y, canvas.height);
				fichaJugada.colocarPosicion(x,y);
				juego.actualizarJuego();
				
			}
		}
		
			//Si se sale del canvas mientras esta dibujando me encargo de dibujar hasta el borde
			canvas.addEventListener("mouseout",mouseOut);
			function mouseOut(e){
			if (juego != null && fichaJugada != null)
			{  
				let x = e.offsetX;
				let y = e.offsetY;
				x = permanecerDentro(x,canvas.width);
				y = permanecerDentro(y, canvas.height);
				fichaJugada.colocarPosicion(x,y);
				juego.actualizarJuego();
				fichaJugada = null;		
			}
			}
		
		//Si se sale del canvas mientras esta dibujando me encargo de dibujar hasta el borde
			canvas.addEventListener("mouseup", mouseUp);
			function mouseUp(e){
				if (juego != null && fichaJugada != null)
				{  
				//Dibujo la ficha por ultima vez
				let x = e.offsetX;
				let y = e.offsetY;
				x = permanecerDentro(x,canvas.width);
				y = permanecerDentro(y, canvas.height);
				fichaJugada.colocarPosicion(x,y);
				let columna = juego.sobreFlecha(x,y);
				if (columna > -1)
				{
					juego.meterFicha(columna,fichaJugada);
				}else
				{juego.actualizarJuego();}
				fichaJugada = null;
				}
			}
		
			function permanecerDentro(valor, max)
			{
				if (valor < RADIO)
					{return RADIO;}
				if (valor > max - RADIO)
					{return max - RADIO;}
				return valor;
			}
		
			
			canvas.addEventListener('mousedown', mouseDown );
			
			function mouseDown(e) {
				let x = e.offsetX;
				let y = e.offsetY;
				if (juego != null)
				{fichaJugada = juego.turno.esFicha(x,y);
					if (fichaJugada != null )
					{  
						fichaJugada.colocarPosicion(x,y);
						juego.actualizarJuego();
					}	
				}
			}
			function mueveFicha(e){
				if (juego != null && fichaJugada != null)
				{  
					let x = e.offsetX;
					let y = e.offsetY;
					x = permanecerDentro(x,canvas.width);
					y = permanecerDentro(y, canvas.height);
					fichaJugada.colocarPosicion(x,y);
					juego.actualizarJuego();	
				}
			}
			
	}

} //FIN DE LA CLASE
