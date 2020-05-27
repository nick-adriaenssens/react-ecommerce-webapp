import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../core/firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../card-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, cartHidden }) => (
    <div className="header">
        <Link to='/' className="logo-container">
            <Logo className='logo' />
        </Link>

        <div className="options">
            <Link to='/shop' className='option' >SHOP</Link>
            {
                currentUser
                    ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    : <Link to='/signin' className='option' >SIGN IN</Link>
            }
            <CartIcon />
        </div>

        { cartHidden ? null : <CartDropdown /> }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);