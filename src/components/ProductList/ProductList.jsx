import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import productImg from '../../images/product.jpeg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from '../Header/Header';

const products = [
    {id: '1', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000', oldPrice: '950 000' },
    {id: '2', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '3', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '4', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '5', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '6', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '7', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
    {id: '8', img: productImg, title: 'Смартфон ZTE Blade A3 2020 1/32GB Grey', price: '769 000',  oldPrice: '950 000' },
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://cf8f-89-146-86-164.eu.ngrok.io/web-data', {
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
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <Container>
            <Header/>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mt-3">
      <Tab eventKey="home" title="Скидки">
      <Row>
            {products.map(item => (
                <ProductItem
                    img={item.productImg}
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            </Row>
      </Tab>
      <Tab eventKey="profile" title="Популярное">
      <Row>
            {products.map(item => (
                <ProductItem
                    img={item.productImg}
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            </Row>
      </Tab>
      <Tab eventKey="contact" title="Новинки">
      <Row>
            {products.map(item => (
                <ProductItem
                    img={item.productImg}
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            </Row>
      </Tab>
    </Tabs>
    </Container>
        
            
            
            
        
    );
};

export default ProductList;
