import React, { useEffect, useState } from 'react';
import Item from './Item';
import itemsService from '../services/item';
import Loader from './Loader';
import Message from './Message';
import { Helmet } from 'react-helmet';

const SearchResults = ({
    searchString,
    location,
    setItems,
    setCategories,
    items,
    setSearchString
}) => {

    const [loading, setLoading] = useState(true)

    /*
    * Solo hace un fetch de los items si se llega
    * a los resultados directamente por url
    */

    useEffect(() => {
        if (searchString === '') {
            const query = new URLSearchParams(location.search).get('search');
            itemsService.searchItems(query)
                .then( response => {
                    setLoading(false)
                    setSearchString(query)
                    setItems(response.items)
                    setCategories(response.categories)
                })
                .catch( err => console.log(err))
        } else {
            setLoading(false)
        }
    },[location.search, searchString, setItems, setCategories, setSearchString] );

    const itemsToShow = () => {
        return items.map( item => <Item key={item.id} {...item}/>)
    }

    return (
        <div>
            {
                loading ?
                    <Loader size="big"/> :
                    items.length === 0 ?
                        <Message msg="No se encontraron resultados" type="error"/> :
                        itemsToShow()
            }
            <Helmet>
                <title>{searchString} en Mercado Libre</title>
                <meta
                    name="description"
                    content="Encontrá Lámparas en Mercado Libre Argentina. Descubrí la mejor forma de comprar online."
                />
            </Helmet>
        </div>
    )
}

export default SearchResults