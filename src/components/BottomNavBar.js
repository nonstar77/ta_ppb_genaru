import React from 'react';
import { BsGear, BsHeart, BsHouseDoor, BsPerson, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NavigationContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center', // Center the items vertically
    backgroundColor: '#1a202c',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40px',
    marginTop: '10px',
};

const NavigationButton = {
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
};

const ContentContainer = {
    marginBottom: '60px', // Adjust this value to create space between content and BottomNavBar
};

const BottomNavBar = () => {
    const containerHeight = parseFloat(NavigationContainer.height);
    const iconSize = containerHeight * 0.5;

    return (
        <div>
            <div style={ContentContainer}>
            </div>
            <div style={NavigationContainer}>
                <Link to="/" style={{ ...NavigationButton }}><BsHouseDoor size={iconSize} /></Link>
                <Link to="/search" style={{ ...NavigationButton }}><BsSearch size={iconSize} /></Link>
                <Link to="/savedimages" style={{ ...NavigationButton }}><BsHeart size={iconSize} /></Link>
                <Link to="/account" style={{ ...NavigationButton }}><BsPerson size={iconSize} /></Link>
                <Link to="/setting" style={{ ...NavigationButton }}><BsGear size={iconSize} /></Link>
            </div>
        </div>
    );
};

export default BottomNavBar;
