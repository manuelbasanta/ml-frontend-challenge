import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo_ML@2x.png';
import searchIcon from '../assets/ic_Search.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({
    history,
    setSearchString,
    searchString
}) => {

    const [newSearchString, setNewSearchString] = useState('')

    useEffect(() => {
        history.location.search === '' && setSearchString('')
    }, [history.location, setSearchString]);

    const handleSubmit = event => {
        event.preventDefault();
        (newSearchString !== '' && newSearchString !== searchString) && getSearchResults()
    }

    const getSearchResults = async () => {
        setSearchString(newSearchString)
        history.push(`/items?search=${newSearchString}`)
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
                        <img src={searchIcon} alt="Buscar"/>
                    </button>
                </form>
            </div>
        </header>
    )
}

export default withRouter(Header)