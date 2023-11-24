import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
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

const Space = () => {
    const [spaceImages, setSpaceImages] = useState(() => {
        const storedImages = localStorage.getItem('spaceImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!spaceImages.length) {
            fetchSpaceImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [spaceImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchSpaceImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'space',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newSpaceImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setSpaceImages(newSpaceImages);
            localStorage.setItem('spaceImages', JSON.stringify(newSpaceImages));
        } catch (error) {
            console.error('Error fetching space images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchSpaceImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Space</h1>
            <p className='mb-2'>
                Space is everything that exists beyond our planet Earth. It's like an enormous, dark, and endless playground in the sky. Imagine looking up at the night sky and seeing the moon, stars, and planets—that's space!
            </p>
            <p className='mb-2'>
                Space is so big that it goes on and on forever. It's where the sun and the moon live, and where astronauts go when they travel in rockets. There are many stars in space, and they form groups called galaxies. Our Milky Way is one of these galaxies.
            </p>
            <p className='mb-2'>
                In space, there's no air or gravity like we have on Earth, which is why astronauts wear special suits and helmets when they go there. Space is a fascinating and mysterious place, and there's still so much we are learning about it!
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
                    {spaceImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Space ${index + 1}`}
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

export default Space;
