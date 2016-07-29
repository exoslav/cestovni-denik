import React from 'react'

export default class TodoItem extends React.Component {
  render() {
    return(
      <li>{this.props.text}</li>
    )
  }
}
