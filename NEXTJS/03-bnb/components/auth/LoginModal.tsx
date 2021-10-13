import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import React, { useState } from 'react';
import { loginAPI } from '../../lib/api/auth';
import useValidateMode from '../../hooks/useValidateMode';

const Container = styled.form`
    width: 568px;
    padding: 32px;
    background-color: white;
    z-index: 11;

    .modal-close-x-icon {
        cursor: pointer;
        display: block;
        margin: 0 0 40px auto;
    }

    .login-input-wrapper {
        position: relative;
        margin-bottom: 16px;
        svg {
            position: absolute;
            right: 11px;
            top: 16px;
        }
    }

    .login-password-input-wrapper {
        svg {
            cursor: pointer;
        }
    }

    .login-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }
    .login-modal-set-signup {
        color: ${palette.dark_cyan};
        margin-left: 8px;
        cursor: pointer;
    }
`;

interface IProps {
    closeModal: () => void;
}
const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const { setValidateMode } = useValidateMode();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordHided, setIsPasswordHided] = useState(true);

    // 이메일 주소 변경시
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // 비밀번호 변경 시
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // 로그인 클릭 시
    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidateMode(true);
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
        } else {
            const loginBody = { email, password };
            try {
                const { data } = await loginAPI(loginBody);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <Container onSubmit={onSubmitLogin}>
            <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
            <div className="login-input-wrapper">
                <Input
                    placeholder="이메일 주소"
                    name="email"
                    type="email"
                    icon={<MailIcon />}
                    onChange={onChangeEmail}
                    value={email}
                    isValid={!!email}
                    errorMessage="이메일이 필요합니다."
                />
            </div>
            <div className="login-input-wrapper login-password-input-wrapper">
                <Input
                    placeholder="비밀번호 설정하기"
                    icon={
                        isPasswordHided ? (
                            <ClosedEyeIcon
                                onClick={() => setIsPasswordHided(false)}
                            />
                        ) : (
                            <OpenedEyeIcon
                                onClick={() => setIsPasswordHided(true)}
                            />
                        )
                    }
                    type={isPasswordHided ? 'password' : 'text'}
                    value={password}
                    name="password"
                    onChange={onChangePassword}
                    isValid={!!password}
                    errorMessage="비밀번호를 입력하세요."
                />
            </div>
            <div className="login-modal-submit-button-wrapper">
                <Button type="submit">로그인</Button>
            </div>
            <p>
                아직 에어비엔비 계정이 없나요?
                <span
                    className="login-modal-set-signup"
                    onClick={() => {
                        dispatch(authActions.setAuthMode('signup'));
                    }}
                >
                    회원가입
                </span>
            </p>
        </Container>
    );
};

export default LoginModal;
