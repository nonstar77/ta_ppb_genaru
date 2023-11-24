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

const Animal = () => {
    const [animalImages, setAnimalImages] = useState(() => {
        const storedImages = localStorage.getItem('animalImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [loading, setLoading] = useState(false);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    useEffect(() => {
        if (!animalImages.length) {
            fetchAnimalImages();
        }

        window.addEventListener('scroll', handleScroll);

        window.scrollTo({top: 0});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animalImages]);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const fetchAnimalImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                    params: {
                        query: 'animal',
                        orientation: 'landscape',
                        count: 15,
                        client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                    },
                }
            );

            const newAnimalImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
            }));
            setAnimalImages(newAnimalImages);
            localStorage.setItem('animalImages', JSON.stringify(newAnimalImages));
        } catch (error) {
            console.error('Error fetching animal images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshClick = () => {
        fetchAnimalImages();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className='mt-7 mb-8 text-2xl'>Animal</h1>
            <p className='mb-2'>
                An animal is a living thing that can move on its own. It's not a plant or a fungus. Animals can be as tiny as a bug or as big as an elephant. They eat other living things to get energy. Think about your pet cat or dog—they are animals too!
            </p>
            <p className='mb-2'>
                Animals can be very different from each other. Some have no backbone (like insects), while others have a backbone (like dogs and cats). Fish, birds, and people are also examples of animals.
            </p>
            <p className='mb-2'>
                So, in simple words, animals are living things that move, eat other things, and come in many different shapes and sizes!
            </p>

            <button
                className='bg-gray-800 text-white px-2 py-2 rounded-full'
                onClick={handleRefreshClick}
                disabled={loading}
                title='click me when you need new image'
            >
                <BsArrowClockwise/>
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    {animalImages.map((image, index) => (
                        <Link to={`/detail/${image.id}`} key={index}>
                            <StyledImage
                                src={image.url}
                                alt={`Animal ${index + 1}`}
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

export default Animal;
