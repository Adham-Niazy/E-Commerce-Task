import React from 'react';
import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingIcon from '@material-ui/icons/ShoppingCart';
import ProfilePicture from '../../assets/Profile.jpg';
import Logo from '../../assets/Logos/logo.png'
import './Header.scss';



const HeaderComponent = (props) => {
    return (
        <header className="header">
            {/* FIRST CHILD IN HEADER FLEX BOX  */}
            <Link to="/Products">
                <img src={Logo} alt="Trillo logo" className="logo" />
            </Link>
            {/* SECOND CHILD IN HEADER FLEX BOX  */}
            <form action="#" className="search">
                <input type="text" className="search__input" placeholder="Search Hotels"/>
                <button className="search__button">
                    <SearchIcon fontSize="large" />
                </button>
            </form>
            {/* THIRD CHILD IN HEADER FLEX BOX  */}
            <nav className="user-nav">
                {/* 2nd CHILD OF USER NAVIGATION  */}
                <div className="user-nav__icon-box" onClick={props.Toggle}>
                    <ShoppingIcon fontSize="large" />
                    <span className="user-nav__notification">{props.cartNum}</span>
                </div>
                {/* 3rd CHILD OF USER NAVIGATION AND HE IS DOUBLE THE TWO CHILDS */}
                <div className="user-nav__user">
                    <img src={ProfilePicture} alt="Profile" className="user-nav__user-photo" />
                    <span className="user-nav__user-name">Adham</span>
                </div>
            </nav>
        </header>
    );
}

// const mapStateToProps {

// }

// export default connect()(HeaderComponent);
export default HeaderComponent;