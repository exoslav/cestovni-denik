import { customFunctions } from '../constants'

let checkAsyncCounter = 0
let checkAsyncTotal

export let setCheckAsyncTotal = total => {
	checkAsyncTotal = total
}

export let checkAsyncFirebase = () => {
  if(checkAsyncCounter === checkAsyncTotal - 1)
		customFunctions.postInitFunction()
  else
    checkAsyncCounter++
}
