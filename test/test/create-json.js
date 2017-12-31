const csv = require('csv');
const fs = require('fs');
const { remove: safe } = require('diacritics')

const data = fs.readFileSync('../chekhov/chekhov-utf8.csv', 'utf8');
csv.parse(data, (err, parsed) => {
    if(err) {
        console.error(`Error: ${err}`);
        return;
    }
    const out = parsed.map(entry => {
        const { 
            1: period, 
            2: composer,
            3: piece,
            4: performer,
            5: label,
            6: is_cd,
            7: catalog,
            8: duration
        } = entry;
        return { 
            period, piece, composer, piece, performer, label, is_cd: is_cd === 'true', catalog, duration,
            _piece: safe(piece), _composer: safe(composer).replace(/ \(.+\d+-?\)$/, ''), _performer: safe(performer)

        }
    })

    fs.writeFileSync('../chekhov/chekhov.json', JSON.stringify(out));
});