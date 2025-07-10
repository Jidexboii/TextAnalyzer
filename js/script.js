//  UTILITY

function noInputtedWord() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].trim().length === 0) {
            return true;
        }
    }
    return false;
}

function toArray(sentence) {
    return sentence.split(' ')
}

function lowerCase(text) {
    return text.toLowerCase()
}

function badWordsArray() {
    let bad = ['zoinks', 'loopdaloop', 'biffaroni', 'muppeteer'];
    return bad;
}

// BUsINESS LOGIC

function WordCount(sentence) {
    if (noInputtedWord(sentence)) {
        return 0
    }

    let counter = 0
    let arraySentence = toArray(sentence)

    arraySentence.forEach(word => {
        if (/[a-zA-Z]/.test(word)) {
            counter++
        }
    });
    return counter
}

function offensiveCount(sentence) {
    let counter = 0
    let arraySentence = toArray(sentence)
    let offensiveWord = badWordsArray()

    arraySentence.forEach(word => {
        offensiveWord.forEach(text => {
            if (lowerCase(word) === lowerCase(text)) {
                counter++
            }

        });
    });
    return counter
}

function OffensiveWords(sentence) {
    let words = toArray(sentence)
    let badWords = badWordsArray()


    for (let i = 0; i < words.length; i++) {
        if (badWords.includes(lowerCase(words[i]))) {
            let maskedWord = words[i][0] + '+'.repeat(words[i].length - 2) + words[i][words[i].length - 1];
            words[i] = maskedWord;
        };
    };
    return words.join(' ');
};


function topThreeWords(sentence) {
    if (noInputtedWord(sentence)) {
        return "No WORDs yet"
    }

    let array = toArray(lowerCase(sentence));
    let topUniqueWords = [...new Set(array)];
    let topWords = [];

    topUniqueWords.forEach(function (Uword) {
        let count = 0
        array.forEach(function (words) {
            if (Uword === words)
                count++

        });
        if (/[a-zA-Z]/.test(Uword)) {
            topWords.push([Uword, count])
        }
    });

    topWords.sort((a, b) => b[1] - a[1]);
    let top3Words = topWords.slice(0, 3)
    let new2 = "<ul>";

    top3Words.forEach(function (Twords) {

        new2 += "<li>" + Twords[0] + " : " + "<b>" + Twords[1] + "</b>" + "</li>";

    });
    new2 += "</ul>"
    return new2
};

function countOccurence(word, sentence) {
    let words = lowerCase(word);
    let array = toArray(lowerCase(sentence));
    let counter = 0

    array.forEach(function (text) {
        if (/[a-zA-Z]/.test(word) && /[a-zA-Z]/.test(sentence) && text === words) {
            counter++
        }
    })
    return counter
}


function colorWordsOccurence(word, sentence) {
    if (noInputtedWord(sentence)) {
        return "";
    }
    let hasedOffensive = OffensiveWords(sentence)
    let words = lowerCase(word);
    let array = toArray(lowerCase(hasedOffensive));
    let returnWords = "<p class='textal'>"

    array.forEach(function (text, index) {
        if (/[a-zA-Z]/.test(word) && words === text) {
            returnWords += "<b class = 'matched com'>" +
                text +
                "</b>"
        } else if (/[a-zA-Z]/.test(word) && /[a-zA-Z]/.test(text) && text.includes(words)) {
            let matchArray = text.match(words);
            text = text.replace(matchArray[0], "<b class = 'esist com'>" +
                matchArray[0] +
                "</b>")
            returnWords = returnWords.concat(text);
        } else {
            returnWords = returnWords.concat(text);
        }
        if (index !== array.length - 1) {
            returnWords += " "

        }


    })

    returnWords += "</p>"
    return returnWords

}


// UI

$(document).ready(function () {
    $("#input-text").on('input', function () {

        let textArea = $('#input-text').val()
        let input = $('#search-term').val()

        let WordCounted = WordCount(textArea)
        let offensiveCounted = offensiveCount(textArea)
        let occurenceCounted = countOccurence(input, textArea)
        let topThreeWorded = topThreeWords(textArea)


        $('#total-words').text(WordCounted)
        $('#offensive-words').text(offensiveCounted)
        $('#word-occurence').text(occurenceCounted)
        $('#top-words-list').html(topThreeWorded)
        $('#search-results').html(colorWordsOccurence(input, textArea))
    });

    $("#search-term").on('input', function () {
        let textArea = $('#input-text').val()
        let input = $('#search-term').val()

        let occurenceCounted = countOccurence(input, textArea)
        $('#search-results').html(colorWordsOccurence(input, textArea))
        $('#word-occurence').text(occurenceCounted)
    });
});
