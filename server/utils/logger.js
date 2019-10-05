/*
 *
 *   Previene logs innecesarios cuando la app corre en test mode.
 *   Los errores se loggean de todas formas.
 *
 */

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params) => {
    console.error(...params);
};

module.exports = {
    info,
    error
};