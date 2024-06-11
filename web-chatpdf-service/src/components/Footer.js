// 홈화면 하단 - 활용한 사이트나 개발환경 등으로 채우기
import React from 'react'

const Footer = ( props ) => {
    return (
        <footer id="footerType" className={`footer__wrap ${props.element}`}>
            <h2 className="blind">푸터 영역</h2>
            <div className="footer__inner container">
                <div className="footer__menu">
                    <div>
                        <h3>관련 사이트</h3>
                        <ul>
                            <li><a href="/">한국공학대학교</a></li>
                            <li><a href="/">학술연구정보서비스</a></li>
                            <li><a href="/">GitHub</a></li>
                            <li><a href="/">GPT</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>카테고리</h3>
                        <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/">SERVICE</a></li>
                            <li><a href="/">List</a></li>
                            <li><a href="/">Bulletin Board</a></li>
                            <li><a href="/">MyPage</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>개발환경</h3>
                        <ul>
                            <li><a href="/">React</a></li>
                            <li><a href="/">Unity</a></li>
                            <li><a href="/">WebGL</a></li>
                            <li><a href="/">Node.js</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Subject</h3>
                        <ul>
                            <li><a href="/">알고리즘</a></li>
                            <li><a href="/">네트워크</a></li>
                            <li><a href="/">운영체제</a></li>
                            <li><a href="/">데이터베이스</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>My Page</h3>
                        <ul>
                            <li><a href="/">전체 지표</a></li>
                            <li><a href="/">학습 문서 별 지표</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>개발 정보</h3>
                        <ul>
                            <li><a href="/">Server</a></li>
                            <li><a href="/">Client</a></li>
                            <li><a href="/">Frontend</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__right">
                    2022 Webstoryboy. Portfolio is Power<br />All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer