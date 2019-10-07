const formatPrice = amount => {
    const removedDecimals = (amount).toString().split('.')[0];
    return `$ ${removedDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export default { formatPrice };