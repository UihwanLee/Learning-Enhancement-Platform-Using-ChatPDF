import React from 'react'

import { Link } from 'react-router-dom';

const Header = ( props ) => {
    return (
        <header id="headerType" className={`header__wrap ${props.element}`}>
            <div className="header__inner">
                <div className="header__logo">
                    <a href="/">web <em>site</em></a>
                </div>
                <nav className="header__menu">
                    <ul>
                        <Link to="/"><li><a>HOME</a></li></Link>
                        <Link to="/service"><li><a>SERVICE</a></li></Link>
                        <Link to="/mypage"><li><a>My Page</a></li></Link>
                        <Link to="/login"><li><a>Login</a></li></Link>
                        <Link to="/register"><li><a>Register</a></li></Link>
                        
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header