'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 */
 const COLOR = "#008080";
 const BLANCO = "#FFFFFF";

class Tablero extends Cuadrado{

	//Crea un nuevo tablero en blanco de tamaño fila x columna
	constructor(x,y,canvas,ancho,alto){
		super(x,y,COLOR,canvas.getContext('2d'),(ancho * TAMAÑO),(alto * TAMAÑO + TAMAÑO));
		canvas.width = this.ancho+ 6 * TAMAÑO ;
		canvas.height= this.alto +  TAMAÑO;
		//Vector lector de entrada
		this.vector = [ancho];
		//Matriz donde se guarda la informacion del tablero
		this.matriz = [alto];
		for (let fila = 0; fila < alto ; fila++) {
			this.matriz[fila] = [ancho];
		}
    }

	dibujarFondo(){
		super.dibujar();
	}

	dibujarEntrada(){

		let imagen =  document.getElementById("flecha");
		let i = 0;
		for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
			let flecha = new Cuadrado(columna,this.y,COLOR,this.ctx,TAMAÑO,TAMAÑO);
			this.vector[i] = flecha;
			i++;
			flecha.dibujarImagen(imagen);
		}
		
	}

	//Dibuja circulos blancos
	dibujarEspaciosLibres(){
		let i=0,j = 0;
		for (let fila = this.y+TAMAÑO; fila < (this.alto+this.y); fila += TAMAÑO) {
			j= 0;
			for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
            	let x = columna + RADIO + MARGEN ;
            	let y = fila + RADIO + MARGEN  ;
               	let ficha = new Circulo(x, y, BLANCO, this.ctx);
               	ficha.dibujar();
				this.matriz[i][j] = ficha;
				j++;
				
            }
			i++;
        }
	}

	dibujarDefault()
	{
		this.dibujarFondo();
		this.dibujarEntrada();
		this.dibujarEspaciosLibres();
	}
	
	//Dibuja las fichas que estan en la matriz
	dibujarFichasEnTablero()
	{
		let i=0,j = 0;
		for (let fila = this.y+TAMAÑO; fila < (this.alto+this.y); fila += TAMAÑO) {
			j= 0;
			for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
               	let ficha = this.matriz[i][j];
               	ficha.dibujar();
				j++;
            }
			i++;
        }
	}

	actualizarTablero(){
		this.dibujarFondo();
		this.dibujarEntrada();
		this.dibujarFichasEnTablero();
	}

	// Se fija si la posicion se encuentra ocupada o "limpia".
	espacioLibre(vector, columna) {
		if (vector[columna].getColor() === BLANCO)
			return false;
		else
			return true;
	}

	tableroLleno()
	{
		let columna= 0;
		while ((columna < this.ancho) && (espacioLibre(this.matriz[0], columna)) )
		{
			
			columna++;
		}
		return columna == this.ancho;
	}

    //Pone una ficha en el tablero en una fila y columna de la matriz
	meterFicha(fila,columna, ficha) {
		this.matriz[fila][columna]= ficha;
		//ficha.dibujarFicha();
	}
	
	//Retorna la ultima ubicacion en blanco de una columna.
	filaUbicacion(columna) {
		//Si tengo al menos un espacio libre
		if (this.espacioLibre(this.matriz[0], columna))
		{
			let i =0;
			while ((i < this.matriz[i].length ) && (espacioLibre(this.matriz[i], columna)))
			{	i++;}
			return (i!=0) ? (i - 1) : 0 ; 
		}
		else
		{
			return -1;
		}
	}
	
	//Para un jugador tipo maquina, elige una columna no llena al azar para tirar una ficha.
	movimientoAzar() {
        //Crea un movimiento al azar
		let movimiento=  parseInt( (Math.random() * this.matriz[0].length ));
		//Controla que no esta generando un movimiento en una columna llena
        while ( llenaColumna(this.matriz[0], movimiento) )
        	movimiento=  parseInt( (Math.random() * this.matriz[0].length ));
		return movimiento;
	}

	tamañoTablero()
	{
		
		return this.matriz.length * this.matriz[0].length;
	}

	sobreFlecha(x,y)
	{
		let cont= 1;
		for (let i = 0; i < this.vector.length; i++) {	
			if (this.vector[i].esClickeada(x,y)) 
			{
				filaCaida=cont;
				return true; 
			}
			cont++;
		}
		
		filaCaida = -1;
		return false;
	}
}//Fin de la clase
