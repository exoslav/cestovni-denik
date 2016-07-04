export let closeModalWindow = () => {
	$('body').on('click', '.modal-window-close, .modal-window-overlay', () => {
		closeWindow()
	})
}