import React, { useState } from 'react';
import styled from 'styled-components';
import LogoIcon from '../public/static/svg/logo/logo.svg';
import LogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import Link from 'next/link';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import AuthModal from './auth/AuthModal';
import OutsideClickHandler from 'react-outside-click-handler';
import { logoutAPI } from '../lib/api/auth';

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%auto;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    z-index: 10;
    .header-logo-wrapper {
        display: flex;
        align-items: center;
        .header-logo {
            margin-right: 6px;
        }
    }
    .header-auth-buttons {
        .header-sign-up-button {
            height: 42px;
            margin-right: 8px;
            padding: 0 16px;
            border: 0;
            border-radius: 21px;
            background-color: white;
            cursor: pointer;
            outline: none;
            &:hover {
                background-color: ${palette.gray_f7};
            }
        }
        .header-login-button {
            height: 42px;
            padding: 0 16px;
            border: 0;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
            border-radius: 21px;
            background-color: white;
            cursor: pointer;
            outline: none;
            &:hover {
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
            }
        }
    }
    .modal-wrapper {
        width: 100%;
        height: 100%auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        .modal-background {
            position: absolute;
            width: 100%auto;
            height: 100%auto;
            background-color: rgba(0, 0, 0, 0.75);
            z-index: 10;
        }
        .modal-contents {
            width: 400px;
            height: 400px;
            background-color: white;
            z-index: 11;
        }
    }
    .header-user-profile {
        display: flex;
        align-items: center;
        height: 42px;
        padding: 0 6px 0 16px;
        border: 0;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        border-radius: 21px;
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
        .header-user-profile-image {
            margin-left: 8px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
    /** react-outside-click-handler div */
    .header-logo-wrapper + div {
        position: relative;
    }

    .header-usermenu {
        position: absolute;
        right: 0;
        top: 52px;
        width: 240px;
        padding: 8px 0;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        background-color: white;
        li {
            display: flex;
            align-items: center;
            width: 100%auto;
            height: 42px;
            padding: 0 16px;
            cursor: pointer;
            &:hover {
                background-color: ${palette.gray_f7};
            }
        }
        .header-usermenu-divider {
            width: 100%auto;
            height: 1px;
            margin: 8px 0;
            background-color: ${palette.gray_dd};
        }
    }
`;

const Header: React.FC = () => {
    // 모달을 열고 닫을 boolean값
    const { openModal, ModalPortal, closeModal } = useModal();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

    // 로그아웃
    const logout = async () => {
        try {
            await logoutAPI();
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Container>
            <Link href="/">
                <a className="header-logo-wrapper">
                    <LogoIcon className="header-logo" />
                    <LogoTextIcon />
                </a>
            </Link>
            {!user.isLogged && (
                <div className="header-auth-buttons">
                    <button
                        type="button"
                        className="header-sign-up-button"
                        onClick={() => {
                            dispatch(authActions.setAuthMode('signup'));
                            openModal();
                        }}
                    >
                        회원가입
                    </button>
                    <button
                        type="button"
                        className="header-login-button"
                        onClick={() => {
                            dispatch(authActions.setAuthMode('login'));
                            openModal();
                        }}
                    >
                        로그인
                    </button>
                </div>
            )}
            {user.isLogged && (
                <OutsideClickHandler
                    onOutsideClick={() => {
                        if (isUsermenuOpened) {
                            setIsUsermenuOpened(false);
                        }
                    }}
                >
                    <button
                        className="header-user-profile"
                        type="button"
                        onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
                    >
                        <HamburgerIcon />
                        <img
                            src={user.profileImage}
                            className="header-user-profile-image"
                            alt=""
                        />
                    </button>
                    {isUsermenuOpened && (
                        <ul className="header-usermenu">
                            <li>숙소 관리</li>
                            <Link href="/room/register/building">
                                <a
                                    role="presentation"
                                    onClick={() => setIsUsermenuOpened(false)}
                                >
                                    <li>숙소 등록하기</li>
                                </a>
                            </Link>
                            <div className="header-usermenu-divider" />
                            <li role="presentation" onClick={logout}>
                                로그아웃
                            </li>
                        </ul>
                    )}
                </OutsideClickHandler>
            )}
            <ModalPortal>
                <AuthModal closeModal={closeModal} />
            </ModalPortal>
        </Container>
    );
};

export default Header;
