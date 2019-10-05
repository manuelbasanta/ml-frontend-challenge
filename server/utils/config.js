/*
 *
 *   Manejo de las variable de entorno.
 *   Creado solo por motivos de escalabilidad, el resto de las partes
 *   de la aplicación pueden acceder a las variables de entorno importando
 *   este módulo de configuración.
 *
 */


require('dotenv').config();

let PORT = process.env.PORT || '3001';
let ML_API_URL = 'https://api.mercadolibre.com/';

module.exports = {
    PORT,
    ML_API_URL
};