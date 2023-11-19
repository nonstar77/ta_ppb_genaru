import React from 'react';
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
        <div style={NavigationContainer} >
            <Link to="/home" style={{...NavigationButton}}>Home</Link>
            <Link to="/search" style={{...NavigationButton}}>Search</Link>
            <Link to="/account" style={{...NavigationButton}}>Account</Link>
            <Link to="/setting" style={{...NavigationButton}}> Setting</Link>
        </div>
    );
};

export default BottomNavBar;
