import axios from "axios";
import React, { useEffect, useState } from 'react';
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
    margin: 0 20px;
`;

const WrapperImages = styled.section`
    max-width: 70rem;
    margin: 4rem auto;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 300px;
`;

function Home() {
    const [images, setImage] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = (count = 12) => {
        const apiRoot = "https://api.unsplash.com";
        const accessKey = process.env.REACT_APP_ACCESS_KEY;
    
        axios
            .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
            .then(res => {
                setImage(prevImages => [...prevImages, ...res.data]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <PageContainer>
            <GlobalStyle />
            <h1 className="text-center mt-7 text-2xl">Image from Unplash API</h1>
            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={true}
                loader={<Loader/>}
            >
                <WrapperImages>
                    {images.map(image => (
                        <Random key={image.id} id={image.id} url={image.urls.regular} />
                    ))}
                </WrapperImages>
            </InfiniteScroll>
        </PageContainer>
    );
}

export default Home;
