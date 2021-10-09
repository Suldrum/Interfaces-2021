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

class Tablero extends Objeto{

	//Crea un nuevo tablero en blanco de tamaño fila x columna
	constructor(x,y,canvas,ancho,alto){
		super(x,y,canvas.getContext('2d'));

		this.ancho = ancho * TAMAÑO; 
		this.alto = alto * TAMAÑO + TAMAÑO;
		canvas.width = this.ancho+ 6 * TAMAÑO ;
		canvas.height= this.alto +  TAMAÑO;
		//Matriz donde se guarda la informacion del tablero
		this.matriz = [alto];
		for (let fila = 0; fila < alto ; fila++) {
			this.matriz[fila] = [ancho];
		}
    }

	dibujarFondo(){
		//Dibuja el rectangulo
		this.ctx.fillStyle = COLOR;
		this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.closePath();
	}

	dibujarEntrada(){

		let imagen =  document.getElementById("flecha");
		for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
			this.ctx.drawImage(imagen, columna, this.y, TAMAÑO, TAMAÑO);
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
               	let ficha = new Ficha(x, y, BLANCO, this.ctx);
               	ficha.dibujarFicha();
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
               	ficha.dibujarFicha();
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
}//Fin de la clase
