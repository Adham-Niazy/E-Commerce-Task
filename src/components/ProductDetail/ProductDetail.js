import React from 'react';
import { Redirect, useParams } from "react-router-dom";
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import CheckedIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '../UI/Button/Button';
import * as actionTypes from "../../store/actions";

import './ProductDetail.scss';

const ProductDetail = (props) => {
    const {id} = useParams();
    let goodId = parseInt(id);
    let template = <Redirect to="/404" />;
    if ( goodId < 10 && goodId >= 0 && !isNaN(goodId) ) {
        let product = props.prods[(+goodId)];
        let select = <AddIcon style={{fontSize: '2rem', marginLeft: '0.5rem'}} />;
        let currentQuantity = 0;
        if ( product.selected ) {
            select = <CheckedIcon style={{fontSize: '2rem', marginLeft: '0.5rem'}} />
            props.selectedProducts.map((element) => {
                if ( element.id === product.id ) {
                    currentQuantity = element.quant;
                }
            })
        }
        template = (
            <div className="product-container">
            <div className="image-box">
                <img src={`/images/${product.imageUrl}`} alt={product.productCateg}/> 
            </div>
            <div className="disc-box">
                <h2>{product.productName}</h2>
                <h3>{"- "+product.productCateg}</h3>
                <div className="item__price">
                    <p className="price">
                    {"- "+product.productPrice}
                    </p>
                    <p className="currency">
                        EGP
                    </p>
                </div>
                <Button 
                    btnType="Add" 
                    disabled={product.selected}
                    clicked={() => props.onSelectingProduct(product.id)}>
                    {product.selected ? "Added" : "Add to cart"}
                    {select}
                </Button>
                <div className={product.selected ? "input-box" : "none"}>
                    <span className="quantLabel">QTY : </span>
                    <input className="quantInput" type="number" value={currentQuantity} onChange={(event) => props.onAddingDynamicQuant(product.id, event.target.value)}/>
                </div>
            </div>
            </div>
        );
    }

    return template;
}

const mapStateToProps = state => {
    return {
        prods: state.products,
        selectedProducts: state.selectedProducts
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectingProduct: (productId) => dispatch({type: actionTypes.SELECT_PRODUCT, selectedItem: productId}),
        onAddingDynamicQuant: (productId, newQuant) => dispatch({type: actionTypes.DYNAMIC_QUANT, selectedItem: productId, newQuant: newQuant})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);