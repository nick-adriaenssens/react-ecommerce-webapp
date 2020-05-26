import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDoc } from './core/firebase/firebase.utils';

class App extends React.Component {

    authSubscription;

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        this.authSubscription = auth.onAuthStateChanged(async userAuth => {
            if (!userAuth) {
                this.setState({ currentUser: null });
                return;
            }

            const userRef = await createUserProfileDoc(userAuth);
            userRef.onSnapshot(snapshot => {
                this.setState({
                    currentUser: {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
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
                <Header currentUser={this.state.currentUser} />

                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
