import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import './App.scss';
import LayoutContainer from './containers/Layout';
import ProductsContainer from './containers/Products/Products';
import ProductDetail from "./components/ProductDetail/ProductDetail";
import PageNotFound from './components/PageNotFound/PageNotFound';
import ReviewOrder from './components/Order/ReviewOrder';
import ContactData from './containers/ContactData/ContactData';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/Products/:id" component={ProductDetail} />
        <Route path="/Products" component={ProductsContainer} />  
        <Route exact path="/Order" component={ReviewOrder} />  
        <Route path="/Order/Checkout" component={ContactData} />  
        <Route path="/404" component={PageNotFound} />  
        <Redirect to="/404" />
      </Switch>
    );
    return(
      <div className="App">
        <LayoutContainer {...this.props}>
          {routes}
        </LayoutContainer>
      </div>
    );
  }
}

export default withRouter(App);
