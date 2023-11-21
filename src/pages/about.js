import React from 'react';

const About = () => {
    return (
        <div className="about-container text-center my-10 mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">About</h1>
            <p className="mb-4">
                Welcome to my image search application! We strive to provide a user-friendly and efficient platform for you to explore and discover a vast collection of high-quality images.
            </p>
            <p className="mb-4">
                My mission is to make the process of finding and enjoying beautiful images a seamless experience. Whether you are looking for inspiration, creating content, or just want to appreciate stunning visuals, our application is here to meet your needs.
            </p>
            <p className="mb-6">
                Feel free to explore the different features and functionalities of our app. If you have any questions, feedback, or suggestions, please don't hesitate to reach my to us. We appreciate your support and hope you enjoy your time using our image search application.
            </p>
            <h2 className="text-2xl font-bold mb-4">Application That I Used</h2>
            <p>
                In this prjoct i used Visual Studio Code and used API from <a className="color" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
            </p>
        </div>
    );
};

export default About;
