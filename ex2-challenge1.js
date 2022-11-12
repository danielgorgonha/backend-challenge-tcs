/*
 * Crie um ORM usando Javascript ou Typescript que satisfaça os seguintes comandos:
 * getTables: [ 'users' ]
 * insert: { id: 1, name: 'John Doe', email: 'john.doe@email.com' }
 * insert: { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' }
 * getAll: [
 *   { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
 *   { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' }
 * ]
 * delete: { id: 1, name: 'John Doe', email: 'john.doe@email.com' }
 * getAll: [ { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' } ]
 * Você pode e deve criar algumas quantas classe quiser para fazer seu código funcionar
 *
 * *************
 * *** BONUS ***
 * *************
 * update: { id: 2, name: 'Jane Doe Updated', email: 'jane.doe@email.com' }
 * getAll: [ { id: 2, name: 'Jane Doe Updated', email: 'jane.doe@email.com' } ]
 * insert: Invalid: e-mail não pode ser nulo
 * insert: Invalid: nome deve ser string
 * insert: Invalid: nome deve ser string
 *
 * *************
 * *** INFORMAÇÃO IMPORTANTE ***
 * *************
 * Você poderá alterar o código que achar necessário para atender as necessidades requisitadas
 */

const tables = new Map([])

class Table {
  constructor(collectionName, model) {
    this.collectionName = collectionName
    this.model = model

    tables.set(collectionName, {
      schema: this.model,
      docs: []
    })
  }

  insert(data) {
    let { docs } = tables.get(this.collectionName)
    docs.push({
      id: docs.length + 1,
      ...data,
    })
  }
  get(id) {
    const { docs } = tables.get(this.collectionName)
    return docs.find(data => data.id == id)
  }

  getAll() {
    const { docs } = tables.get(this.collectionName)
    console.log('getAll:', docs)
  }

  delete(id) {
    let { docs } = tables.get(this.collectionName)
    const result = docs.filter((doc) => doc.id == id)
    for (const element of result) {
      const index = docs.indexOf(element)
      docs.splice(index, 1)
    }
  }

  update(id, data) {
    let { docs } = tables.get(this.collectionName)
    let index = docs.findIndex(element => element.id == id)
    docs[index] = {
      ...docs[index],
      ...data,
    }
    console.log('update:', docs[index])
  }

  getSchema() {
    const { schema } = tables.get(this.collectionName)
    return schema
  }
}

class ORM extends Table {

  // Seu código vai aqui:
  constructor(collectionName, model) {
    super(collectionName, model)
  }

  insertData(inputData) {
    const error = this._validate(inputData)
    if (error.length > 0) {
      console.log(error)
      return
    }
    console.log('insert:', inputData)
    this.insert(inputData)
  }

  findAll() {
    this.getAll()
  }

  deleteData(id) {
    console.log('delete:', this.get(id))
    this.delete(id)
  }

  updateData(id, inputData) {
    const error = this._validate(inputData, false)
    if (error.length > 0) {
      console.log(error)
      return
    }
    this.update(id, inputData)
  }

  _validate(data, insert = true) {
    let error = ''

    const schema = this.getSchema()
    delete schema.id

    Object.entries(schema).forEach(([key, value]) => {
      const atr = Object.keys(data)
      const { type, notNull } = value

      if (insert && notNull && !atr.includes(key)) {
        error = `Invalid: ${key} não pode ser nulo`
      }
      if (atr.includes(key) && typeof data[key] !== type) {
        error = `Invalid: ${key} deve ser ${type}`
      }

    })

    return error
  }
}

const Users = new ORM('users', {
  id: { type: 'integer', primaryKey: true, autoIncrement: true },
  name: { type: 'string', notNull: true },
  email: { type: 'string', notNull: true },
})

// Seu código vai aqui:

console.log('')

console.log('*************')
console.log('*** Users ***')
console.log('*************')

console.log('')

console.log('getTables:', tables)
console.table(tables)

console.log('')

Users.insertData({
  name: 'John Doe',
  email: 'john.doe@email.com'
})
Users.findAll()
Users.insertData({
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
})
Users.findAll()
Users.deleteData(1)
Users.findAll()
Users.updateData(2, {
  name: 'Jane Doe Updated'
})
Users.findAll()
Users.insertData({
  name: 'Daniel',
})
Users.insertData({
  name: 123,
  email: 'renata@email.com'
})
Users.insertData({
  name: [2,4],
  email: 'dayane@email.com'
})

console.log('')
console.log('******************')
console.log('*** Categories ***')
console.log('******************')
console.log('')

console.log('getTables:', tables)
console.table(tables)
console.log('')

const Categories = new ORM('categories', {
  id: { type: 'integer', primaryKey: true, autoIncrement: true },
  cep: { type: 'string', notNull: true },
  street: { type: 'string', notNull: true },
  complement: { type: 'string', notNull: false },
  number: { type: 'number', notNull: true }
})

Categories.insertData({
  cep: '88040600',
  street: 'rua W',
  number: 601
})
Categories.getAll()

console.log('')
console.log('***********************')
console.log('*** All Collections ***')
console.log('***********************')
console.log('')

console.log('getTables:', tables)
console.table(tables)