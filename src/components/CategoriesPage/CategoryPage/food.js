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

const Food = () => {
    const [foodImages, setFoodImages] = useState(() => {
        const storedImages = localStorage.getItem('foodImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!foodImages.length) {
            fetchFoodImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [foodImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchFoodImages = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'food',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newFoodImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));

            setFoodImages(newFoodImages);
            localStorage.setItem('foodImages', JSON.stringify(newFoodImages));
        } catch (error) {
            console.error('Error fetching food images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchFoodImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Food</h1>
            <p className='mb-2'>
                Food is what we eat to stay alive and healthy. It comes in many yummy varieties like fruits, vegetables, meat, bread, and more. Each type of food has special things inside that help our bodies grow, stay strong, and have energy.
            </p>
            <p className='mb-2'>
                When you have a meal, like breakfast, lunch, or dinner, you're eating different kinds of food. Some foods are crunchy, some are soft, and some are sweet. Eating a mix of different foods is like giving your body a tasty and nutritious treat!
            </p>
            <p className='mb-2'>
                So, in simple terms, food is the delicious stuff we eat to keep our bodies happy and working well.
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
                    {foodImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Food ${index + 1}`}
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

export default Food;