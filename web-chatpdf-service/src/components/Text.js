import React from 'react'

const textInfo = [
    {
        title: "01",
        desc: "독서 습관",
        src: "/"
    },{
        title: "02",
        desc: "하루 뉴스",
        src: "/"
    },{
        title: "03",
        desc: "찾아보기",
        src: "/"
    },{
        title: "04",
        desc: "대화하기",
        src: "/"
    },{
        title: "05",
        desc: "공유하기",
        src: "/"
    },{
        title: "06",
        desc: "기록하기",
        src: "/"
    }
]

const Text = ( props ) => {
    return (
        <section id="textType" className={`text__wrap ${props.element}`}>
            <span>{props.title}</span>
            <h2 className="mb70">하루를 의미있게 보내기 위한 노력</h2>
            <div className="text__inner container">
                {textInfo.map((text, key) => (
                    <div className={`text t${key+1}`} key={key}>
                        <h3 className="text__title">{text.title}</h3>
                        <p className="text__desc">{text.desc}</p>
                        <a className="text__btn" href={text.src}>더보기</a>
                    </div>
                ))}
                
            </div>
        </section>
    )
}

export default Text
