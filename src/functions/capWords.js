function capWords(str) {
    let words = str.split(" ");

    // Verificar e remover elementos vazios do início do array
    while (words.length > 0 && words[0] === "") {
        words.shift(); // Remove o primeiro elemento vazio
    }

    if (words.length === 0) {
        return ""; // Se não restarem palavras após a remoção dos vazios, retorna uma string vazia
    }

    words[0] = words[0][0].toUpperCase() + words[0].substr(1).toLowerCase();

    for (let i = 1; i < words.length; i++) {
        if (words[i].length <= 2) {
            words[i] = words[i].toLowerCase();
        } else if (words[i].length === 3) {
            const regex = /(das)|(dos)/gi.test(words[i]);
            if (!regex) {
                const subStr = words[i].substring(1);
                words[i] = words[i][0].toUpperCase() + subStr.toLowerCase();
            } else {
                words[i] = words[i].toLowerCase();
            }
        } else {
            const subStr = words[i].substr(1);
            words[i] = words[i][0].toUpperCase() + subStr.toLowerCase();
        }
    }

    return words.join(" ");
}

module.exports = capWords;
