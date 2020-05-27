import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item, dispatch }) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={item.imageUrl} alt='item' />
        </div>
        <span className="name">{ item.name }</span>
        <span className="quantity">
            <div className="arrow" onClick={() => dispatch(removeItem(item))}>&#10094;</div>
            <span className="value">{ item.quantity }</span>
            <div className="arrow" onClick={() => dispatch(addItem(item))}>&#10095;</div>
        </span>
        <span className="price">{ item.price }</span>
        <div className="remove-button" onClick={() => dispatch(clearItemFromCart(item))}>&#10005;</div>
    </div>
)

export default connect()(CheckoutItem);