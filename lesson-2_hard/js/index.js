const num = 266219
console.log(+(('' + num).split('').reduce((acc, crr) => acc * crr) ** 3 + '').slice(0, 2))
