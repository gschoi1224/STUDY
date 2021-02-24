import React, { Component } from "react";
import PropTypes from "prop-types";
import MyComponent from "./myComponent";

class MyClass extends Component {
  /*
        class 내부에서 지정하는 방법도 있음
        static defaultProps = {
            name : '기본 이름'
        }
        static propTypes = {
            name : PropTypes.string,
            favoriteNumber : PropTypes.number.isRequired
        }
    */
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name} 입니다
        <br />
        children 값은 {children}
        입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

MyClass.defaultProps = {
  name: "기본 이름",
};

MyClass.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};

export default MyClass;
