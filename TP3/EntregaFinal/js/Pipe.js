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
		//239
		
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
		if (birdData.left > (thisData.right + 3) )
			{this.passed = true;}
		
	}
	//modifica el la altura de los obstaculos <- solo esta modificando arriba pero no abajo, esto no es optimo
	setAltitudes(){
		let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		let newHeight = Math.floor((Math.random() * this.maxHeight));
		if (plusOrMinus >0)
		{
			this.setHeight(this.upObstacle,(this.maxHeight - newHeight));
			this.setHeight(this.downObstacle,(this.maxHeight + newHeight));
		}
		else{
			this.setHeight(this.upObstacle,(this.maxHeight + newHeight));
			this.setHeight(this.downObstacle,(this.maxHeight - newHeight));
		}
	}
    //Esto se cambiara a Math random
    setHeight(obstacle,height){
	//	console.log(height);
       obstacle.div.style.height = height+ "px";
	   //obstacle.div.style.height= -80+ "px";
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
	//	this.upObstacle.removeDelay();
	//	this.upObstacle.setLeft(parseInt(this.upObstacle.getPositionLeft()));
		this.upObstacle.stopAnimation();

	//	this.downObstacle.removeDelay();
	//	this.downObstacle.setLeft(parseInt(this.downObstacle.getPositionLeft()));
		this.downObstacle.stopAnimation();
	}
} //FIN DE LA CLASE
