import { lngs } from '../../../constants'
import { storage } from '../../../firebase'
import { handleNews } from './helpers'
import { actionList } from './actions'
import { callFunctionsInObject, checkAsyncFirebase } from '../../helpers'

export let isDeleteEventsBinded = false

export let renderNewsList = data => {
	let selector = 'admin-news',
			news = data,
			el = $('<ul/>', {
				class: 'collapsible popout collapsible-accordion'
			})

	$(`#${selector}`).empty()

	Object.keys(news).forEach(key => {
		let newsType = news[key].type === 1 ? 'nz' : 'aust'

		let newPost = `
			<li
				class="admin-news-item"
				data-db-key="${key}"
				id="admin-news-item-${news[key].id}"
			>
				<div class="collapsible-header">
					<img class="admin-news-icon" src="../src/imgs/${newsType}-icon.png">
					<h3>
						${news[key].header}
					</h3>
				</div>

				<div class="admin-news-edit">
					<button data-type="edit" class="waves-effect waves-light btn" type="button">
						<i class="material-icons">mode_edit</i>
					</button>
					<button data-type="delete" class="waves-effect waves-light btn" type="button">
						<i class="material-icons">delete</i>
					</button>
				</div>`

			newPost += `
				<div class="collapsible-body">
					<div class="admin-news-item-content">
						${news[key].desc}
					</div>`

			if(news[key].gallery)
				newPost += `
					<div class="admin-news-item-gallery">
						je galerie
					</div>`
			else
				newPost += `
					<div class="admin-news-item-gallery">
						<button id="create-gallery" data-type="create-news-item-gallery" type="button">Vytvořit galerii</button>
					</div>`

			newPost += `</div></li>`

		$(newPost).appendTo(el)
	})

  $(`.${selector}-preloader`).remove()

  $('<h2/>', {
  	text: lngs.admin.ourStories
  }).appendTo(`#${selector}`)
  $('<a/>', {
  	id: 'new-story',
		class: 'waves-effect waves-light btn modal-trigger',
		'data-modal-type': 'create-news-modal',
		href: '#modal1',
  	text: 'nový příběh'
  }).appendTo(`#${selector}`)

	$(el).appendTo(`#${selector}`)

	callFunctionsInObject(actionList)

	$(document).ready(() => {
	  $('.collapsible').collapsible({
	    accordion : false
	  })
	})

	checkAsyncFirebase()
}
