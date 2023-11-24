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

const Sports = () => {
    const [sportsImages, setSportsImages] = useState(() => {
        const storedImages = localStorage.getItem('sportsImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!sportsImages.length) {
            fetchSportsImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sportsImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchSportsImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'sports',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newSportsImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setSportsImages(newSportsImages);
            localStorage.setItem('sportsImages', JSON.stringify(newSportsImages));
        } catch (error) {
            console.error('Error fetching sports images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchSportsImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Sports</h1>
            <p className='mb-2'>
                Sports are fun and active games or activities that people play for enjoyment, exercise, and sometimes competition. You can play sports with friends or as part of a team. Some sports involve running and jumping, like soccer or basketball, while others involve using equipment, like bats and balls in baseball or racquets in tennis.
            </p>
            <p className='mb-2'>
                Sports are a great way to stay healthy and make new friends. They come in all shapes and sizes, from simple games you can play in your backyard to organized competitions with teams and rules. Whether you're kicking a ball, swinging a bat, or swimming in a pool, sports are about moving your body, having fun, and maybe even learning some cool skills!
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
                    {sportsImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Sports ${index + 1}`}
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

export default Sports;
