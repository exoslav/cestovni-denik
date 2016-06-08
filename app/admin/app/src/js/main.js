require('../css/main.scss')
import { setLangs, setCustomFunctions, appStatus, setAppStatus } from './constants'
import { setDBreference, setUserState } from './firebase'

window.adminInit = (opts = {}) => {
	setCustomFunctions(opts.customFunctions)

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