import * as actionTypes from './actions';

const initialState = {
    products: [
        {
            id: 0,
            imageUrl: 'item_XXL_131931841_484f5e5fae59b.jpg',
            productName: 'Apple iPhone 12 Pro 128GB 6 GB RAM, Gold',
            productCateg: 'Electronic Device',
            productPrice: 25100.00,
            selected: false
        },
        {
            id: 1,
            imageUrl: 'item_XXL_68312946_2daabcaa60726.jpg',
            productName: 'Apple iPhone 11 with FaceTime - 128GB, 4GB RAM, 4G LTE, Black, Single SIM & E-SIM',
            productCateg: 'Electronic Device',
            productPrice: 13792.00,
            selected: false
        },
        {
            id: 2,
            imageUrl: 'item_XXL_66243827_c9df9e073331d.jpg',
            productName: 'Samsung Galaxy Note 10 Dual SIM - 256GB, 8GB RAM, 4G LTE, Aura Glow',
            productCateg: 'Electronic Device',
            productPrice: 12499.00,
            selected: false
        },
        {
            id: 3,
            imageUrl: 'item_XXL_68315136_28a0fc103e89b.jpg',
            productName: 'Apple iPhone 11 Pro Max with FaceTime - 64GB, 4GB RAM, 4G LTE, Space Gray, Single SIM & E-SIM',
            productCateg: 'Electronic Device',
            productPrice: 19249.00,
            selected: false
        },
        {
            id: 4,
            imageUrl: 'item_XXL_131625515_d99aa4e7e7e52.jpg',
            productName: 'Samsung Galaxy Note 20 Mobile Phone, Dual SIM, 6.7 Inch, 256 GB, 8 GB RAM, 4G LTE, 4300mAh - Mystic',
            productCateg: 'Electronic Device',
            productPrice: 13799.00,
            selected: false
        },
        {
            id: 5,
            imageUrl: 'item_XXL_131931837_3da4f0c63b097.jpg',
            productName: 'Apple iPhone 12 128GB 4 GB RAM, Black',
            productCateg: 'Electronic Device',
            productPrice: 17345.55,
            selected: false
        },
        {
            id: 6,
            imageUrl: 'item_XXL_131938444_63e0d342870e0.jpg',
            productName: 'Apple iPhone 12 Pro 128GB 6 GB RAM, Pacific Blue',
            productCateg: 'Electronic Device',
            productPrice: 24459.99,
            selected: false
        },
        {
            id: 7,
            imageUrl: 'item_XXL_68312942_08a7220e0e6e4.jpg',
            productName: 'Apple iPhone 11 with FaceTime - 128GB, 4GB RAM, 4G LTE, Green, Single SIM & E-SIM',
            productCateg: 'Electronic Device',
            productPrice: 13979.00,
            selected: false
        },
        {
            id: 8,
            imageUrl: 'item_XXL_132101848_d8d6720636b86.jpg',
            productName: 'Samsung Galaxy M51 Case, Auto Focus Litchi TPU Slim Back Cover - Blue',
            productCateg: 'Mobile Accessory',
            productPrice: 48.50,
            selected: false
        },
        {
            id: 9,
            imageUrl: 'item_XXL_11872096_17508754.jpg',
            productName: 'YunTeng 228 Mini Tripod with Phone Holder Clip Desktop tripod For camera for mobile phone',
            productCateg: 'Mobile Accessory',
            productPrice: 13.00,
            selected: false
        },
    ],
    selectedProducts: [],
    totalPrice: 0,
    totalSelectedProducts: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PRODUCTS:
            state.products = action.data
            return {
                ...state
            }
        case actionTypes.SELECT_PRODUCT:
            const selectedItem = { ...state.products[action.selectedItem], quant: 1, selected: true };
            state.products[action.selectedItem]['selected'] = true;
            state.selectedProducts.push(selectedItem);
            return {
                ...state,
                totalPrice: state.totalPrice + (selectedItem["productPrice"]),
                totalSelectedProducts: state.totalSelectedProducts + 1
            }
        case actionTypes.REMOVE_PRODUCT:
            // const selectedItemPrice = state.products[action.selectedItem]['productPrice'] * state.products[action.selectedItem]['quant'];
            let selectedItemPrice;
            const restProducts = state.selectedProducts.filter(wantedToDelete => {
                if ( wantedToDelete['id'] === action.selectedItem )
                    selectedItemPrice = wantedToDelete['productPrice'] * wantedToDelete['quant'];
                return wantedToDelete['id'] !== action.selectedItem
                });
            state.products[action.selectedItem]['selected'] = false;
            return {
                ...state,
                selectedProducts: restProducts,
                totalPrice: state.totalPrice - (selectedItemPrice),
                totalSelectedProducts: state.totalSelectedProducts - 1
            }
        case actionTypes.ADD_QUANT:
            let selectedPrice;
            const updatedProducts = state.selectedProducts.map(element => {
                if ( element.id === action.selectedItem ) {
                    selectedPrice = element.productPrice;
                    return {
                        ...element,
                        quant: +element['quant'] + 1
                    }
                }
                return element;
            })
            return {
                ...state,
                selectedProducts: updatedProducts,
                totalPrice: state.totalPrice + (selectedPrice)
            }
        case actionTypes.REMOVE_QUANT:
            let price;
            let selectedProductPosition;
            let couldBeDecreased = false;
            state.selectedProducts.map((element, index) => {
                if ( element.id === action.selectedItem ) {
                    price = element.productPrice;
                    if ( element['quant'] > 1 ) {
                        couldBeDecreased = true;
                        selectedProductPosition = index;
                    }
                }
                return element;
            });
            if ( couldBeDecreased ) {
                state.selectedProducts[selectedProductPosition]['quant'] = state.selectedProducts[selectedProductPosition]['quant'] - 1;
                return {
                    ...state,
                    selectedProducts: [
                        ...state.selectedProducts
                    ],
                    totalPrice: state.totalPrice - price
                }
            }
            return state
        case actionTypes.DYNAMIC_QUANT:
            let newQuant = action.newQuant;
            let currentQunat;
            let positionOfProduct;
            state.selectedProducts.map((element, index) => {
                if ( element.id === action.selectedItem ) {
                    currentQunat = element.quant;
                    positionOfProduct = index;
                }
                return element;
            });
            const productPrice = state.selectedProducts[positionOfProduct]['productPrice'];
            if ( newQuant > currentQunat ) {
                state.totalPrice =  state.totalPrice + (newQuant * productPrice - currentQunat * productPrice);
                state.selectedProducts[positionOfProduct]['quant'] = newQuant;
            } else if ( currentQunat > newQuant ) {
                state.totalPrice =  state.totalPrice + (newQuant * productPrice - currentQunat * productPrice);
                state.selectedProducts[positionOfProduct]['quant'] = newQuant;
            }
            return {
                ...state,
                selectedProducts: [
                    ...state.selectedProducts
                ]
            }
        default:
            return state;
    }
};

export default reducer;