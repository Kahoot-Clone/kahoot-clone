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

    totalScore(playerId){
        return this.score.reduce((a,b)=>a+b);
    }

    currentQuestionScore(playerId){
        this.players.indexOf({id:player})
        return this.score[this.score.length-1]
    }
    
}