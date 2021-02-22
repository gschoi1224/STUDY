import React from 'react';
import './App.css';

function App() {    // 함수형 컴포넌트
    const name = '리액트';
    /*
    return ( 
        <Fragment>
            <h1>{name} 안녕!</h1>
            <h2>잘 작동하니?</h2>
            {name === '리액트' ? <h1>true입니다</h1> :<h1>false입니다</h1>}
        </Fragment>
    )
    */
   //return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>;
   //return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
    //return name || '값이 undefined입니다.';
    // 스타일링
    /*
    const style = {
        // background-color는 backgroundColor와 같이 -가 사라지고 카멜 표기법으로 작성됩니다.
        backgroundColor : 'black',
        color : 'aqua',
        fontSize : '48px',  // font-size -> fontSize
        fontWeight : 'bold',    // font-weight -> fontWeight
        padding : 16    // 단위를 생략하면 px 로 지정됩니다.
    }
    return <div style={style}>{name}</div>;
    */
   // 클래스 사용
   return <div className="react">{name}</div>
}

export default App;