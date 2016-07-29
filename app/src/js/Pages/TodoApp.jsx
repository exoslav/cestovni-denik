import React from 'react'
import ReactDOM from 'react-dom'
import TodoItem from './TodoItem.jsx'
import actions from '../actions/TodoActions.jsx'
import TodoStore from '../stores/TodoStore.jsx'
import * as TodoActions from '../actions/TodoActions.jsx'

export default class TodoApp extends React.Component {
  constructor() {
    super()
    this.destinationsURL = 'https://www.studentagency.cz/opencms/opencms/shared/wc/airticket-offers-widget/data.json?id=studentagency.cz&pageName=&set=&count='
    this.state = {
      todos: TodoStore.getAll(),
      destinations: null
    }
  }

  componentWillMount() {
    TodoStore.on('change', () => {
      this.setState({
        todos: TodoStore.getAll(),
        destinations: TodoStore.getDestinations()
      })
    })
  }

  createItem() {
    TodoActions.createItem(Date.now())
  }

  getDestinations() {
    TodoActions.getDestinations(this.destinationsURL)
  }

  render() {
    const { todos } = this.state
    const TodoItems = todos.map(item => <TodoItem key={item.id} text={item.text} />)
    // console.log(this.state.destinations)
    return(
      <div>
        <div>
          {console.log(this.state.destinations)}
        </div>
        <button onClick={this.getDestinations.bind(this)} >Create!</button>
        <h1>Todo list</h1>
        <ul>{TodoItems}</ul>
      </div>
    )
  }
}
