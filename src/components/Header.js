import React from "react";

const Header = () => {
    const headerStyle = {
        backgroundColor: '#1a202c',
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 0',
    };

    const titleStyle = {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        fontFamily: 'Helvetica, sans-serif',
    };

    return (
        <div className="header" style={headerStyle}>
            <div style={{ maxWidth: 'md', margin: 'auto', width: '100%' }}>
                <h1 style={titleStyle}>Image Finder</h1>
            </div>
        </div>
    );
};

export default Header;
