import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/men'>
                    <ProductListPage />
                </Route>
                <Route path='/women'>
                    <ProductListPage />
                </Route>
                <Route path='/kids'>
                    <ProductListPage />
                </Route>
                <Route path='/shoes'>
                    <ProductListPage />
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
