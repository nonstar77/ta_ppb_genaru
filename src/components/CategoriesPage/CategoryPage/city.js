import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsArrowClockwise, BsArrowUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(0.98);
    }

    &:active {
        transform: scale(1.05);
        transition: 0.3s;
    }
`;

const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1a202c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2000;
    margin: 2rem auto;
    display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const City = () => {
    const [cityImages, setCityImages] = useState(() => {
        const storedImages = localStorage.getItem('cityImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!cityImages.length) {
            fetchCityImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [cityImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchCityImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'city',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newCityImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setCityImages(newCityImages);
            localStorage.setItem('cityImages', JSON.stringify(newCityImages));
        } catch (error) {
            console.error('Error fetching city images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchCityImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>City</h1>
            <p className='mb-2'>
                A city is a place where a lot of people live and work together. It's a big, busy area with buildings, houses, streets, and lots of activities. Cities are usually larger and more crowded than towns or villages.
            </p>
            <p className='mb-2'>
                In a city, you'll find tall buildings, like apartments and offices, and there are many different places to go, such as schools, shops, restaurants, and parks. People in cities often use cars, buses, or trains to get around because there's so much ground to cover.
            </p>
            <p className='mb-2'>
                Cities are hubs of activity, and they often have a diverse population with people from different backgrounds and cultures. They're important centers for business, education, and entertainment, making them bustling and lively places to live. Examples of well-known cities include New York City, Tokyo, London, and many others around the world.
            </p>
            <button
                className='bg-gray-800 text-white px-2 py-2 rounded-full'
                onClick={handleRefreshClick}
                disabled={loading}
                title='Click me when you need a new image'
            >
                <BsArrowClockwise/>
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    {cityImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`City ${index + 1}`}
                                className='rounded-lg'
                            />
                        </Link>
                    ))}
                </div>
            )}
            <ScrollToTopButton visible={scrollButtonVisible} onClick={handleScrollToTop}>
                <BsArrowUp/>
            </ScrollToTopButton>
        </div>
    );
};

export default City;
