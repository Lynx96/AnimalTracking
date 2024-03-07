require('dotenv').config();
const envaozao = process.env.PRIVATE_KEY;
module.exports = {
    API_URL : process.env.API_URL,
    API_KEY : process.env.API_KEY,
    PRIVATE_KEY : envaozao,
    CONTRACT_ADDRESS : process.env.CONTRACT_ADDRESS
}

console.log(envaozao)