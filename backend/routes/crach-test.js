const crashTest = require('express').Router();

crashTest.get('/', () => {
    setTimeout(() => {
        throw new Error('Сервер падает');
    }, 0);
});

module.exports = crashTest;