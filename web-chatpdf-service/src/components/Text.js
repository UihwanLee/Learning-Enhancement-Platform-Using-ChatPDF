import React, { useState, useRef } from 'react';

const textInfo = [
    {
        title: "01",
        desc: "한줄 독서 습관",
        details: "책은 모든 연령의 사람들에게 필수적인 것이며, 인간은 독서를 통해 더 나은 사람이 된다.",
        src: "/"
    },
    {
        title: "02",
        desc: "한줄 인생 명언",
        details: "오늘 할 수 있는 일에 최선을 다하라. 내일은 이미 준비되어 있다.",
        src: "/"
    },
    {
        title: "03",
        desc: "직접 찾아보기",
        details: "직접 찾아보기는 원하는 정보를 스스로 검색하고 탐구하는 과정을 의미한다.",
        src: "/"
    },
    {
        title: "04",
        desc: "소통하기",
        details: "말하는 법을 배운 후에는 듣는 법을 배워야 한다. 잘 듣는 것이야말로 진정한 소통의 시작이다.",
        src: "/"
    },
    {
        title: "05",
        desc: "공유하기",
        details: "개인 간의 관계를 강화하고, 신뢰를 쌓는 데 중요하다.",
        src: "/"
    },
    {
        title: "06",
        desc: "기록하기",
        details: "기록은 자기성찰과 개인 성장을 도모한다. 과거의 행동과 결정을 돌아보며 자기성찰을 하고, 앞으로의 발전 방향을 설정할 수 있다.",
        src: "/"
    }
];

const Modal = ({ show, onClose, content, position }) => {
    if (!show) {
        return null;
    }

    const modalPositionStyle = {
        ...modalContentStyle,
        top: position.top,
        left: position.left
    };

    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-content" style={modalPositionStyle}>
                <span className="close" onClick={onClose} style={closeStyle}>&times;</span>
                <h2>{content.title}</h2>
                <p>{content.details}</p>
            </div>
        </div>
    );
}

const modalStyle = {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)'
};

const modalContentStyle = {
    position: 'absolute',
    backgroundColor: '#fefefe',
    padding: '20px',
    border: '1px solid #888',
    width: '300px',  // 팝업 크기 조정
};

const closeStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
};

const Text = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', details: '' });
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const buttonRefs = useRef([]);

    const handleShowModal = (text, index) => {
        const buttonRect = buttonRefs.current[index].getBoundingClientRect();
        setModalPosition({ top: buttonRect.top + buttonRect.height, left: buttonRect.left });
        setModalContent(text);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <section id="textType" className={`text__wrap ${props.element}`}>
            <span>{props.title}</span>
            <h2 className="mb70">하루를 의미있게 보내기 위한 노력</h2>
            <div className="text__inner container">
                {textInfo.map((text, key) => (
                    <div className={`text t${key + 1}`} key={key}>
                        <h3 className="text__title">{text.title}</h3>
                        <p className="text__desc">{text.desc}</p>
                        <button
                            className="text__btn"
                            onClick={() => handleShowModal(text, key)}
                            ref={el => buttonRefs.current[key] = el}
                        >
                            더보기
                        </button>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} content={modalContent} position={modalPosition} />
        </section>
    )
}

export default Text;
