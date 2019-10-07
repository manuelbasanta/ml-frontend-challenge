/*
 *
 *   Funciones para formatear las responses
 *   y validar id.
 *
 */




/*
 *   Los ids tienen que estar formados de la
 *   siguiente manera:
 *   'MLA' + 9 digitos del 0 al 9
 */
const validIdRegexp = RegExp(/^MLA\d{9}$/);

const isValidId = id => {
    return validIdRegexp.test(id);
};

// Formatear una busqueda por string
const formatSearchQuery = (unformattedItems, unformattedCategories) => {

    const items = unformattedItems.map(item => formatItem(item));
    const categories = formatCategories(unformattedCategories);
    const author = getAuthor();

    return {
        author,
        categories,
        items
    };
};

// Formatear una busqueda por id
const formatIdQuery = (unformattedItem, unformattedDescription) => {

    const item = formatItem(unformattedItem, true);
    item.description = unformattedDescription.plain_text;
    const author = getAuthor();

    return {
        author,
        item
    };
};

const formatCategories = unformattedCategories => {
    const categories = unformattedCategories ?
        unformattedCategories.values[0].path_from_root.map(category => category.name) :
        [];
    return categories;
};

const getAuthor = () => {
    return {
        name: 'Manuel',
        lastname: 'Basanta'
    };
};

const getDecimals = value => {
    const decimals = value ? value.toString().split('.')[1] : 0;
    return decimals ? Number(decimals) : 0;
};

const formatItem = (item, idQuery = false) => {
    const formatedItem = {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: getDecimals(item.price)
        },
        picture: item.pictures && item.pictures.length ? item.pictures[0].url : item.thumbnail,
        sold_quantity: idQuery ? item.sold_quantity : undefined,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        location: idQuery ? undefined : item.address.state_name
    };

    return formatedItem;
};

formatIdQuery;

module.exports = {
    formatSearchQuery,
    formatIdQuery,
    isValidId
};