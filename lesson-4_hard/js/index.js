const reduction = str => {
  // но поскольку мы вызываем функцию через шаблонные строки, то можно избавится от этой проверки. так как в любом
  // случае аргумент будет строкой
  if (typeof str[0] !== 'string') {
    throw Error('Была переданна не строка!')
  }
  const newStr = str[0].trim()

  return newStr.length > 30
    ? newStr.slice(0, 30) + '...'
    : newStr
}

console.log(reduction`   это какая-то произвольная строка, любой длины, с любым количеством пробелов    `)
