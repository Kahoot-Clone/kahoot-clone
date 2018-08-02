const fn = require('./functions');

describe('Game Methods', () => {
  test('Should return a truthy value', () => {
    expect(fn.generatePin()).toBeTruthy()
  })
  test('Should return number greater than 0', () => {
    expect(fn.generatePin()).toBeGreaterThan(0)
  })
  test('Should return number less than 10000', () => {
    expect(fn.generatePin()).toBeLessThan(10000)
  })
  test('Should not return NaN', () => {
    expect(fn.generatePin()).not.toBe(NaN)
  })
  test('Should not return "I like green eggz and ham"', () => {
    expect(fn.generatePin()).not.toBe('I like green eggz and ham')
  })
})

describe('Adding player Method', () => {
  let players = fn.addPlayer('dill', 789)
  test('Should return anything', () => {
    expect(fn.addPlayer('dill', 123)).toBeTruthy()
  })
  test('Should be an array', ()=> {
    expect(fn.addPlayer('dill', 456)).arrayContaining
  })
  test('Should resolve', () => {
    expect(fn.addPlayer('dill', 456)).resolves
  })
  test('Should add name to player', () => {
    expect(players[0].name).toBe('dill')
  })
  test('Should start false', () => {
    expect(players[0].qAnswered).toBeFalsy()
  })
  test('Should start false', () => {
    expect(players[0].answeredCorrect).toBeFalsy()
  })
})

// describe('Submit Answer Method', () => {
//   let players = fn.addPlayer('bill', 789)
//   let submit = fn.submitAnswer('bill', 3)
  
// })

describe('Submit Nickname Method', () => {
  test('Should return a truthy value', () => {
    expect(fn.handleNicknameInput("Ryan")).toBeTruthy()
  })
  test('Should be a string value', () => {
    expect(fn.handleNicknameInput('Ryan')).toBe('Ryan')
  })
  test('Should not return NaN', () => {
    expect(fn.handleNicknameInput()).not.toBe(NaN)
  })
  test('Should not return undefined', () => {
    expect(fn.handleNicknameInput("ryan")).not.toBe(undefined)
  })
  test('Should not return Falsy value', () => {
    expect(fn.handleNicknameInput("Ryan")).not.toBeFalsy()
  })
})