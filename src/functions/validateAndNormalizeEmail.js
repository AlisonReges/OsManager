function validateAndNormalizeEmail(email) {
    // Converter todas as letras maiúsculas para minúsculas
    const normalizedEmail = email.toLowerCase();

    // Expressão regular para validar o formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(normalizedEmail)) {
        return normalizedEmail; // Email válido, retorna em formato minúsculo
    }
}

module.exports = validateAndNormalizeEmail;