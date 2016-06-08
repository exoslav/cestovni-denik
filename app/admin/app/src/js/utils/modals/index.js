import { closeModalWindow } from './actions'
import { createNewsModalContent } from '../templates'

let defaultOpts = {
	header: 'modalni okno'
}

export let openModal = (opts = {}, content) => {
	$('#modal-window').remove()
	
	opts = Object.assign(defaultOpts, opts)

	let modalWindow = $('<div/>', {
		id: 'modal-window',
		class: 'modal modal-fixed-footer'
	})

	let template
	switch(opts.type) {
		case 'createNewsModalContent':
			template = createNewsModalContent()
			break
	}

	$(template).appendTo(modalWindow)
	// let modalWindowHeader = $('<div/>', {
	// 	class: 'modal-window-header'
	// }).appendTo(modalWindow)

	// let closeButton = $('<button/>', {
	// 	type: 'button',
	// 	text: 'zavřít',
	// 	class: 'modal-window-close'
	// }).appendTo(modalWindowHeader)

	// content.appendTo(modalWindowContent)

	modalWindow.appendTo('body')

	postRenderFunction()
}

function postRenderFunction() {
	closeModalWindow()

  $('#modal-window').openModal();
}


/*
import { closeModalWindow } from './actions'

let defaultOpts = {
	header: 'modalni okno'
}

export let openModal = (opts, content) => {
	opts = Object.assign(defaultOpts, opts)

	let modalWindow = $('<div/>', {
		id: 'modal-window',
		class: 'modal modal-fixed-footer'
	})

	let modalWindowHeader = $('<div/>', {
		class: 'modal-window-header'
	}).appendTo(modalWindow)

	let closeButton = $('<button/>', {
		type: 'button',
		text: 'zavřít',
		class: 'modal-window-close'
	}).appendTo(modalWindowHeader)

	$('<h2/>', {
		text: opts.header,
		class: 'modal-window-headline'
	}).appendTo(modalWindowHeader)

	let modalWindowContent = $('<div/>', {
		class: 'modal-window-content'
	}).appendTo(modalWindow)

	content.appendTo(modalWindowContent)

	modalWindow.appendTo('body')
	console.log()
	postRenderFunction()
}

function postRenderFunction() {
	closeModalWindow()

  $('#modal-window').openModal();
}
*/
