import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        
        <Col xs={6}>
            <Link to={`product/${product.id}`} className="item">
                <div className={'img'}>
                    <img src={product.img} alt="" />
                </div>

                <div className='info'>
                    <div className={'title'}>{product.title}</div>
                    <div className={'oldPrice'}>
                        <span><s>{product.oldPrice} сум</s></span>
                    </div>
                    <div className={'price'}>
                        <span>{product.price} сум</span>
                    </div>
                </div>
            </Link>
           
            {/* <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button> */}
        </Col>
            
        
    );
};

export default ProductItem;
