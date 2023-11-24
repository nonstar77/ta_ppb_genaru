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

const Travel = () => {
    const [travelImages, setTravelImages] = useState(() => {
        const storedImages = localStorage.getItem('travelImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!travelImages.length) {
            fetchTravelImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [travelImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchTravelImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'Travel',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newTravelImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setTravelImages(newTravelImages);
            localStorage.setItem('travelImages', JSON.stringify(newTravelImages));
        } catch (error) {
            console.error('Error fetching travel images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchTravelImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Travel</h1>
            <p className='mb-2'>
                Traveling is like going on an adventure to different places. It means leaving your home and exploring new and exciting locations. When you travel, you might visit other cities, countries, or even natural wonders like mountains or beaches.
            </p>
            <p className='mb-2'>
                People travel for all sorts of reasons—it could be to see new things, try different foods, meet new friends, or just have fun. Traveling might involve using different types of transportation, like cars, planes, trains, or boats. It's a way to experience and learn about the world beyond where you live.
            </p>
            <p className='mb-2'>
                So, in simple terms, travel is like taking a journey to discover and enjoy different parts of the world!
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
                    {travelImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Travel ${index + 1}`}
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

export default Travel;
