import React from 'react'

import cardBg01 from "../assets/img/card_bg01.jpg";
import cardBg02 from "../assets/img/card_bg02.jpg";
import cardBg03 from "../assets/img/card_bg03.jpg";

const cardInfo = [
    {
        img: cardBg01,
        title: "내 학습 진단율 판단",
        desc: "확인하고 나아가기"
    },
    {
        img: cardBg02,
        title: "게시판 활용",
        desc: "여러 질문을 통한 해결"
    },
    {
        img: cardBg03,
        title: "면접테스트",
        desc: "1:1 또는 1:3"
    }
]

const Card = ( props ) => {
    return (
        <section id="cardType" className={`card__wrap ${props.element}`}>
            <h2>{props.title}</h2>
            <p>
               성장을 위한 한걸음 <br />  
            </p>
            <div className="card__inner container">
                {cardInfo.map((card, key) => (
                    <article className="card" key={key}>
                        <figure className="card__header">
                            <img src={card.img} alt={card.title} />
                        </figure>
                        <div className="card__body">
                            <h3 className="tit">{card.title}</h3>
                            <p className="desc">{card.desc}</p>
                            <a className="btn" href="/">
                                더 자세히 보기 
                                <span aria-hidden="true">
                                    <svg width="52" height="8" viewBox="0 0 52 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M51.3536 4.35355C51.5488 4.15829 51.5488 3.84171 51.3536 3.64645L48.1716 0.464466C47.9763 0.269204 47.6597 0.269204 47.4645 0.464466C47.2692 0.659728 47.2692 0.976311 47.4645 1.17157L50.2929 4L47.4645 6.82843C47.2692 7.02369 47.2692 7.34027 47.4645 7.53553C47.6597 7.7308 47.9763 7.7308 48.1716 7.53553L51.3536 4.35355ZM0 4.5H51V3.5H0V4.5Z" fill="#5B5B5B"/>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </article>
                ))}
                
            </div>
        </section>
    )
}

export default Card