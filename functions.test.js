const fn = require('./functions');

test('adds 1 + 2 to equal 3', () => {
  expect(fn.sum(1, 2)).toBe(3);
});

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