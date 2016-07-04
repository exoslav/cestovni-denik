import renderUI from '../render-ui'
import { checkAsyncFirebase } from '../../helpers'

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

	checkAsyncFirebase()
}