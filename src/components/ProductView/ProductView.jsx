import React from 'react';
import Button from "../Button/Button";
import './ProductView.css';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import productImg from '../../images/product1x.png'
import rating from '../../images/stars.svg'
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback } from 'react';
import { useEffect } from 'react';

const products = [
    {id: '1', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000, oldPrice: '950 000' },
    {id: '2', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '3', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '4', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '5', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '6', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '7', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
    {id: '8', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: 769000,  oldPrice: '950 000' },
]


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}


const Productview = () => {

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://uzum.probot.uz/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])



    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {

        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Оформить заказ ${getTotalPrice(newItems)}`
            })
        }
    }

    const params = useParams();


    const onAddHandler = () => {
        onAdd(product);
    }
    

    const product = products.filter(item => item.id == params.id)[0];



    return (

        <Container>
            <Col xs={12}>
                <div className="item">
                    <div className={'img'}>
                        <img src={product.img} alt="" />
                    </div>
                    <div className='info'>
                        <div className={'title-view'}>{product.title}</div>
                        <div className="rating">
                            <div className="left">
                                <img src={rating} alt="" />
                                <span>5.0 (2 Оценки)</span>
                            </div>

                            <div className="right">
                                112 Заказов
                            </div>
                        </div>


                        
                        <div className={'price'}>
                            <span className='n-price'>{product.price} сум</span>
                            <span className='o-price'><s>{product.oldPrice} сум</s></span>
                        </div>
                    </div>
                </div>
                <div className='line'></div>   

                <div className='basket'>
                    <div className="total">
                        <div>Цена<div/>
                        <div class="price">769 000 сум</div>
                    </div>
                </div>  
                <div className="add">
                        <Button className={'add-btn'} onClick={onAddHandler}>
                            В корзину
                        </Button>
                    </div>
                </div>    
                
            </Col>
        </Container>
        
       
            
        
    );
};

export default Productview;
