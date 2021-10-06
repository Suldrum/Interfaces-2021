'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 */

 const VALORVACIO= '-';

 const COLOR = "#008080";
 const BLANCO = "#FFFFFF";

class Tablero extends Objeto{

	//Crea un nuevo tablero en blanco de tamaño fila x columna
	constructor(x,y,ctx,ancho,alto){
		super(x,y,ctx);
		this.ancho = ancho * TAMAÑO; 
		this.alto = alto * TAMAÑO;
		//this.matriz = ArrayList;
    }

	dibujarTablero(){
		//Dibuja el rectangulo
		this.ctx.fillStyle = COLOR;
		this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.closePath();
	}

	//Esto deberia dibujar circulos en blanco pero no quiere el hdp!
	dibujarDefault()
	{
		for (let fila = this.x; fila < this.ancho; fila += TAMAÑO) {
            for (let columna = this.y; columna < this.alto; columna += TAMAÑO) {
            	let x = fila + RADIO + MARGEN ;
            	let y = columna + RADIO + MARGEN  ;
               	let ficha = new Ficha(x, y, BLANCO, this.ctx);
               	ficha.dibujarFicha();
            }
        }
	}
	
	// Se fija si la posicion se encuentra ocupada o "limpia".
	llenaColumna(vector, columna) {
		if (vector[columna] == VALORVACIO)
			return false;
		else
			return true;
	}

    // Se fija si todas las primeras posiciones han sido usadas.
	tableroLleno(vector) {
		let lleno= true;
		let columna= 0;
		while ((columna < vector.length) && lleno  )
		{
			lleno=llenaColumna(vector,  columna);
			columna++;
		}
		return lleno;
	}

    //Pone una ficha en el tablero en una fila y columna de la matriz
	meterFicha(matriz, fila,columna, ficha) {
		matriz[fila][columna]= ficha;

	}
	
	//Retorna la ultima ubicacion en blanco de una columna.
	filaUbicacion(matriz, columna) {
		let i =0;
		while ((i < matriz.length ) && (matriz[i][columna] == VALORVACIO))
		{	i++;}
		if (i !=0)
			return (i-1);
		else
			return 0;

		return (matriz[i][columna] == VALORVACIO) ? i : -1;
	}
	
	//Para un jugador tipo maquina, elige una columna no llena al azar para tirar una ficha.
	movimientoAzar(vector) {
        //Crea un movimiento al azar
		let movimiento=  parseInt( (Math.random() * vector.length ));
		//Controla que no esta generando un movimiento en una columna llena
        while ( llenaColumna(vector, movimiento) )
        	movimiento=  parseInt( (Math.random() * vector.length ));
		return movimiento;
	}

}//Fin de la clase
