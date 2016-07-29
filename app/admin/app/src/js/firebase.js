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

export let editNewsItem = (opts, item) => {
	db.ref(`news/${item}`).update(opts, function(error) {
		console.log('update item:', item)
		console.log('update options:', opts)

		let errorMsg = error ? 'Error has occured during saving process' : 'Data has been updated succesfully'
	  console.log(errorMsg)

	  removePreloader()
	})
}

export let getNews = () => {
	db.ref('news').orderByChild('dateStamp').on('value', function(data) {
		// console.log(data.val())

		let news = {}
		let i = 0
		data.forEach(function(child) {
			// console.log(child)
			news[i] = child.val()
			news[i]['key'] = child.key
			// console.log(child.key)
		// news[child.val().key]
				// console.log(child.val()) // NOW THE CHILDREN PRINT IN ORDER
			i++
		});
		console.log(news)

		renderNewsList(news)
	})
}

export let getSingleNewItem = (item, customFunction) => {
	db.ref(`news/${item}`).once('value').then(function(data) {

		if(customFunction && typeof customFunction === 'function')
			customFunction(data)

		removePreloader()
	})
}

// update polozky v DB
export let updateSingleNewsItem = (ref, data) => {
	db.ref(ref).update(data, error => {
		if(!error)
			console.log(`Update request was succesfull`)
		else
			console.log(`Update request failed, due to error: ${error}`)
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
