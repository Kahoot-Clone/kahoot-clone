module.exports ={
  sum: (num1, num2) => {
    return num1 + num2
  },
  generatePin: () => {
    let newPin = Math.floor(Math.random() * 9000, 10000)
    return newPin;
}
}