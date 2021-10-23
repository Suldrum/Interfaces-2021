const MAX_COINS = 3;
const MAX_PIPES = 3;

class Game {
    constructor(bird) {
        this.div = document.getElementById("body");
        this.divCoins =document.getElementById("coins");
        this.divPipes =document.getElementById("pipes");
        this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
        this.bird = bird;
        this.pipes = [];
        this.coins = [];
        this.score = 0;
        this.interval;
        this.updateScore();
    }

    createElements()
    {
        for (let index = 0 ; index <  MAX_COINS; index++)
        {
            this.createCoin(index);
        }

        for (let index = 0 ; index < MAX_PIPES ; index++)
        {
            this.createPipe(index);
        }
    }
    createCoin(index){ 
        let newDiv = document.createElement("div");
        let newDivID = "coin"+index;
        newDiv.setAttribute("id",newDivID);
        this.divCoins.appendChild(newDiv);
        this.coins[index] = new Coin (newDivID,"coin","moveCoinToLeft",(Math.random() * 3 + 2 )+ 10 * (index + 1));
    }

    createPipe(index){
        //Tuberia de arriba
        let newUpDiv = document.createElement("div");
        let newUpID= "pipeUp"+index;
        newUpDiv.setAttribute("id",newUpID);
        this.divPipes.appendChild(newUpDiv);
        let pipeUp = new ObjetoInteractivo(newUpID,"pipeUp","movePipeToLeft", 10 * (index + 1));
        //Tuberia de abajo
        let newDownDiv = document.createElement("div");
        let newDownID= "pipeDown"+index;
        newDownDiv.setAttribute("id",newDownID);
        this.divPipes.appendChild(newDownDiv);
        let pipeDown =new ObjetoInteractivo(newDownID,"pipeDown","movePipeToLeft", 10 * (index + 1));
        //Nuevo Obstaculo
        this.pipes[index] = new Pipe (pipeUp,pipeDown, this.bird.height);
    }

    //Control de si toca alguna moneda
    checkCoins(){  
        for (let index = 0 ; index < this.coins.length ; index++)
        {
            if (this.coins[index].isOutScreen())
            {
                this.coins[index].reset(index,(this.width+this.coins[index].width+10));
            } 
            if(this.coins[index].touched)
            {  
                this.score+= this.coins[index].getValue();
                this.coins[index].setValue(0);
                this.updateScore();
                
            }
            else
            {
                this.coins[index].isTouch(this.bird,parseInt(this.coins[index].getPositionLeft()));
            }
           
        }
    }

    //Control de si toca alguna cañeria
    checkPipes(){
        for (let index = 0; index < this.pipes.length; index++) {
            if (this.pipes[index].isOutScreen())
            {
                this.pipes[index].reset();
            } 
            if(this.pipes[index].passed)
            {  
                this.score+= this.pipes[index].getValue();
                this.pipes[index].setValue(0);
                this.updateScore();
            }
            else
            {
                if (this.pipes[index].isTouch(this.bird))
                {           
                    this.bird.changeStateClass("dying");
                    this.endGame(false);
                    break;
                }
                else
                {this.pipes[index].checkPass(this.bird);}
            }
        }
    }

    initGame() {
        this.createElements();
        this.interval = setInterval(this.loop.bind(this), 16.6);

    }

    updateScore(){
        document.getElementById("score").innerHTML = this.score;
    }
    loop() {
       
        if (this.score >= 50) {
            this.bird.changeStateClass("flying");
            this.endGame(true);
        }
        this.checkCoins();
        this.checkPipes();
    }

    endGame(victory) {
        clearInterval(this.interval);
        this.stopAllAnimation();
        document.getElementById('reset').hidden = false;
        if (victory)
        {
            alert("¡Felicidades has ganado!");
        }
        else
        {
            alert("¡Oh no! Intentalo otra vez");
        }
    }

    //Detiene todas las animaciones
    stopAllAnimation(){
     
        for (let index  = 0; index  < MAX_PIPES; index++) {
            this.pipes[index].stopAnimation();
        }
        
        for (let index = 0; index  < MAX_COINS; index++) {
            if ( this.coins[index].getStateClass() === "moveCoinToLeft")
            {
                this.coins[index].stopAnimation(parseInt(this.coins[index].getPositionLeft()));
            }
        }
    }
}