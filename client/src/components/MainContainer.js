import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Route } from 'react-router-dom';
import Message from './Message';

const MainContainer = props => {

    return (
        <main>
            <div className="container">
                <Route path="/items" render={() => <Breadcrumbs categories={props.categories} />} />
                <Route exact path="/" render={() => <Message msg="Busca productos, marcas y más..." />} />
                {props.children}
            </div>
        </main>
    )
}

export default MainContainer