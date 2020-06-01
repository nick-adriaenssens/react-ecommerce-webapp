import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Redirect, Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDoc } from './core/firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {

    authSubscription;

    componentDidMount() {
        this.authSubscription = auth.onAuthStateChanged(async userAuth => {
            if (!userAuth) {
                this.props.setCurrentUser(null);
                return;
            }

            const userRef = await createUserProfileDoc(userAuth);
            userRef.onSnapshot(snapshot => {
                this.props.setCurrentUser({
                    id: snapshot.id,
                    ...snapshot.data()
                });
            });
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage/>)}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
