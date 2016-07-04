require('../css/main.scss')
import { setLangs, customFunctions, setCustomFunctions, appStatus, setAppStatus } from './constants'
import { setDBreference, setUserState } from './firebase'
import { callFunctionsInObject } from './utils/helpers'

window.adminInit = (opts = {}) => {
	setCustomFunctions(opts.customFunctions)

	// volani preInitCustom funkci
	callFunctionsInObject(customFunctions.preInitFunction)

	// initialize firebase
	firebase.initializeApp(opts.fireBaseConfig)

	setDBreference()

	// get languages async
	firebase.database().ref('langs').on('value', function(data) {
		if(!appStatus) {
			firebase.database().ref('langs').off() // dettach listener
		  
		  setLangs(data.val())

			setUserState(opts)
		} else
			setAppStatus(true)
	})

}