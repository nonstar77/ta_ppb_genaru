import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const simulateLoading = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        };

        simulateLoading();
    }, []);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#1a202c',
            color: '#fff',
            fontSize: '24px',
            fontFamily: 'Helvetica'
        }}
        >
        <div className=''>Image Finder</div>
        </div>
    );
};

export default SplashScreen;
