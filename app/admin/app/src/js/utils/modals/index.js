import { closeModalWindow } from './actions'

let defaultOpts = {
	header: 'modalni okno'
}

export let openModal = (opts, content) => {
	opts = Object.assign(defaultOpts, opts)

	let modalWindow = $('<div/>', {
		class: 'modal-window'
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

	postRenderFunction()
}

function postRenderFunction() {
	closeModalWindow()
}