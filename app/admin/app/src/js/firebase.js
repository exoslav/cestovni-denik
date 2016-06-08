import { createAlertMsg, createLoginForm } from './utils/form-login'
import { createAdministration } from './utils/administration'
import { customFunctions } from './constants'
import { renderWelcomeText, renderPosition, renderNewsList } from './utils/render'

export let db
export let user

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
	   
	  customFunctions.postInitFunction()
	});	
}

export let setDBreference = () => {
	db = firebase.database()
}

export let createNewsItem = () => {
	db.ref('news').push({name: 'test push'});
}

export let getNews = () => {
	db.ref('news').on('value', function(data) {
		db.ref('news').off()
		
		renderNewsList(data.val())
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