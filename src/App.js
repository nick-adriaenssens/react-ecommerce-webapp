import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

function App() {
  return (
    <div>
        <Header />

        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/signin' component={SignInSignUpPage} />
            {/*<Route exact path='/shop/hats' component={HatsPage} />*/}
        </Switch>
    </div>
  );
}

export default App;
