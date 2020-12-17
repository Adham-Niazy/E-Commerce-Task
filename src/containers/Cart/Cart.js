import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import ProductInCart from '../../components/ProductInCart/ProductInCart';
import * as actionTypes from '../../store/actions';
import Button from "../../components/UI/Button/Button";
import './Cart.scss';

class CartContainer extends Component {
    render() {
        let displayCart = this.props.display ? 'cart-container' : 'none';
        let length = this.props.selectedProducts.length;
        let listOfProducts = (<div className="empty-container"><h1 className="empty">Opps! Your Cart is empty</h1></div>);
        if (length !== 0) {
                listOfProducts =  Object.keys(this.props.selectedProducts).map((key) => {
                return (
                    <ProductInCart
                        key={key}
                        product={this.props.selectedProducts[key]}
                        Remove={this.props.onRemovingProduct}
                        increment={this.props.onIncrementProduct}
                        decrement={this.props.onDecrementProduct}
                    />
                    );
                });
        }
        return(
            <div className={displayCart}>
                <div className="cart-container__heading">
                    <h1 className="heading__primary">Shopping Cart</h1>
                </div>
                <div className="cart-container__items">
                    {listOfProducts}
                </div>
                <Link to="/Order" style={{ textDecoration: 'none' }} className={length === 0 ? 'none' : ''}>
                    <Button 
                        btnType="Order" 
                        disabled={length === 0}
                        >
                            REVIEW ORDER
                    </Button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedProducts: state.selectedProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectingProduct: (productId) => dispatch({type: actionTypes.SELECT_PRODUCT, selectedItem: productId}),
        onRemovingProduct: (productId) => dispatch({type: actionTypes.REMOVE_PRODUCT, selectedItem: productId}),
        onIncrementProduct: (productId) => dispatch({type: actionTypes.ADD_QUANT, selectedItem: productId}),
        onDecrementProduct: (productId) => dispatch({type: actionTypes.REMOVE_QUANT, selectedItem: productId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);