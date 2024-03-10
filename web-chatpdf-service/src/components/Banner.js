import React from 'react'

const Banner = ( props ) => {
    return (
        <section id="bannerType" className={`banner__wrap ${props.element}`}>
            <h2 className="blind">{props.title}</h2>
            <div className="banner__inner">
                <h3 className="title">한국공학대학교</h3>
                <p className="desc">
                    세션5팀이던가 .. 암튼 어쩌구
                </p>
                <span className="small">먼가 쓰고 싶은데</span>
            </div>
        </section>
    )
}

export default Banner