import React from 'react';

const About = () => {
    return (
        <div className="text-center my-10 mx-auto max-w-2xl" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className="text-3xl font-bold mb-6">About</h1>
            <p className="mb-3">
                Welcome to my image finder! I strive to provide a user-friendly and efficient platform for you to explore and discover a vast collection of high-quality images.
            </p>
            <p className="mb-3">
                My mission is to make the process of finding and enjoying beautiful images a seamless experience. Whether you are looking for inspiration, creating content, or just want to appreciate stunning visuals, my application is here to meet your needs.
            </p>
            <p className='mb-3'>
                In this application i used Visual Studio Code and API from <a className="color" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
            </p>
            <p>
            The purpose of creating this application was for the final assignment of mobile device programming.
            </p>
        </div>
    );
};

export default About;
