
const globWithCallback = require("glob")

async function glob(input) {
	return new Promise((resolve, reject) => {
		globWithCallback(input, (error, files) => {
			if (error) reject(error)
			resolve(files)
		})
	})
}

module.exports = {glob}
