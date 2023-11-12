const bcrypt = require("bcrypt");

const verifyPassword = async (enteredPassword, userPassword) => {
    const isCorrect = await bcrypt.compare(enteredPassword, userPassword);
    return isCorrect;
}

module.exports = {
    verifyPassword
}