const fs = require('fs');

const conjugations_ends = Array.from(new Set([
    "ar", "er", "ir",
    "ar", "ares", "armos", "ardes", "arem",
    "o", "as", "a", "amos", "ais", "am",
    "ei", "aste", "ou", "amos", "astes", "aram",
    "ava", "avas", "ava", "ávamos", "áveis", "avam",
    "ara", "aras", "ara", "áramos", "áreis", "aram",
    "arei", "arás", "ará", "aremos", "areis", "arão",
    "aria", "arias", "aria", "aríamos", "aríeis", "ariam",
    "e", "es", "e", "emos", "eis", "em",
    "asse", "asses", "asse", "ássemos", "ásseis", "assem",
    "ar", "ares", "ar", "armos", "ardes", "arem",
    "a", "e", "emos", "ai", "em",
    "as", "e", "emos", "eis", "em",
    "ando", "endo", "indo",
    "ado", "ido"
]));
  
conjugations_ends.sort((a, b) => b.length - a.length);

const read_conjugations = fs.readFileSync('./Dataset/conjugations', { encoding: 'utf-8' });
let words = [...new Set(read_conjugations.split('\n'))];
words = words.filter(word => word.trim() !== '');
  
function get_radical(word) {
    for (const ending of conjugations_ends) {
        if (word.endsWith(ending)) {
            return [word, word.slice(0, word.length - ending.length)];
        }
    }

    return [word, word];
};
  
let radicals = [...new Set(words.map(word => get_radical(word)))];
let final_data = {};

for (const array of radicals) final_data[array[0]] = array[1];
fs.writeFileSync('Output/Radicals.json', JSON.stringify(final_data), { encoding: 'utf-8' }); 