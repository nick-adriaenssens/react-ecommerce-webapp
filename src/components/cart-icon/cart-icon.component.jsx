import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ dispatch, itemCount }) => (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
        <ShoppingBagIcon className='shopping-icon' />
        <span className='item-count'>{ itemCount }</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps)(CartIcon);