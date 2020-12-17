import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import './ContactData.scss';

class ContactData extends Component {
    state = {
        orderForm: {
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: 'Address'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                label: 'E-mail'
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    isValidEgyptianNumber: true
                },
                valid: false,
                touched: false,
                label: 'Phone Number (without country code)'
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.isEmail ) {
            const pattern = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value) && isValid;
        }
        if ( rules.isValidEgyptianNumber ) {
            const pattern = /(01)[0-9]{9}/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier] 
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for ( let elements in updatedOrderForm ) {
            formIsValid = updatedOrderForm[elements].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    
    orderHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        // THIS CODE IS FOR ACCESSING THE DATABASE PUT I FACED A PROBLEM WITH IT (CORS ORIGIN) and I Tried
        // TO SOLVE IT WITH MANY EXTENSIONS BUT THOSE EXTENSIONS BROUGHT MORE ERRORS SO I WILL LEAVE THE CODE
        // HERE TO SHOW THAT I KNOW THIS CONCEPTS

        // axios.post('https://ibtikar-projec-default-rtdb.firebaseio.com/Orders',formData)
        //     .then( response => {
        //       console.log(response);
        //     })
        //     .catch( error => {
        //         console.log(error);
        //     } );
        // THIS DATA NEED ALSO ARRAY OF SELECTED PRODUCTS AND TOTAL PRICE
        console.log(formData);
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.orderForm ) {
            formElementsArray.push({
                id: key,
                setup: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map( el => 
                                <Input 
                                    key={el.id}
                                    elementType={el.setup.elementType} 
                                    elementConfig={el.setup.elementConfig} 
                                    invalid={!el.setup.valid}
                                    shouldValidate={el.setup.validation}
                                    touched={el.setup.touched}
                                    value={el.setup.value}
                                    label={el.setup.label}
                                    changed={(event) => this.inputChangeHandler(event, el.id)}/>)}
                                    <div className={!this.state.formIsValid ? 'Invalid-btn' : ''}>
                                        <Button btnType="Add" disabled={!this.state.formIsValid}>ORDER NOW!</Button>
                                    </div>
                    </form>);
        if ( this.props.selectedProducts.length === 0 ) {
            form = <Redirect to="/Products" />
        }
        return (
            <div className="form-container">
                <h2>Enter your data please</h2>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        selectedProducts: state.selectedProducts,
        totalPrice: state.totalPrice
}
}

export default connect(mapStateToProps)(ContactData);