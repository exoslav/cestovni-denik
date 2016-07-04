import { preLoader } from '../templates'
import { createNewsItem } from '../../firebase'

export let postRenderFunctions = {
	createNews
}

function createNews() {
	let opts = {}
	$('#create-new-story').on('click', e => {
		e.preventDefault()
		
		$(preLoader).appendTo('body')

		$('.modal-window-content input').each((index, item) => {
			opts[$(item).attr('data-type')] = $(item).val()
		})
		
		createNewsItem(opts)
	})
}