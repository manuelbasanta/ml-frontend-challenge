import React, { useEffect , useState } from 'react';
import itemsService from '../services/item';
import Loader from './Loader';
import prices from '../helpers/prices';

const ItemDetail = ({ id }) => {
    const [item, setItem] = useState(null);

    useEffect( () => {
        itemsService.getItem(id)
            .then(response => {
                console.log(response.item)
                setItem(response.item)
            })
            .catch(err => console.log(err.response.status) )
    }, [id])

    const itemInfo = () => {
        return (
            <div className="item-detail">
                <div>
                    <img src={item.picture} alt="Foto del producto"/>
                    <div className="item-info">
                        <div>{`${item.condition === 'new' ? 'Nuevo' : 'Usado'} - ${item.sold_quantity} vendidos`}</div>
                        <div className="item-title">{item.title}</div>
                        <div className="item-price">
                            {prices.formatPrice(item.price.amount)}
                            <div className="decimals">{item.price.decimals === 0 ? '00' : item.price.decimals}</div>
                        </div>
                        <button className="buy-item">Comprar</button>
                    </div>
                </div>
                <div className="description">
                    <div> Descripción del producto </div>
                    <div> { item.description } </div>
                </div>
            </div>
        )
    }

    return item ? itemInfo() : <Loader size="big" />;
}

export default ItemDetail