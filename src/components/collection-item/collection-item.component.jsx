import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';

const CollectionItem = ({ item, addItem }) => (
    <div className="collection-item">
        <div className="image" style={{
            backgroundImage: `url(${item.imageUrl})`
        }}/>
        <div className='collection-footer'>
            <div className="name">{ item.name }</div>
            <div className="price">{ item.price }</div>
        </div>
        <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
    </div>
)

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);