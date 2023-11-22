import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
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

const City = () => {
    const [cityImages, setCityImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCityImages = async () => {
        try {
            if (cityImages.length === 0 && !loading) {
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
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching city images:', error);
            setLoading(false);
        }
        };
    
        fetchCityImages();
    }, [cityImages, loading]);
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>City</h1>
        <p className='mb-2'>
            A city is a place where a lot of people live and work together. It's a big, busy area with buildings, houses, streets, and lots of activities. Cities are usually larger and more crowded than towns or villages.
        </p>
        <p className='mb-2'>
            In a city, you'll find tall buildings, like apartments and offices, and there are many different places to go, such as schools, shops, restaurants, and parks. People in cities often use cars, buses, or trains to get around because there's so much ground to cover.
        </p>
        <p>
        Cities are hubs of activity, and they often have a diverse population with people from different backgrounds and cultures. They're important centers for business, education, and entertainment, making them bustling and lively places to live. Examples of well-known cities include New York City, Tokyo, London, and many others around the world.
        </p>
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
        </div>
    );
    };
    
    export default City;
    