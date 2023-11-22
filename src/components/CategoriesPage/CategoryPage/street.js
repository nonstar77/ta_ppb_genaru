import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const Street = () => {
const [streetImages, setStreetImages] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchStreetImages = async () => {
    try {
        if (streetImages.length === 0 && !loading) {
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
        }

        setLoading(false);
    } catch (error) {
        console.error('Error fetching Street images:', error);
        setLoading(false);
    }
    };

    fetchStreetImages();
}, [streetImages, loading]);

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
    </div>
);
};

export default Street;
