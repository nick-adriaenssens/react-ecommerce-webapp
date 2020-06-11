import React, { useEffect } from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Redirect, Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { connect } from 'react-redux';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <Header />

            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage/>)}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
