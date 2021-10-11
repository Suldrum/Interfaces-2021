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

	iniciar(){
			let reloj = document.getElementById("reloj");
			reloj.innerHTML=(this.minutos)+":00";
			this.intervalo = setInterval(() => {
				this.tiempo--;
				if (this.segundos == 0)
				{
					this.segundos = 59;
					this.minutos --;
					reloj.innerHTML=this.minutos+":"+this.segundos;
					
				}else
					{
						this.segundos -- ;
						if (this.segundos < 10)
						{reloj.innerHTML=this.minutos+":0"+this.segundos;}
						else{reloj.innerHTML=this.minutos+":"+this.segundos;}
				}
				if (this.tiempo <= 0)
					juego.terminar(false);
			  }, 1000);
	}
	terminar(){
		clearTimeout(this.intervalo);
	}


}
 

