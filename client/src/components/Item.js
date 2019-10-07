import React from 'react';
import freeShippingIcon from '../assets/ic_shipping.png';
import { Link } from 'react-router-dom';
import prices from '../helpers/prices';

const Item = ({
    picture,
    price,
    free_shipping,
    location,
    title,
    id
}) => {

    const formatedPrice = () => {
        prices.formatPrice(price.amount)
        return (
            <>
                {prices.formatPrice(price.amount)}
                <div className="decimals">{String(price.decimals).padEnd(2, '0')}</div>
            </>
        )
    }

    return (
        <div className="search-item">
            <Link to={`/items/${id}`}>
                <div className="search-item-content">
                    <img className="thumbnail" src={picture}  alt="Imágen descriptiva"/>
                    <div className="itemInfo">
                        <div className="itemPrice">
                            { price.amount !== null &&
                                formatedPrice()
                            }
                            {free_shipping && <img src={freeShippingIcon} alt="Envío gratis"/>}
                        </div>
                        <div>{title}</div>
                    </div>
                    <div className="location">{location}</div>
                </div>
            </Link>
        </div>
    )
}

export default Item