/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    width: 100%;
    height: 46px;

    select {
        width: 100%;
        height: 100%;
        background-color: white;
        border: 1px solid ${palette.gray_eb};
        padding: 0 11px;
        outline: none;
        appearance: none;
        background-image: url('/static/svg/common/selector/down_arrow.svg');
        background-position: right 11px center;
        background-repeat: no-repeat;
        font-size: 16px;

        &:focus {
            border-color: ${palette.dark_cyan};
        }
    }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    disabledOptions?: string[];
    value?: string;
    defaultValue?: string;
}

const Selector: React.FC<IProps> = ({
    options = [],
    disabledOptions = [],
    defaultValue = '',
    ...props
}) => {
    return (
        <Container>
            <select {...props}>
                {disabledOptions.map((option, index) => (
                    <option key={index} value={option} disabled>
                        {option}
                    </option>
                ))}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                        {defaultValue}
                    </option>
                ))}
            </select>
        </Container>
    );
};

export default Selector;
