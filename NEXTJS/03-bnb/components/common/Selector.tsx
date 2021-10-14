/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
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
    ${({ isValid, validateMode }) =>
        validateMode &&
        css`
            select {
                border-color: ${isValid
                    ? palette.dark_cyan
                    : palette.tawny}!important;

                background-color: ${isValid ? 'white' : palette.snow};
            }
        `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    disabledOptions?: string[];
    value?: string;
    defaultValue?: string;
    isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
    options = [],
    disabledOptions = [],
    defaultValue = '',
    isValid,
    ...props
}) => {
    const validateMode = useSelector(state => state.common.validateMode);
    return (
        <Container isValid={!!isValid} validateMode={validateMode}>
            <select {...props}>
                {disabledOptions.map((option, index) => (
                    <option key={index} value={option}>
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
// props의 값이 같다면 리렌더를 방지하기 위해
export default React.memo(Selector);
