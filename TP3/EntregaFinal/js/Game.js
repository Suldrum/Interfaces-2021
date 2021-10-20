class Game {
    constructor(bird) {
        this.div = document.getElementById("body");
        this.bird = bird;
        this.delay = 2;
        this.pipes = [];
        this.coins = [];
        this.score = 0;
        this.intervalCreation;
        this.interval;

    }

    createCoin(){ 
        let newDiv = document.createElement("div");
        let newDivID = "coin"+this.coins.length;
        newDiv.setAttribute("id",newDivID);
        this.div.appendChild(newDiv);
        let coin = new Coin (newDivID,"coin","moveCoinToLeft",(Math.random() * 5 ) +this.delay);
        this.coins.push(coin);
    }

    //Elimino la moneda
    deleteCoin(coin){
        this.coins.splice(coin, 1);
      //  this.div.removeChild(coin.div);
    }

    //Control de si toca alguna moneda
    touchCoin(){
        let i=0;
        while (i < this.coins.length)
        {      
            if(this.coins[i].taked )
            { 
                this.score+= this.coins[i].getValue();
                this.deleteCoin(this.coins[i]);
            }else
            {
                this.coins[i].isTouch(this.bird);
                i++;
            }    
        }
    }

    createPipe(){}

    deletePipe(pipe){this.pipes.splice(pipe, 1);}

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

    //Elimina todo los objetos que dejaron de ser visibles
    deleteOutScreen(){
        let i=0;
        while (i < this.coins.length)
        {
            if(this.coins[i].isOutScreen())
            {
                this.deleteCoin(this.coins[i]);
            }else{
                i++;
            }
        }
        i=0;
        while (i < this.pipes.length)
        {
            if(this.pipes[i].isOutScreen())
            {
                this.deleteCoin(this.coins[i]);
            }else{
                i++;
            }
        }
    }
    initGame() {
        this.createCoin();
        this.createCoin();
        this.createCoin();
        this.interval = setInterval(this.loop.bind(this), 16.6);

    }

    loop() {

        if (this.score >= 50) {
            this.endGame();
        }
/*
        if (this.coins.length < 3)
        {
           // setTimeout(function(){game.createCoin();}, 3000);
           this.createCoin();
        }
      
       */
        this.touchCoin();
      //  this.touchPipe();
       // this.deleteOutScreen(); //NO ESTA FUNCIONANDO CORRECTAMENTE...creo

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