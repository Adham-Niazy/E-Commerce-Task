import React , { Component } from 'react';
import { connect } from 'react-redux';

import GridOnIcon from '@material-ui/icons/GridOn';
import GridOFFIcon from '@material-ui/icons/GridOff';
import ProductItem from '../../components/Product/Product';
import * as actionTypes from "../../store/actions";
import './Products.scss';

class ProductsContainer extends Component {
    state = {
        listDisplay: true
    }

    DisplayToggleHandler = () => {
        this.setState(prevState => {
            return {listDisplay: !prevState.listDisplay}
        });
    } 
    render() {
        let displayType = this.state.listDisplay ? 'list' : 'grid';
        let productsList = Object.keys(this.props.prods).map((key) => {
            return (
                <ProductItem
                    key={key}
                    productDetail={this.props.prods[key]}
                    display={displayType}
                    selectingProduct={this.props.onSelectingProduct}
                />
                );
            });
        let currentDisplayIcon = this.state.listDisplay ? <GridOnIcon style={{cursor: 'pointer'}} onClick={this.DisplayToggleHandler} className="icon" /> : <GridOFFIcon style={{cursor: 'pointer'}} onClick={this.DisplayToggleHandler} className="icon" />
        return (
            <>
            <div className="container-icon">
                {currentDisplayIcon}
            </div>
            <div className={`${displayType}-container`}>
                {productsList}
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        prods: state.products
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectingProduct: (productId) => dispatch({type: actionTypes.SELECT_PRODUCT, selectedItem: productId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);