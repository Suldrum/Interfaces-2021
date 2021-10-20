class Game {
    constructor(bird) {
        this.div = document.getElementById("body");
        this.divCoins =document.getElementById("coins");
        this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
        this.bird = bird;
        this.pipes = [];
        this.coins = [3];
        this.score = 0;
        this.interval;

    }

    createCoins()
    {
        for (let index = 0 ; index < 3 ; index++)
        {
            this.createCoin(index);
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

    //Control de si toca alguna moneda
    touchCoin(){  
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
        this.createCoins();
        this.interval = setInterval(this.loop.bind(this), 16.6);

    }

    loop() {
       
        if (this.score >= 50) {
            this.endGame();
        }
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