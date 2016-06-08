import { lngs } from '../constants'
import { openModal } from './modals'
import { db, createNewsItem, getNews, getWelcomeText, getPosition } from '../firebase'

export let loadAdministrationModules = () => {
	getWelcomeText()
	getPosition()
	getNews()

	administrationPostRenderFunction()
}

export let renderWelcomeText = data => {
	let selector = 'admin-welcome-text',
			welcomeText = data,
			el = `
				<div class="editable welcome-text">
					<input
						disabled
						data-db-key="header"
						data-db-path="welcomeText"
						data-editable-save="true"
						value="${welcomeText.header}"
					>
					<input
						disabled
						data-db-key="desc"
						data-db-path="welcomeText"
						data-editable-save="true"
						value="${welcomeText.desc}"
					>
				</div>`

  $(`.${selector}-preloader`).remove()
	$(el).appendTo(`#${selector}`)

	renderUI(selector)

  console.log('welcomeText was added')
}

export let renderPosition = data => {
	let selector = 'admin-position',
			position = data,
			el = `
			<div>
				<div class="editable where-we-are">
					<input 
						disabled
						data-db-key="header"
						data-db-path="position/whereWeAre"
						data-editable-save="true"
						value="${position.whereWeAre.header}"
					>
					<input
						disabled
						data-db-key="desc"
						data-db-path="position/whereWeAre"
						data-editable-save="true"
						value="${position.whereWeAre.desc}"
					>
				</div>

				<div class="editable where-we-go">
					<input
						disabled
						data-db-key="header"
						data-db-path="position/whereWeGo"
						data-editable-save="true"
						value="${position.whereWeGo.header}"
					>
					<input
						disabled
						data-db-key="desc"
						data-db-path="position/whereWeGo"
						data-editable-save="true"
						value="${position.whereWeGo.desc}"
					>
				</div>
			</div>`

  $(`.${selector}-preloader`).remove()
	$(el).appendTo(`#${selector}`)

	renderUI(selector)

  console.log('position was added')
}

export let renderNewsList = data => {
	let selector = 'admin-news',
			news = data,
			el = $('<ol/>', {
				class: 'collapsible popout collapsible-accordion'
			})

			Object.keys(news).forEach(key => {
				console.log(key)
				let newsType = news[key].type === 1 ? 'nz' : 'aust'

				let newPost = `
					<li>
						<div class="collapsible-header">
							<img class="admin-news-icon" src="../src/imgs/${newsType}-icon.png">
							<a
								class="admin-news-item"
								data-db-key="${key}"
								id="admin-news-item-${news[key].id}"
								href="#"
							>
								${news[key].header}
							</a>
						</div>

						<div class="collapsible-body">
							${news[key].desc}
							
							<div class="collapsible-footer">
								upravit
							</div>
						</div>

					</li>`

				$(newPost).appendTo(el)
			})

  $(`.${selector}-preloader`).remove()

  $('<h2/>', {
  	text: lngs.admin.ourStories
  }).appendTo(`#${selector}`)

  $('<a/>', {
  	id: 'new-story',
  	text: 'nový příběh'
  }).appendTo(`#${selector}`)

	$(el).appendTo(`#${selector}`)

	handleNews(news, selector)

	$(document).ready(() => {
	  $('.collapsible').collapsible({
	    accordion : false
	  })
	})

  console.log('news were added')
}

function handleNews(data, selector) {
	$('body').on('click', `.${selector}-item`, e => {
		e.preventDefault()

		renderNewsDetailContent(data, selector, $(e.target))
	})
}

function renderNewsDetailContent(data, selector, item) {
	let itemData = data[item.attr('data-db-key')],
			itemTemplate = $(`
			<div class="${selector}-detail">
				<span class="${selector}-detail-date">${itemData.date}</span>
				<div class="${selector}-detail-annotation">${itemData.desc}</div>
				<div class="${selector}-detail-content">${itemData.content}</div>
			</div>`)

	openModal({header: itemData.header}, itemTemplate)
}

function renderUI(selector) {
	$(`#${selector}`).find('.editable').each((index, item) => {
		let UI = $('<button/>', {
			class: `waves-effect waves-light btn ui-edit ui-edit-${selector}`,
			text: lngs.admin.edit,
			type: 'button'
		})

		UI.appendTo($(item))
	})
}

function administrationPostRenderFunction() {
	$('body').on('click', '.ui-edit', e => {
		let self = $(e.target),
				savedData = {}

		self.toggleClass('ui-edit-is-open').text(self.hasClass('ui-edit-is-open') ? lngs.admin.done : lngs.admin.edit)

		let elems = self.closest('.editable').find('[data-editable-save="true"]')

		let updateData = {},
				pathName = ''

		elems.each((index, item) => {
			$(item).attr('disabled', self.hasClass('ui-edit-is-open') ? false : true)
			pathName = $(item).attr('data-db-path')
			updateData[$(item).attr('data-db-key')] = $(item).val()
		})

		if(!self.hasClass('ui-edit-is-open'))
			writeUserData(pathName, updateData)
	})

	$('body').on('click', '#new-story', () => {
		openModal({header: 'header name'}, $('<div/>', {text: 'text'}))
	})
}

function writeUserData(pathName, opts) {
  db.ref(pathName).update(opts);
}