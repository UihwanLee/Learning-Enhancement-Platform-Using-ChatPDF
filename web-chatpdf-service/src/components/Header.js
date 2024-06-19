import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  color: #000;
  padding: 20px 0;
  width: 100%; /* 화면 전체 너비 */
  background-color: #ffffff; /* 예시 배경색 */
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
`;

const Menu = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
  }

  ul li {
    margin-left: 20px;
  }

  ul li:first-child {
    margin-left: 0;
  }

  ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
  }
`;

const Header = ({ element }) => {
  return (
    <HeaderContainer id="headerType" className={`header__wrap ${element}`}>
      <HeaderInner className="header__inner">
        <Logo className="header__logo">
          <Link to="/" style={{ color: '#111111', textDecoration: 'none' }}>
            TUK STUDY<br/>
            chat pdf
          </Link>
        </Logo>
        <Menu className="header__menu">
          <ul>
            <li><Link to="/" style={{ color: '#111111', textDecoration: 'none' }}>HOME</Link></li>
            <li><Link to="/service" style={{ color: '#111111', textDecoration: 'none' }}>SERVICE</Link></li>
            <li><Link to="/" style={{ color: '#111111', textDecoration: 'none' }}>List</Link></li>
            <li><Link to="/bulletinboard" style={{ color: '#111111', textDecoration: 'none' }}>BulletinBoard</Link></li>
            <li><Link to="/mypage" style={{ color: '#111111', textDecoration: 'none' }}>MyPage</Link></li>
          </ul>
        </Menu>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
