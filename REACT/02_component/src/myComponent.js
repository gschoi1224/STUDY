import React from "react";
import PropTypes from 'prop-types';

const MyComponent = (props) => {
    return <div>안녕하세요. 나의 이름은 {props.name}입니다!<br/>
    children 값은 {props.children}입니다.
    <br/>
    제가 좋아하는 숫자는 {props.favoriteNumber}입니다.
    </div>;
}

MyComponent.defaultProps = {
    name : '기본 이름'
}

MyComponent.propTypes = {
    name : PropTypes.string,
    favoriteNumber : PropTypes.number.isRequired
}

export default MyComponent;