import React from 'react';
import styled from 'styled-components';
import LogoIcon from '../public/static/svg/logo/logo.svg';
import LogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import Link from 'next/link';
import useModal from '../hooks/useModal';
import { useSelector } from '../store';
import HeaderAuths from './HeaderAuths';
import HeaderUserProfile from './HeaderUserProfile';

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
`;

const Header: React.FC = () => {
    // 모달을 열고 닫을 boolean값
    const { openModal, ModalPortal, closeModal } = useModal();
    const isLogged = useSelector(state => state.user.isLogged);
    return (
        <Container>
            <Link href="/">
                <a className="header-logo-wrapper">
                    <LogoIcon className="header-logo" />
                    <LogoTextIcon />
                </a>
            </Link>
            {!isLogged && <HeaderAuths />}
            {isLogged && <HeaderUserProfile />}
        </Container>
    );
};

export default Header;
