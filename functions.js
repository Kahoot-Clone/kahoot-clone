let players = [];
let questions = [{correctanswer:3}]

module.exports ={
  sum: (num1, num2) => {
    return num1 + num2
  },
  generatePin: () => {
    let newPin = Math.floor(Math.random() * 9000, 10000)
    return newPin;
  }, 
  addPlayer:(name, id) => {
    let player = {
        id: id, // this is now their socket id so they can pull their score to the player component using this
        name: name,
        score: 0,
        qAnswered: false,
        answeredCorrect: false
    }
    let newPlayers = [...players];
    newPlayers.push(player);
    players = newPlayers;
    return players
  },
  submitAnswer:(name, answer) => {
    let player = players.filter(player => player.name === name);
    let updatedPlayers = players.filter(player => player.name !== name);
    
    player[0].qAnswered = true;
    answer === questions[0].correctanswer
        ?player[0].answeredCorrect = true
        :player[0].answeredCorrect = false

    players = updatedPlayers.push(player[0])
    return players  
  },
  handleNicknameInput: (e) => {
    let nickname = ''
    nickname = e
    return nickname   
    }
}
