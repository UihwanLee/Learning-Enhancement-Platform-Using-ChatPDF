import React from 'react'

const textInfo = [
    {
        title: "01",
        desc: "///",
        src: "/"
    },{
        title: "02",
        desc: "///",
        src: "/"
    },{
        title: "03",
        desc: "///",
        src: "/"
    },{
        title: "04",
        desc: "///",
        src: "/"
    },{
        title: "05",
        desc: "///",
        src: "/"
    },{
        title: "06",
        desc: "///",
        src: "/"
    }
]

const Text = ( props ) => {
    return (
        <section id="textType" className={`text__wrap ${props.element}`}>
            <span>{props.title}</span>
            <h2 className="mb70">뭐 넣을거 없나..</h2>
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
