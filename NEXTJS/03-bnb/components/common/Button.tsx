import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.button`
    width: 100%;
    height: 48px;
    border: 0;
    border-radius: 4px;
    background-color: ${palette.bittersweet};
    color: white;
    font-size: 16px;
    font-weight: 800;
    outline: none;
    cursor: pointer;
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
    return <Container {...props}>{children}</Container>;
};

// props의 값이 같다면 리렌더를 방지하기 위해
export default React.memo(Button);
