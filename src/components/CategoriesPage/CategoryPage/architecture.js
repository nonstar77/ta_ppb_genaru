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

const Architecture = () => {
    const [architectureImages, setArchitectureImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchArchitectureImages = async () => {
        try {
            if (architectureImages.length === 0 && !loading) {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    query: 'Architecture',
                    orientation: 'landscape',
                    count: 15,
                    client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                },
                }
            );
    
            const newArchitectureImages = response.data.map((image) => ({
                id: image.id,
                url: image.urls.regular,
                }));
                setArchitectureImages(newArchitectureImages);
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Architecture images:', error);
            setLoading(false);
        }
        };
    
        fetchArchitectureImages();
    }, [architectureImages, loading]);
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>Architecture</h1>
        <p className='mb-2'>
            Architecture is like the art of designing and creating buildings. It's about planning and making structures that people use, like houses, schools, or even really tall buildings called skyscrapers. Architects are the creative people who come up with the ideas for how buildings should look and how they should be put together.
        </p>
        <p className='mb-2'>
            Think about your favorite building or a cool house you've seen—that's the result of architecture! It's not just about making things that look good; architects also think about how buildings will be useful and comfortable for the people who use them.
            </p>
        <p className='mb-2'>
            So, in simple terms, architecture is the art and science of designing and building places for people to live, work, and play.
        </p>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 gap-4 mt-4'>
            {architectureImages.map((image, index) => (
                <Link to={`/detail/${image.id}`} key={index}>
                <StyledImage
                    src={image.url}
                    alt={`Architecture ${index + 1}`}
                    className='rounded-lg'
                />
                </Link>
            ))}
            </div>
        )}
        </div>
    );
    };
    
    export default Architecture;
    