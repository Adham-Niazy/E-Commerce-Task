import React from 'react';

import './ProductInCart.scss';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import Delete from '@material-ui/icons/Delete';


const ProductInCart = props => {
    let product = props.product;
    return (
        <div className="product">
            <img src={`/images/${product.imageUrl}`} alt="Product"/>
            <div className="product__functionalty">
                <LeftArrow onClick={() => props.decrement(product.id)} style={{cursor: 'pointer', fontSize: '4rem'}} />
                <span>{product.quant}</span>
                <RightArrow onClick={() => props.increment(product.id)} style={{cursor: 'pointer', fontSize: '4rem'}}/>
            </div>
            <Delete onClick={() => props.Remove(product.id)} style={{cursor: 'pointer', fontSize: '4rem'}} />
        </div>
    );
}

export default ProductInCart;