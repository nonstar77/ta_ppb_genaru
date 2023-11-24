import React from 'react';

const About = () => {
    return (
        <div className="text-center my-10 mx-auto max-w-2xl" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className="text-3xl font-bold mb-6">About</h1>
            <p className="mb-3">
                Hi there! Welcome to my image finder application! I built this to help you discover lots of awesome pictures easily.
            </p>
            <p className="mb-3">
                My goal is to make finding and enjoying beautiful images super easy. Whether you need inspiration, are creating something cool, or just want to look at pretty pictures, my app is here for you.
            </p>
            <p className='mb-3'>
                I made this app using Visual Studio Code and pictures come from <a className="color" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>.
            </p>
            <p className='mb-3'>
                Unsplash allows me to get pictures, but they only let me do it 50 times in an hour. This is a rule from Unsplash to make sure everyone can use the app smoothly without it getting slow. It's like ensuring there isn't too much traffic on the road so everyone can get where they want to go!
            </p>
        </div>
    );
};

export default About;
