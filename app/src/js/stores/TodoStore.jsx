import { EventEmitter } from 'events'
import dispatcher from '../dispatcher.jsx'

class TodoStore extends EventEmitter {
  constructor() {
    super()

    this.todos = [
      {
        id: 76165714514,
        text: "Go shopping",
        complete: false
      },
      {
        id: 76165714544,
        text: "Go parking",
        complete: false
      }
    ]

    this.destinations = []
  }

  setDestinations(data) {
    this.destinations = data

    this.emit('change')
  }

  createItem(text) {
    let id = Date.now()

    this.todos.push({
      id,
      text,
      complete: false
    })

    this.emit('change')
  }

  deleteItem(id) {
    console.log('deleting item ID:', id)
  }

  getAll() {
    return this.todos
  }

  getDestinations() {
    return this.destinations
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_ITEM':
        this.createItem(action.text)
        break;
      case 'DELETE_ITEM':
        this.deleteItem(action.id)
        break;
      case 'GET_DESTINATIONS':
        this.setDestinations(action.data)
        break;
    }
    console.log('Todostore received an action:', action)
  }
}

const todoStore = new TodoStore

dispatcher.register(todoStore.handleActions.bind(todoStore))
window.dispatcher = dispatcher

export default todoStore
