import React , { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import HeaderComponent from '../../components/Header';
import CartContainer from '../Cart/Cart';
import * as actionTypes from '../../store/actions';
import './Layout.scss';





class LayoutContainer extends Component {
    state = {
        showSideDrawer: false,
    }   

    SideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    componentDidMount () {
        // THIS CODE IS FOR ACCESSING THE DATABASE PUT I FACED A PROBLEM WITH IT (CORS ORIGIN) and I Tried
        // TO SOLVE IT WITH MANY EXTENSIONS BUT THOSE EXTENSIONS BROUGHT MORE ERRORS SO I WILL LEAVE THE CODE
        // HERE TO SHOW THAT I KNOW THIS CONCEPTS

        // axios.get('https://ibtikar-projec-default-rtdb.firebaseio.com/')
        //     .then( response => {
        //          onFetchingProducts(response.data)
        //     })
        //     .catch( error => {
        //         console.log(error);
        //     } );
    }
    render() {
        let attachedClasses = ['sidebar', 'closed'];
        if  (this.state.showSideDrawer) {
            attachedClasses = ['sidebar', 'open'];
        }
        return (
            <div className="container">
                <HeaderComponent cartNum={this.props.cartNumber} Toggle={this.SideDrawerToggleHandler}/>
                <div className="content">
                    <main className="info-window">
                        {this.props.children}
                    </main>
                    <div className={attachedClasses.join(' ')}>
                        <CartContainer display={this.state.showSideDrawer} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartNumber: state.totalSelectedProducts,
        allProducts: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingProducts: (arrayOfProducts) => dispatch({type: actionTypes.FETCH_PRODUCTS, data: arrayOfProducts})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);