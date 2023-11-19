// Home.js
import axios from "axios";
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import Loader from "../components/HomePage/Loader";
import Random from '../components/HomePage/Random';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const WrapperImages = styled.section`
    max-width: 70rem;
    margin: 4rem auto;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 300px;
`;

const Home = () => {
const [images, setImages] = useState([]);

useEffect(() => {
    fetchImages();
}, []); // Run the effect only once on mount

const fetchImages = (count = 12) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESS_KEY;

    axios
    .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
    .then(res => {
        setImages(prevImages => [...prevImages, ...res.data]);
    })
    .catch(error => {
        console.log(error);
    });
};

const handleSaveImage = (image) => {
    // Get the saved images from local storage or an empty array
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    // Check if the image is already saved
    const isImageSaved = savedImages.some(savedImage => savedImage.id === image.id);
    if (!isImageSaved) {
    // Save the image to local storage
    localStorage.setItem('savedImages', JSON.stringify([...savedImages, image]));
    }
};

return (
    <div>
    <GlobalStyle />
    <h1 className="text-center mt-7 text-2xl">Image from UnSplash API</h1>
    <div className="text-center"><Link to="/saved-images">View Saved Images</Link></div>
    <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
    >
        <WrapperImages>
        {images.map(image => (
            <div key={image.id}>
            <Random url={image.urls.thumb} />
            <button onClick={() => handleSaveImage(image)}>Save Image</button>
            </div>
        ))}
        </WrapperImages>
    </InfiniteScroll>
    </div>
);
};

export default Home;