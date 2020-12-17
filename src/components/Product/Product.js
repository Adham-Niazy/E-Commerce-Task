import React from 'react';
import { Link } from "react-router-dom";

import AddIcon from '@material-ui/icons/AddCircleOutline';
import CheckedIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '../UI/Button/Button';
import './Product.scss';


const ProductItem = (props) => {
    let select = <AddIcon style={{fontSize: '2rem', marginLeft: '0.5rem'}} />;
    if ( props.productDetail.selected ) {
        select = <CheckedIcon style={{fontSize: '2rem', marginLeft: '0.5rem'}} />
    }
    return (
        <>
            <Link className={`${props.display}-item`} to={`Products/${props.productDetail.id}`} style={{ textDecoration: 'none' }}>
            <img src={`/images/${props.productDetail.imageUrl}`} alt={props.productDetail.productCateg}/> 
            <div className={`${props.display}-item__details`}>
                <div>
                    <h2>
                        {props.productDetail.productName}
                    </h2>
                    <p>
                        {"- "+props.productDetail.productCateg}
                    </p>

                    <div className={`${props.display}-item__price`}>
                        <p className="price">
                        {"- "+props.productDetail.productPrice}
                        </p>
                        <p className="currency">
                            EGP
                        </p>
                    </div>
                </div>
                <Button 
                    btnType="Add" 
                    disabled={props.productDetail.selected}
                    clicked={() => props.selectingProduct(props.productDetail.id)}>
                    {props.productDetail.selected ? "Added" : "Add to cart"}
                    {select}
                </Button>
            </div>
        </Link>
        </>
    );
}

export default ProductItem;