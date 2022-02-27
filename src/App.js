import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import RegisterEditPage from './pages/RegisterEditPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/products/detail/:id'>
                    <ProductPage />
                </Route>
                <Route path='/products/:type:category'>
                    <ProductListPage />
                </Route>
                <Route path='/products/:type'>
                    <ProductListPage />
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/register'>
                    <RegisterEditPage />
                </Route>
                <Route path='/user/:userId'>
                    <RegisterEditPage />
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
