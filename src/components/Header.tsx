import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import wave from '../assets/wave.mp4';

const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 10%;
  top: 0;
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const VideoContent = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 2rem;
    margin-left: 50px;
    letter-spacing: 5px;
`;

function Header() {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    };

    return (
        <HeaderContainer>
            <VideoBackground>
                <VideoContent autoPlay muted loop>
                    <source src={wave} type="video/mp4" />
                    지원하지 않는 브라우저입니다.
                </VideoContent>
            </VideoBackground>
            <HeaderContent onClick={navigateHome}>
                TRIPCAST
            </HeaderContent>
        </HeaderContainer>
    );
}

export default Header;
