import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo_ML@2x.png';
import searchIcon from '../assets/ic_Search.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import itemsService from '../services/item';
import Loader from './Loader';

const Header = ({
    setCategories,
    setItems,
    history,
    setSearchString,
    searchString
}) => {

    const [newSearchString, setNewSearchString] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        history.location.search === '' && setSearchString('')
    }, [history.location, setSearchString]);

    const handleSubmit = event => {
        event.preventDefault();
        (!loading && newSearchString !== '' && newSearchString !== searchString) && getSearchResults()
    }

    const getSearchResults = async () => {
        setSearchString(newSearchString)
        setLoading(true)
        itemsService.searchItems(newSearchString)
            .then( response => {
                setLoading(false)
                setItems(response.items)
                setCategories(response.categories)
                history.push(`/items?search=${newSearchString}`)
            })
            .catch( err => console.log(err))

    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo Mercado Libre"/>
                </Link>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        value={newSearchString}
                        onChange={event => setNewSearchString(event.target.value)}
                        placeholder="Nunca dejes de buscar"
                    />
                    <button type="submit">
                        { loading ? <Loader size="small"/> : <img src={searchIcon} alt="Buscar"/> }
                    </button>
                </form>
            </div>
        </header>
    )
}

export default withRouter(Header)