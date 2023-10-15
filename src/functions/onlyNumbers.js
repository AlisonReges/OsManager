function onlyNumbers(str) {
    const regex = new RegExp('([^\\d\\n])', 'gm');
    const subst = ``;
    let result = ``;
    result = str.replace(regex, subst);
    return result;
}

module.exports = onlyNumbers
