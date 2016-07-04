import { preLoader } from './templates'
import { appState, setAppState, customFunctions, _postInitFunctions, preloaderOverpage } from '../constants'

let checkAsyncCounter = 0
let checkAsyncTotal

export let setCheckAsyncTotal = total => {
	checkAsyncTotal = total - 1
}

export let createPreloader = () => {
  $(preLoader).appendTo('body')
}

export let removePreloader = () => {
	$(`#${preloaderOverpage}`).hide().remove()
}

export let checkAsyncFirebase = () => {
  if(checkAsyncCounter === checkAsyncTotal && !appState) {
  	callFunctionsInObject(customFunctions.postInitFunction)
  	callFunctionsInObject(_postInitFunctions)

    setAppState(true)
  }
  else
    checkAsyncCounter++
}

export let callFunctionsInObject = obj => {
	if(Object.keys(obj).length !== 0 && obj.constructor === Object) {
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === 'function')
				obj[key]()
    })
	}
}
