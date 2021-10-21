'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Bird extends Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, baseClass, stateClass) {
		super(div, baseClass, stateClass);
	}

	//Actualiza la posicion del ave
	updatePosition()
	{
		this.div.style.top= parseInt(this.getPositionTop()) + "px";
	}

	//Actualiza la posicion y cambia la animacion
	changeStateClass(stateClass){
		//Actualiza para que la animaciones continuen desde el punto posicion actual
		this.updatePosition();
		//Cambio de animacion
		super.changeStateClass(stateClass);	
	}
} //FIN DE LA CLASE
