import React from 'react'

import './assets/css/reset.css'
import './assets/css/style.css'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Slider from './components/Slider'
import Image from './components/Image'
import ImgText from './components/ImgText'
import Card from './components/Card'

import Text from './components/Text'

function App() {
    return (
        <div>
            <Header element="nexon" />
            <Main>
                <Slider element="nexon" />
                <Image element="section nexon" title="내가 부족한 부분 탐색" />
                <ImgText element="section nexon gray" title="이미지 텍스트 유형" />
                <Card element="section nexon" title="내가 부족한 부분 탐색" />
                <Text element="section nexon" title="성장을 위한 발걸음" />
            </Main>
            <Footer element="nexon section gray" />
        </div>
    );  
}

export default App
