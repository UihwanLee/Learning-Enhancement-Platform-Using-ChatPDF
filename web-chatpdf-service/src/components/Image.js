import React, { useRef } from 'react';

const Image = (props) => {
    // 파일 입력 필드를 참조하기 위한 useRef 훅 사용
    const fileInputRef = useRef(null);

    // 파일 선택 버튼을 클릭할 때 파일 입력 필드를 클릭하는 함수
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    // 파일이 선택되었을 때 실행되는 함수
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; // 선택된 파일 가져오기
        // 파일을 사용하거나 처리하는 로직을 이곳에 추가
    };

    return (
        <section id="imageType" className={`imageType__wrap ${props.element}`}>
            <h2>{props.title}</h2>
            <p>본인이 필요한 영역의 파일을 선택하거나 가지고 옵니다.</p>
            <div className="image__inner container">
                <article className="image img1">
                    <h3 className="image__title">DataBase</h3>
                    <p className="image__desc">자세한 인터넷 공간</p>
                    <a className="image__btn yellow" href="/">자세히 보기</a>
                </article>
                <article className="image img2">
                    <h3 className="image__title">Algorithm</h3>
                    <p className="image__desc">자세한 단계</p>
                    <a className="image__btn yellow" href="/">자세히 보기</a>
                </article>
                <article className="image img3">
                    <h3 className="image__title">Network</h3>
                    <p className="image__desc">자세한 관계</p>
                    <a className="image__btn yellow" href="/">자세히 보기</a>
                </article>
                <article className="image img4">
                    <h3 className="image__title">Other Files</h3>
                    <p className="image__desc">더 많은 파일들 ...</p>
                    {/* 파일 입력 필드 및 버튼 */}
                    <input
                        type="file"
                        ref={fileInputRef} // 파일 입력 필드에 ref 적용
                        style={{ display: 'none' }} // 화면에 보이지 않도록 스타일 지정
                        onChange={handleFileInputChange} // 파일 입력 필드 값 변경 이벤트 핸들러
                    />
                    <button
                        className="image__btn" // 파일 선택 버튼 스타일 지정
                        onClick={handleFileButtonClick} // 파일 선택 버튼 클릭 이벤트 핸들러
                    >
                        파일선택
                    </button>
                </article>
            </div>
        </section>
    );
};

export default Image;
