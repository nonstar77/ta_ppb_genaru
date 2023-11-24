import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import InfiniteScroll from 'react-infinite-scroll-component';
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

const PageContainer = styled.div`
    padding: 0 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7px;
`;

const WrapperImages = styled.section`
    max-width: 70rem;
    margin: 4rem auto;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 300px;
`;

const ScrollButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1a202c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin: 2rem auto;
    display: ${(props) => (props.visible ? 'block' : 'none')};
`;

function Home() {
    const [images, setImages] = useState([]);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('images')) || [];
        setImages(storedImages);

        if (storedImages.length === 0) {
            fetchImages();
        }

        const handleScroll = () => {
            const scrolled = document.documentElement.scrollTop;
            setScrollButtonVisible(scrolled > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchImages = (count = 12) => {
        setLoading(true);
        const apiRoot = "https://api.unsplash.com";
    
        axios
            .get(`${apiRoot}/photos/random?client_id=${process.env.REACT_APP_ACCESS_KEY}&count=${count}`)
            .then(res => {
                const newImages = res.data.map(image => ({
                    id: image.id,
                    url: image.urls.regular,
                }));
    
                setImages(prevImages => {
                    const updatedImages = [...prevImages, ...newImages];
                    localStorage.setItem('images', JSON.stringify(updatedImages));
                    return updatedImages;
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRefresh = () => {
        setImages([]); // Clear the current images
        fetchImages(); // Fetch new images
    };

    return (
        <PageContainer>
            <GlobalStyle />
            <h1 className="text-center mt-7 text-2xl">Image from Unsplash API</h1>
            
            <ButtonContainer>
                <button
                    className='bg-gray-800 text-white px-2 py-2 rounded-full'
                    onClick={handleRefresh}
                    disabled={loading}
                    title='Click me to refresh images'
                >
                    <BsArrowClockwise />
                </button>
            </ButtonContainer>

            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={true}
                loader={<Loader />}
            >
                <WrapperImages>
                    {images.map(image => (
                        <Random key={image.id} id={image.id} url={image.url} />
                    ))}
                </WrapperImages>
            </InfiniteScroll>
            
            <ScrollButton visible={scrollButtonVisible} onClick={handleScrollToTop}>
                <BsArrowUp />
            </ScrollButton>
        </PageContainer>
    );
}

export default Home;
