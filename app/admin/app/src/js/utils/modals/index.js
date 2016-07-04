import { closeModalWindow } from './actions'
import { postRenderFunctions } from './postRenderFunctions'
import { createNewsModalContent } from '../templates'

let defaultOpts = {
	header: 'modalni okno'
}

/* otevre modalni okno
opts - type obj
	opts.type - typ modalniho okna
content - type obj
	data pro vykresleni do template
*/
export let openModal = (opts = {}, content) => {
	removeModal()
	opts = Object.assign(defaultOpts, opts)

	let modalPostRenderFunctions = {}

	let modalWindow = $('<div/>', {
		id: 'modal-window',
		class: 'modal'
	})

	let template
	modalPostRenderFunctions.globalPostRenderFunction = postRenderFunction
	switch(opts.type) {
		case 'create-news-modal':
			template = createNewsModalContent(content)
			modalPostRenderFunctions.createNews = postRenderFunctions.createNews
			break
	}

	$(template).appendTo(modalWindow)

	modalWindow.appendTo('body')

	// volani postrender funkci
	Object.keys(modalPostRenderFunctions).forEach(key => {
		if(typeof modalPostRenderFunctions[key] === 'function')
			modalPostRenderFunctions[key]()
	})
}

function removeModal() {
	$('#modal-window').remove()
}

function postRenderFunction() {
	//closeModalWindow()
	console.log('modal postRenderFunction')
	// otevre modalni okno
  $('#modal-window').openModal()
}
