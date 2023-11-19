import React from 'react';
import { BsCloud, BsGear, BsHouseDoor, BsPerson, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NavigationContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#1a202c',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '10px',
};

const NavigationButton = {
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
};

const BottomNavBar = () => {
    return (
        <div style={NavigationContainer}>
            <Link to="/" style={{ ...NavigationButton }}><BsHouseDoor /></Link>
            <Link to="/search" style={{ ...NavigationButton }}><BsSearch /></Link>
            <Link to="/saved-images" style={{ ...NavigationButton }}><BsCloud /></Link>
            <Link to="/account" style={{ ...NavigationButton }}><BsPerson /></Link>
            <Link to="/setting" style={{ ...NavigationButton }}><BsGear /></Link>
        </div>
    );
};

export default BottomNavBar;