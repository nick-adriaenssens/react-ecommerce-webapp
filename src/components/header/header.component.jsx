import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../core/firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = ({ currentUser }) => (
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
        </div>

    </div>
)

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(Header);