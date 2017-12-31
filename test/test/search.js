const fs = require('fs');
const Table = require('cli-table')
const prompt = require('prompt-sync')({
    history: require('prompt-sync-history')()
});

const CHEKHOV = (() => {
    try {
        return JSON.parse(fs.readFileSync('../chekhov/chekhov.json', 'utf8'));
    } catch (e) {
        console.error('Error reading Chekhov');
        process.exit(1)
    }
})()

const MATCH_FIELDS = [
    '_piece',
    '_composer',
    '_performer',
]

const MAX_RESULTS = 25;

let cache = {
    data: CHEKHOV,
    query: ''
}

const parse = query => {
    const { query: lastQuery, data: lastData } = cache;

    const data = (query.startsWith(lastQuery) === true) ?
        lastData :
        CHEKHOV;

    const keywords = query.trim().toLowerCase().replace(/[^\-\w\d]/, ' ').split(' ');

    const isMatch = matchedFields => keywords.every(keyword => {
        if(keyword[0] === '-') {
            keyword = keyword.slice(1)
            return !(matchedFields.some(field => field.includes(keyword)));
        } 
        if(keyword.match(/^\d+$/)) {
            const numRegex = new RegExp(`(\\D|^)${keyword}(\\D|$)`)
            return numRegex.test(matchedFields[0]) === true
        }
        return matchedFields.some(field => field.includes(keyword))
    })

    const results = data.filter(entry => {
        const matchedFields = MATCH_FIELDS.map(x => entry[x].toLowerCase())
        return isMatch(matchedFields)
    })

    cache = {
        data: results,
        query
    }

    return results;
}


let query;

while(1) {
    query = prompt('Search: ', '')
    if(query === null) {
        return;
    }

    const startDate = +new Date();

    const results = parse(query);

    const duration = +new Date() - startDate;

    const table = new Table({
        head: ['Period', 'Composer', 'Piece', 'Performer', 'Label', 'CD/LP', 'Catalog', 'Duration'],
        colWidths: [10, 30, 50, 50, 20, 10, 20, 10]
    });

    console.log(`${results.length} results found in ${duration} ms:`)
    table.push(
        ...results.slice(0,MAX_RESULTS).map(entry => [ entry.period, entry.composer, entry.piece, entry.performer, entry.label, entry.is_cd === true ? 'CD' : 'LP', entry.catalog, entry.duration])
    )

    console.log(table.toString())
    if(results.length > MAX_RESULTS) {
        console.log(`and ${results.length - MAX_RESULTS} more...`)
    }
} 
