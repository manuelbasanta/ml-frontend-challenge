import React, { useEffect, useState } from 'react';
import Item from './Item';
import itemsService from '../services/item';
import Loader from './Loader';
import Message from './Message';

const SearchResults = ({
    location,
    setItems,
    setCategories,
    items,
}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search');
        if (query) {
            setLoading(true)
            itemsService.searchItems(query)
                .then( response => {
                    setItems(response.items)
                    setCategories(response.categories)
                    setLoading(false)
                })
                .catch( err => console.log(err))
        } else {
            setLoading(false)
        }
    },[location.search, setItems, setCategories] );

    const itemsToShow = () => {
        if (items.length === 0) {
            return <Message msg="No se encontraron resultados" type="error"/>
        } else {
            return items.map( item => <Item key={item.id} {...item}/>)
        }
    }

    return (
        <div>
            { loading ? <Loader /> : itemsToShow() }
        </div>
    )
}

export default SearchResults