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

const Street = () => {
    const [streetImages, setStreetImages] = useState(() => {
        const storedImages = localStorage.getItem('streetImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!streetImages.length) {
            fetchStreetImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [streetImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchStreetImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'Street',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newStreetImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setStreetImages(newStreetImages);
            localStorage.setItem('streetImages', JSON.stringify(newStreetImages));
        } catch (error) {
            console.error('Error fetching street images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchStreetImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Street Photography</h1>
            <p className='mb-2'>
                Street photography is like taking pictures of everyday life happening on the streets. Instead of posing for a camera, people in street photos are usually going about their daily activities—walking, talking, or doing interesting things. Street photographers capture the moments that make city life unique and special.
            </p>
            <p className='mb-2'>
                Imagine you're walking around with a camera and taking pictures of people, buildings, and scenes you find interesting. It's like creating a visual story of what's happening in the city or town. 
            </p>
            <p className='mb-2'>
                Street photography is about capturing the real and spontaneous moments that make each place and its people special.
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
                    {streetImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Street ${index + 1}`}
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

export default Street;
