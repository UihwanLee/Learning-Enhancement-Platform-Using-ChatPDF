import React from 'react'

const ImgText = ( props ) => {
    return (
        <section id="imgTextType" className={`imgText__wrap ${props.element}`}>
            <h2 className="blind">{props.title}</h2>
            <div className="imgText__inner container">
                <div className="imgText__txt">
                    <span className="small">활용 가능한 추천 사이트</span>
                    <h3 className="title">유용한 사이트 살펴보기</h3>
                    <p className="desc">본인의 상태 확인 후 공부할 자료들 추천 사이트</p>
                    <ul className="list">
                        <li><a href="/">학교 홈페이지</a></li>
                        <li><a href="/">논문</a></li>
                        <li><a href="/">논문</a></li>
                        <li><a href="/">논문</a></li>
                        <li><a href="/">깃허브 사이트</a></li>
                        <li><a href="/">Youtube 사이트</a></li>
                    </ul>
                </div>
                <div className="imgText__img img1">
                    <a href="/">학교 홈페이지</a>
                </div>
                <div className="imgText__img img2">
                    <a href="/" className="blue">Youtube 사이트</a>
                </div>
            </div>
        </section>
    )
}

export default ImgText