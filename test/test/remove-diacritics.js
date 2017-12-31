const fs = require('fs')
const { remove: removeDiacritics } = require('diacritics')

fs.writeFileSync('../chekhov/chekhov-safe.json', 
    removeDiacritics(fs.readFileSync('../chekhov/chekhov.json', 'utf8'))
)