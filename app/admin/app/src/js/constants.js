export let lngs = {}
export let customFunctions = {}

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