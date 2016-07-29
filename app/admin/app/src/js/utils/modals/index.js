import { closeModalWindow } from './actions'
import { postRenderFunctions } from './postRenderFunctions'
import { newsModalContent, createGallery } from '../templates'
import { callFunctionsInObject } from '../helpers'

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
	console.log(opts)
	removeModal()
	opts = Object.assign(defaultOpts, opts)

	let modalPostRenderFunctions = {}

	let modalWindow = $('<div/>', {
		id: 'modal-window',
		class: 'modal'
	})

	let template,
	error = {
		status: false,
		msg: 'Modalni okno nemohlo byt vytvoreno kvuli nasledujici chybe: '
	}
	modalPostRenderFunctions.globalPostRenderFunction = postRenderFunction
	switch(opts.type) {
		case 'create-news-modal':
			template = newsModalContent(content)
			modalPostRenderFunctions.createNews = postRenderFunctions.createNews
			break
		case 'edit-news-modal':
			template = newsModalContent(content)
			modalPostRenderFunctions.editNews = postRenderFunctions.editNews
			break
		case 'create-news-item-gallery':
			if(opts.itemKey && typeof opts.itemKey === 'string') {
				var itemKey = opts.itemKey
			} else {
				error.msg += 'neni k dispozici klic pro novinku'
				error.status = true
			}

			template = createGallery
			modalPostRenderFunctions.createGallery = () => postRenderFunctions.createGallery(opts.itemKey)
			break
	}

	if(error.status) {
		console.log(error.msg)
		return false
	}

	$(template).appendTo(modalWindow)

	modalWindow.appendTo('body')

	// volani postrender funkci
	callFunctionsInObject(modalPostRenderFunctions)
}

function removeModal() {
	$('#modal-window').remove()
}

function postRenderFunction() {
	// otevre modalni okno
  $('#modal-window').openModal()
}
