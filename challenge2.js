/*
* Baseado no array abaixo, complete o código para atender as saídas definidas via console log
* *******
* IMPORTANTE:
* *******
* O código original não poderá ser alterado
*/
const users = [
  {
    name: 'José',
    birthDate: '2000-08-09'
  },
  {
    name: 'Stephan',
    birthDate: '1997-01-01'
  },
  {
    name: 'Carlos',
    birthDate: '2005-10-22'
  },
  {
    name: 'Maria',
    birthDate: '1991-03-15'
  },
  {
    name: 'José',
    birthDate: '2000-08-09'
  },
  {
    name: 'Peter',
    birthDate: '1995-05-21'
  },
  {
    name: 'Moe',
    birthDate: '1993-07-21'
  },
  {
    name: 'Stephan',
    birthDate: '1997-01-01'
  },
  {
    name: 'Alberto',
    birthDate: '1989-06-08'
  },
  {
    name: 'Henry',
    birthDate: '2002-07-29'
  },
  {
    name: 'Paulo',
    birthDate: '1995-04-14'
  },
  {
    name: 'Alberto',
    birthDate: '1989-06-08'
  },

]

// Seu código vai aqui
const sortedByName = users
  .sort((userA, userB) => userA.name < userB.name ? -1 : userA.name > userB.name ? 1 : 0)
const usersWithAge = users.map((user) => {
  const calcAge = (birthDate) => {
    const yearCurrent = new Date().getFullYear()
    return yearCurrent - Number(birthDate.split('-')[0])
  }

  return {
    name: user.name,
    age: calcAge(user.birthDate)
  }
})
const setUniqueObjs = new Set();
const uniqueObjs = users.filter((user) => {
  const duplicatedObjs = setUniqueObjs.has(user.name)
  setUniqueObjs.add(user.name)
  return !duplicatedObjs 
})
const youngestUser = usersWithAge.find((user) => {
  const checkYoungerAge = usersWithAge
    .map(user => user.age).reduce((prevAge, nextAge) => Math.min(prevAge, nextAge))
  return checkYoungerAge === user.age
})

console.log('ORDENADO:', sortedByName)
console.log('IDADE:', usersWithAge)
console.log('ÚNICO:', uniqueObjs)
console.log('MAIS NOVO:', youngestUser)
