
const {dieOnError} = require("die-on-error")
const {readFile, writeFile} = require("fancyfs")

const {glob} = require("./glob")
const {escapeRegex} = require("./escape-regex")

dieOnError()

main()

async function main() {
	const [cmd, script, first, second, ...inputs] = process.argv

	const regex = new RegExp(
		`${escapeRegex(first)}([.\\s\\S]*?)${escapeRegex(second)}\\n?`,
		"igm"
	)
	let files = []

	for (const input of inputs) {
		files = [...files, ...await glob(input)]
	}

	for (const file of files) {
		const oldText = (await readFile(file)).toString("utf8")
		const newText = oldText.replace(regex, "")
		await writeFile(file, newText)
	}
}
