class Game {
    constructor(bird) {
        this.div = document.getElementById("body");
        this.divCoins =document.getElementById("coins");
        this.divPipes =document.getElementById("pipes");
        this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
        this.bird = bird;
        this.pipes = [3];
        this.coins = [3];
        this.score = 0;
        this.interval;

    }

    createElements()
    {
        for (let index = 0 ; index < 3 ; index++)
        {
        //    this.createCoin(index);
            this.createPipe(index);
        }
    }
    createCoin(index){ 
        let newDiv = document.createElement("div");
        let newDivID = "coin"+index;
        newDiv.setAttribute("id",newDivID);
        this.divCoins.appendChild(newDiv);
        this.coins[index] = new Coin (newDivID,"coin","moveCoinToLeft",(Math.random() * 5 )+ 16 * index);
        //this.coins.push(coin);
    }

    createPipe(index){
        //constructor(div,div2, baseClass, baseClass2, stateClass,delay,space)
        /*		this.upObstacle = new ObjetoInteractivo(div, baseClass, stateClass,delay);
		this.downObstacle = new ObjetoInteractivo(div2, baseClass2, stateClass,delay);	
        */
        let newUpDiv = document.createElement("div");
        let newDownDiv = document.createElement("div");
        let newUpID= "pipeUp"+index;
        let newDownID= "pipeDown"+index;
        newUpDiv.setAttribute("id",newUpID);
        newDownDiv.setAttribute("id",newDownID);
        this.divPipes.appendChild(newUpDiv);
        this.divPipes.appendChild(newDownDiv);
        this.pipes[index] = new Pipe (newUpID, newDownID,"pipeUp","pipeDown","movePipeToLeft",+ 10 * (index + 1),this.bird.width);
    }

    //Control de si toca alguna moneda
    checkCoins(){  
        for (let index = 0 ; index < 3 ; index++)
        {
            if (this.coins[index].isOutScreen())
            {
                this.coins[index].reset(index,(this.width+this.coins[index].width+10));
            } 
            if(this.coins[index].touched)
            {  
                this.score+= this.coins[index].getValue();
                this.coins[index].setValue(0);
                
            }
            else
            {
                this.coins[index].isTouch(this.bird);
            }
           
        }
    }




    //Control de si toca alguna cañeria
    touchPipe(){
        for (let i = 0; i < this.pipes.length; i++) {
            if (this.pipes[i].isTouch(bird)) {
                this.endGame();
            } 
            else 
            {
                if (this.obstacles[i].isPassed(this.bird)){
                    this.score+=1;
                    this.deletePipe(this.pipes[i]);
                }
            }
        }
    }

    initGame() {
        this.createElements();
    //    this.createPipe();
        this.interval = setInterval(this.loop.bind(this), 16.6);

    }

    loop() {
       
        if (this.score >= 50) {
            this.endGame();
        }
    //    this.checkCoins();
     //   this.checkPipe();
      

    }

    endGame() {
        this.stopAllAnimation();
        //this.reset();
        clearInterval(this.interval);
    }

    reset() {
        this.stopAllAnimation();
        this.pipes = [];
        this.coins = [];
        this.score = 0;
    }

    //Detiene todas las animaciones
    stopAllAnimation(){
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].stopAnimation();
        }
        for (let i = 0; i < this.coins.length; i++) {
            if ( this.coins[i].getStateClass() === "moveCoinToLeft")
                {this.coins[i].changeStateClass("rotating");}
        }
    }
}