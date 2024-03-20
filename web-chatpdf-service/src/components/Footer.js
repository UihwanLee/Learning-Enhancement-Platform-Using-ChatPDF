// 홈화면 하단 - 활용한 사이트나 개발환경 등으로 채우기
import React from 'react'

const Footer = ( props ) => {
    return (
        <footer id="footerType" className={`footer__wrap ${props.element}`}>
            <h2 className="blind">푸터 영역</h2>
            <div className="footer__inner container">
                <div className="footer__menu">
                    <div>
                        <h3>사이트</h3>
                        <ul>
                            <li><a href="/">논문 사이트</a></li>
                            <li><a href="/">학교 사이트</a></li>
                            <li><a href="/">깃허브 사이트</a></li>
                            <li><a href="/">뉴스 사이트</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>헤더 유형</h3>
                        <ul>
                            <li><a href="/">헤더 유형01</a></li>
                            <li><a href="/">헤더 유형02</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>슬라이드 유형</h3>
                        <ul>
                            <li><a href="/">슬라이드 유형01</a></li>
                            <li><a href="/">슬라이드 유형01</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>이미지 유형</h3>
                        <ul>
                            <li><a href="/">이미지 유형01</a></li>
                            <li><a href="/">이미지 유형02</a></li>
                            <li><a href="/">이미지/텍스트 유형01</a></li>
                            <li><a href="/">이미지/텍스트 유형01</a></li>
                            <li><a href="/">텍스트 유형01</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>카드 유형</h3>
                        <ul>
                            <li><a href="/">카드 유형01</a></li>
                            <li><a href="/">카드 유형02</a></li>
                            <li><a href="/">카드 유형03</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>푸터 유형</h3>
                        <ul>
                            <li><a href="/">푸터 메뉴 유형01</a></li>
                            <li><a href="/">푸터 컨택트 유형02</a></li>
                            <li><a href="/">푸터 이메일 유형03</a></li>
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