import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import OrderSummery from './OrderSummery/OrderSummery';
import './ReviewOrder.scss';

const ReviewOrder = props => {
    let listOfProducts =  Object.keys(props.selectedProducts).map((key) => {
        return (
            <OrderSummery
                key={key}
                product={props.selectedProducts[key]}
            />
            );
        });
    if ( props.selectedProducts.length === 0 ) {
        listOfProducts = <Redirect to="/Products" />
    }
    return(
        <div className="list-container">
            {listOfProducts}
            <div style={{textAlign: 'center'}}>
            <Link to={{pathname: '/Order/Checkout'}} style={{textDecoration: 'none'}}>
                <button className="btn">
                    <span className="btn__visible btn__visible--smaller">PROCEED TO CHECKOUT</span>
                    <span className="btn__hidden btn__hidden--smaller">{`Total Price: ${props.totalPrice} EGP`}</span>
                </button>
            </Link>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        selectedProducts: state.selectedProducts,
        totalPrice: state.totalPrice
    }
}
export default connect(mapStateToProps)(ReviewOrder);