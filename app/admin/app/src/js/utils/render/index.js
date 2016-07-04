import { lngs } from '../../constants'
import { openModal } from '../modals'
import { checkAsyncFirebase, setCheckAsyncTotal } from '../helpers'
import { db, getNews, getWelcomeText, getPosition } from '../../firebase'

export let loadAdministrationModules = () => {
	let renderFunctions = {
		getWelcomeText: getWelcomeText,
		getPosition: getPosition,
		getNews: getNews
	}

	setCheckAsyncTotal(Object.keys(renderFunctions).length)

	Object.keys(renderFunctions).forEach((key, index) => {
		if(typeof renderFunctions[key] === 'function')
			renderFunctions[key]()
	})

	administrationPostRenderFunction()
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

	$('body').on('click', '#new-story', e => {
		openModal({
				type: $(e.target).attr('data-modal-type'),
			},
			{
				modalHeader: 'Název nového příběhu'
			})
	})
}

function writeUserData(pathName, opts) {
  db.ref(pathName).update(opts);
}
