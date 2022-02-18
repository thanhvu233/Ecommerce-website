import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/products'>
                    <ProductListPage />
                </Route>
                <Route path='/products/:type:category'>
                    <ProductListPage />
                </Route>
                <Route path='/products/:type'>
                    <ProductListPage />
                </Route>
                <Route path='/product/:id'>
                    <ProductPage />
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <PrivateRoute path='/cart'>
                    <CartPage />
                </PrivateRoute>
                <Route path='*'>
                    <NotFoundPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
