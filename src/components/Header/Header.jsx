import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import logo from '../../images/search.svg'
import slide from '../../images/slide1.jpeg'
import search from '../../images/icons/search.png'
import heart from '../../images/icons/heart.png'
import profile from '../../images/icons/profile.png'
import basket from '../../images/icons/basket.png'
import uzum from '../../images/icons/uzum.svg'

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <>
        <div className={'header'}>

            <div className="search">
                <div className="search-icon">
                    <img src={logo} alt="" />
                </div>
                <input type="text" placeholder='Искать товары и категории'/>
            </div>

            <div className="slide">
                <img src={slide} alt="" />
            </div>

           

            {/* <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span> */}
        </div>

<div className="bottom">
<ul>
    <li>
        <img src={uzum}/>
        <span>Главная</span>
    </li>
    <li>
        <img src={search}/>
        <span>Поиск</span>
    </li>
    <li>
        <img src={basket}/>
        <span>Корзина</span>
    </li>
    <li>
        <img src={heart}/>
        <span>Желания</span>
    </li>
    <li>
        <img src={profile}/>
        <span>Профиль</span>
    </li>
</ul>
</div>

</>
    );
};

export default Header;
