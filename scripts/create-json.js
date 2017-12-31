const csv = require('csv');
const fs = require('fs');
const { remove: safe } = require('diacritics')

const data = fs.readFileSync('chekhov/chekhov.csv', 'utf8');
csv.parse(data, (err, parsed) => {
    if(err) {
        console.error(`Error: ${err}`);
        return;
    }
    const out = parsed.map(entry => {
        const { 
            0: period, 
            1: composer,
            2: piece,
            3: performer,
            4: label,
            5: is_cd,
            6: catalog,
            7: duration
        } = entry;
        return { 
            piece, composer, piece, performer, label, is_cd: is_cd === 'true', catalog,
            period: Number(period), duration: Number(duration),
            _piece: safe(piece), _composer: safe(composer).replace(/ \(.+\d+-?\)$/, ''), _performer: safe(performer),
        }
    })

    fs.writeFileSync('chekhov/chekhov.json', JSON.stringify(out));
});