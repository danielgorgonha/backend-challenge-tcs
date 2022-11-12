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

const tables = []
let count = 0

class Table {
  constructor(name, model) {
    this.name = name
    this.data = []
  }

  insert(data) {
    this.data.push({
      id: count + 1,
      name: data.name,
      email: data.email
    })
    count = count + 1
  }
  get(id) {
    return this.data.find(data => data.id == id)
  }

  getAll() {
    console.log('getAll:', this.data)
  }

  delete(id) {
    this.data = this.data.filter(element => element.id != id)
    count = count - 1
  }

  update(id, data) {
    let index = this.data.findIndex(element => element.id == id)
    this.data[index].name = data.name
    console.log('update:', this.data[index])
  }
}

class ORM extends Table {
  // Seu código vai aqui:
  createTable(collectionName, model) {
    new ORM(collectionName, model)
    tables.push(collectionName)
    console.log('getTables:', tables)
  }

  insertData(inputData) {
    if (typeof inputData.name !== 'string') {
      console.log('Invalid: nome deve ser string')
      return
    }
    if (!inputData.email) {
      console.log('Invalid: e-mail não pode ser nulo')
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
    this.update(id, inputData)
  }
}

const orm = new ORM()

orm.createTable('users', {
  id: { type: 'integer', primaryKey: true, autoIncrement: true },
  name: { type: 'string', notNull: true },
  email: { type: 'string', notNull: true },
})

// Seu código vai aqui:

orm.insertData({
  name: 'John Doe',
  email: 'john.doe@email.com',
})
orm.insertData({
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
})
orm.findAll()
orm.deleteData(1)
orm.findAll()
orm.updateData(2, {
  name: 'Jane Doe Updated'
})
orm.findAll()
orm.insertData({
  name: 'Daniel',
})
orm.insertData({
  name: 123,
  email: 'renata@email.com'
})
orm.insertData({
  name: [2,4],
  email: 'dayane@email.com'
})
orm.findAll()