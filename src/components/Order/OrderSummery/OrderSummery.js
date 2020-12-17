import React from 'react';

import './OrderSummery.scss';

const OrderSummery = props => {
    let product = props.product;
    return(
        <div className="order-summery">
            <h2>{product.productName}</h2>
            <h3>{`Price per item: ${product.productPrice} EGP`}</h3>
            <h3>{`QTY: ${product.quant}`}</h3>
            <h3>{`Total price(for this Item): ${product.quant * product.productPrice} EGP`}</h3>
        </div>
    );
}
export default OrderSummery;