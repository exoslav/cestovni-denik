import { removePreloader } from './utils/helpers'

// uklada stav aplikace... pokud se nactou vsechny komponenty, je appState true
export let appState = false
export let setAppState = val =>	appState = val

export let lngs = {}
export const customFunctions = {}
export const _postInitFunctions = {
	removePreloader
}
export const preloaderOverpage = 'preloader-overpage'

export let appStatus = false

export let setAppStatus = status => {
	appStatus = status
}

export let setLangs = data => {
	lngs = data
}

// set functions
export let setCustomFunctions = functions => {
	Object.assign(customFunctions, functions)
}