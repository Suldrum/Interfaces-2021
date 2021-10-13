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

	
	//Si toco una de sus fichas
	esFicha(x,y)
	{
		//Verifica si el click se realizo en alguna las fichas que posee actualmente
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

	//El jugador humano mueve su ficha por el canvas y realiza su jugada al colocarla sobre alguna de las flechas
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

			//Funcion que se devuelve un valor contenido dentro del canvas para que la ficha no huya del mismo 
			function permanecerDentro(valor, max)
			{
				if (valor < RADIO)
					{return RADIO;}
				if (valor > max - RADIO)
					{return max - RADIO;}
				return valor;
			}

			//Esta funcion capaz y la borro como hice con la de borrado de addlisteners, esta por verse
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
