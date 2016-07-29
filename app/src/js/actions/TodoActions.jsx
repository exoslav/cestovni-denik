import dispatcher from '../dispatcher.jsx'

export let createItem = text => {
  dispatcher.dispatch({
    type: 'CREATE_ITEM',
    text
  })
}

export let deleteItem = id => {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    id
  })
}

export let getDestinations = url => {
  $.getJSON(url, data => {
    dispatcher.dispatch({
      type: 'GET_DESTINATIONS',
      data
    })
  })
}
