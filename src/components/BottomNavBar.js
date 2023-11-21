import React, { useState } from 'react';
import { BsHouseDoor, BsInfoCircle, BsPerson, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1a202c;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    margin-top: 10px;
`;

const NavigationButton = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => (props.active ? '#555' : '#fff')};
    font-family: 'Poppins, sans-serif';
    transition: color 0.3s;

    &:hover {
        color: #555; /* Warna abu-abu gelap saat di-hover */
    }

    &:active {
        color: #555; /* Warna abu-abu gelap saat di-klik */
    }
`;


const ContentContainer = styled.div`
    margin-bottom: 60px;
`;

const BottomNavBar = () => {
    const containerHeight = 40;
    const iconSize = containerHeight * 0.5;

    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div>
            <ContentContainer>
                {/* Your content goes here */}
            </ContentContainer>
            <NavigationContainer>
                <NavigationButton to="/" active={activeLink === '/'} onClick={() => handleLinkClick('/')}>
                    <BsHouseDoor size={iconSize} />
                </NavigationButton>
                <NavigationButton to="/search" active={activeLink === '/search'} onClick={() => handleLinkClick('/search')}>
                    <BsSearch size={iconSize} />
                </NavigationButton>
                <NavigationButton to="/account" active={activeLink === '/account'} onClick={() => handleLinkClick('/account')}>
                    <BsPerson size={iconSize} />
                </NavigationButton>
                <NavigationButton to="/about" active={activeLink === '/about'} onClick={() => handleLinkClick('/about')}>
                    <BsInfoCircle size={iconSize} />
                </NavigationButton>
            </NavigationContainer>
        </div>
    );
};

export default BottomNavBar;