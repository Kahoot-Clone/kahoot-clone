class Players{
    constructor(pin){
        this.pin = pin;
        this.players = [];
        this.playerCounter = 1;
    }

    addPlayer(name){
        let player = {
            id: this.playerCounter++,
            name: name,
            score: []
        }
        return this.players.push(player)
    }

    totalScore(){
        return this.score.reduce((a,b)=>a+b);
    }

    currentQuestionScore(){
        return this.score[this.score.length-1]
    }



    addPlayerId(id){
        this.id = id;
    }

    



    
}