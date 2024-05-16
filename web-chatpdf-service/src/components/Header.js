import React from 'react'

import { Link } from 'react-router-dom';

const Header = ( props ) => {
    return (
        <header id="headerType" className={`header__wrap ${props.element}`}>
            <div className="header__inner">
                <div className="header__logo">
                    <a href="/">TUK STUDY <em>chat pdf</em></a>
                </div>
                <nav className="header__menu">
                    <ul>
                        <Link to="/"><li><a>HOME</a></li></Link>
                        <Link to="/service"><li><a>SERVICE</a></li></Link>
                        <Link to="/"><li><a>List</a></li></Link>
                        <Link to="/"><li><a>Bulletin Board</a></li></Link>
                        <Link to="/mypage"><li><a>My Page</a></li></Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header