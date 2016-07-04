import renderUI from '../render-ui'
import { checkAsyncFirebase } from '../../helpers'

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

	checkAsyncFirebase()
}