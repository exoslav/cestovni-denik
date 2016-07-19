import { createAlertMsg, createLoginForm } from './utils/form-login'
import { createAdministration } from './utils/administration'
import { renderWelcomeText } from './utils/render/welcome-text/index'
import { renderPosition } from './utils/render/render-position/index'
import { renderNewsList } from './utils/render/news-list/index'
import { removePreloader } from './utils/helpers'

export let db
export let user
export let storage

// firebase authentication on click
export let setFirebaseAuth = (email, password) => {
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  createAlertMsg(error)
	})
}

// get user, if user is not logged then user is null
export let setUserState = (opts) => {
	firebase.auth().onAuthStateChanged(data => {
		user = data

	  if (data) {
	  	createAdministration()
	    console.log('user is sign in: ', user)
	  } else {
		  // run login form to administartion
			createLoginForm({
				id: opts.formId
			})
			console.log('fail to log in: ', user)
	  }
	});
}

export let setDBreference = () => {
	db = firebase.database()
	setStorageReference()
}

export let setStorageReference = () => {
	storage = firebase.storage()
}

export let createNewsItem = opts => {
	db.ref('news').push(opts, function(error) {
		let errorMsg = error ? 'Error has occured during saving process' : 'Data has been saved succesfully'
	  console.log(errorMsg)

	  removePreloader()
	})
}

export let getNews = () => {
	db.ref('news').on('value', function(data) {
		//db.ref('news').off()
		renderNewsList(data.val())
	})
}

export let getSingleNewItem = (item, customFunction) => {
	db.ref(`news/${item}`).once('value').then(function(data) {

		if(customFunction && typeof customFunction === 'function')
			customFunction(data)

		removePreloader()
	})
}

export let updateSingleNewsItem = (item) => {
	alert('updateSingleNewsItem')
	let newData = {
		gallery: true
	}
	let updates = {
		[`news/${item}`]: newData
	}
	alert('updateSingleNewsItem2')
	db.ref(`news/${item}`).update({"gallery": true}, error => {
		if(error) {
			alert('updateSingleNewsItem - failed')
			console.log(`Update request failed, due to error: ${error}`)
		}
		else {
			alert('updateSingleNewsItem - success')

			console.log(`Update request was succesfull`)
		}

	})
}

export let deleteSingleNewItem = item => {
	db.ref(`news/${item}`).remove(function(error) {
		let errorMsg = error ? 'Error has occured during removing process' : 'Data has been removed succesfully'

	  console.log(errorMsg)

	  removePreloader()
	})
}

export let getWelcomeText = () => {
	db.ref('welcomeText').on('value', function(data) {
		db.ref('welcomeText').off()

		renderWelcomeText(data.val())
	})
}

export let getPosition = () => {
	db.ref('position').on('value', function(data) {
		db.ref('position').off()

		renderPosition(data.val())
	})
}
