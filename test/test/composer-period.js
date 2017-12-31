const fs = require('fs')
const csv = require('csv')

const chekhovData = fs.readFileSync('../chekhov/chekhov-utf8.csv', 'utf8')

const composerDict = {}

csv.parse(chekhovData, (err, data) => {
	if(err) {
		console.log("Error:", err)
		return;
	}

	data.forEach(entry => {

		const period = entry[0];
		const composer = entry[1];

		if(composerDict[composer] === undefined) {
			composerDict[composer] = [period]
		} else {
			if(composerDict[composer].indexOf(period) === -1) {
				composerDict[composer].push(period)
				console.log(`Composer ${composer} present in multiple periods: ${composerDict[composer].join(' ')}`)
			}
		}
	})
})

	
