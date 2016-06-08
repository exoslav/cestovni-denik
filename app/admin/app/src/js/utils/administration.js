import { hideAdminLogin } from './form-login'
import { getNews, getWelcomeText, getPosition } from '../firebase'
import { administration } from './templates'
import { loadAdministrationModules } from './render'
import { lngs, customFunctions } from '../constants'

export let createAdministration = () => {
	hideAdminLogin()
	$('body').removeClass().attr('id', 'administration')

	let adminContent = $(administration(lngs))

	adminContent.appendTo('body')

	$('#admin-logout').on('click', e => {
		e.preventDefault()

		firebase.auth().signOut().then(function() {
		  console.log('logged out succesfully')
		}, function(error) {
		  console.log('error has occured', error)
		  // An error happened.
		});
	})

	loadAdministrationModules()
}