let lang = []
lang['ru'] = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница']
lang['en'] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

let langUser = prompt('Выберете язык', 'en')
console.log(lang[langUser])

if (langUser === 'en') {
  console.log(lang['en'])
} else if (langUser === 'ru') {
  console.log(lang['ru'])
} else {
  console.log('что-то не так')
}

switch (langUser) {
  case 'en':
    console.log(lang['en'])
    break
  case 'ru':
    console.log(lang['ru'])
    break
  default:
    console.log('что-то не так')
}
let namePerson = prompt('Введите имя', 'Артем').toLowerCase()

console.log(namePerson === 'артем' ? 'директор' : namePerson === 'максим' ? 'преподаватель' : 'студент')