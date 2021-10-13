'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Impedir que inicie un nuevo juego si ya hay uno activo, deberia controlarse en otra clase
 */

class Reloj
{

	constructor (tiempo)
	{
		this.tiempo = tiempo *60;
		this.minutos= tiempo;
		this.segundos= 0
		this.intervalo;
		
	}
	//Funcion encargada de iniciar el intervalo y llevar actualizado el reloj en el HTML
	iniciar(){
			let reloj = document.getElementById("reloj");
			//Carga del valor inicial del reloj
			reloj.innerHTML=(this.minutos)+":00";
			//Inicia el la recursion
			this.intervalo = setInterval(() => {

				this.tiempo--;
				//Si se llego a 0 segundos resto un minuto
				if (this.segundos == 0)
				{
					this.segundos = 59;
					this.minutos --;
					reloj.innerHTML=this.minutos+":"+this.segundos;
					
				}else
					{
						this.segundos -- ;
						//Control para mejorar la visualizacion de los segundos
						if (this.segundos < 10)
						{reloj.innerHTML=this.minutos+":0"+this.segundos;}
						else{reloj.innerHTML=this.minutos+":"+this.segundos;}
				}
				//Cuando se termino el tiempo termina el juego
				if (this.tiempo <= 0)
					juego.terminar(false);
			  }, 1000);
	}
	//Limpia el intervalo para frenar el reloj
	terminar(){
		clearTimeout(this.intervalo);
	}


}
 

