'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Pipe {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div,div2, baseClass, baseClass2, stateClass,delay,space) {
		this.upObstacle = new ObjetoInteractivo(div, baseClass, stateClass,delay);
		this.downObstacle = new ObjetoInteractivo(div2, baseClass2, stateClass,delay);	
		this.space = space * 2;
		//La altura maxima de cada obstaculo sera el tamaño de la imagen original menos el espacio para el ave dividio 2
		this.maxHeight= (618 - this.space) / 2;
		this.value= 1;
		this.passed = false;
		this.setAltitudes();
	}

	getValue(){return this.value ;}
	setValue(value){this.value = value;}

	isOutScreen(){
        let object = this.upObstacle.getPositionData();
        return (object.left < (0 - (object.width + 5)) ) ;

    }

	checkPass(bird){
		let thisData = this.upObstacle.getPositionData();
		let birdData = bird.getPositionData();
		if (birdData.left > (thisData.right + 5) )
			{this.passed = true;}
		
	}
	//modifica el la altura de los obstaculos <- solo esta modificando arriba pero no abajo, esto no es optimo
	setAltitudes(){
		let newHeight = (Math.random() * this.maxHeight) ;
		this.setHeight(this.upObstacle,newHeight);
		this.setHeight(this.downObstacle,newHeight+this.maxHeight);
	}
    //Esto se cambiara a Math random
    setHeight(obstacle,height){
        obstacle.div.style.height= height+ "px";
    }
	//si toco alguno de los obstaculos
	isTouch(bird){
		return this.upObstacle.isTouch(bird) || this.downObstacle.isTouch(bird);
	}

	//resetea las alturas para seguir reutilizando
	reset(){
		this.setValue(1);
		this.passed = false;
		this.setAltitudes();
	}

	stopAnimation(){
		this.upObstacle.stopAnimation();
		this.downObstacle.stopAnimation();
	}
} //FIN DE LA CLASE
