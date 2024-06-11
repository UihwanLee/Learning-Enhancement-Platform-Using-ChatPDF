import React from 'react';

const ImgText = (props) => {
    return (
        <section id="imgTextType" className={`imgText__wrap ${props.element}`}>
            <h2 className="blind">{props.title}</h2>
            <div className="imgText__inner container">
                <div className="imgText__txt">
                    <span className="small">활용 가능한 추천 사이트</span>
                    <h3 className="title">유용한 사이트 살펴보기</h3>
                    <p className="desc">필요한 정보 바로 들어가기</p>
                    <ul className="list">
                        <li><a href="https://www.tukorea.ac.kr" target="_blank" rel="noopener noreferrer">TUK</a></li>
                        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                        <li><a href="http://www.riss.kr" target="_blank" rel="noopener noreferrer">RISS</a></li>
                        <li><a href="https://www.chatpdf.com" target="_blank" rel="noopener noreferrer">ChatPDF</a></li>
                        <li><a href="https://www.openai.com/chatgpt" target="_blank" rel="noopener noreferrer">ChatGPT</a></li>
                    </ul>
                </div>
                <div className="imgText__img img1">
                    <a href="https://www.tukorea.ac.kr" target="_blank" rel="noopener noreferrer">학교 홈페이지</a>
                </div>
                <div className="imgText__img img2">
                    <a href="https://www.youtube.com" className="blue" target="_blank" rel="noopener noreferrer">YouTube 사이트</a>
                </div>
            </div>
        </section>
    )
}

export default ImgText;
