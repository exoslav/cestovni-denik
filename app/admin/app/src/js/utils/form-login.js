import { lngs } from '../constants'
import { setFirebaseAuth } from '../firebase'

let admin // jQuery obj

// create login form
export let createLoginForm = () => {
	
	$('body').empty().addClass('admin-login')

	let theClass = 'admin-login'
	
	admin = $('<div/>', {
		id: 'admin-login'
	})

	let header = $('<h1/>', {
		text: lngs.admin.welcomeText
	}).appendTo(admin)

	let form = $('<form/>').appendTo(admin)

	for(let i = 0; i < 2;  i++) {
		let type = i === 0 ? 'text' : 'password',
				inputName = i === 0 ? 'name' : 'password',
				inputText = i === 0 ? lngs.globals.loginName : lngs.globals.loginPassword

		$('<input/>', {
			type,
			placeholder: inputText,
			class: `${theClass}-${inputName}`
		}).appendTo(form)
	}

	$('<button/>', {
		type: 'submit',
		class: 'btn waves-effect waves-light',
		text: lngs.globals.loginSignIn
	}).appendTo(form)

	handleAdminLogin(form)

	admin.appendTo('.admin-login')
}

export let createAlertMsg = error => {
	$('#login-alert').remove()

	let errorMsg
	switch (error.code) {
		case 'auth/wrong-password':
			errorMsg = lngs.admin.errorWrongPassword
			break
		case 'auth/invalid-email':
			errorMsg = lngs.admin.errorWrongUsername
			break
	}

	let alertBox = $('<div/>', {
		id: 'login-alert'
	})

	$('<h2/>', {
		text: errorMsg
	}).appendTo(alertBox)

	alertBox.appendTo(admin)
}

// hide login form
export let hideAdminLogin = () => {
	$('#admin-login').empty()
}

function handleAdminLogin(form) {
	form.on('submit', e => {
		e.preventDefault()

		let username = form.find('.admin-login-name').val(),
				password = form.find('.admin-login-password').val()

		setFirebaseAuth(username, password)
	})
}