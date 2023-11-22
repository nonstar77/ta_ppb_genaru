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

const Sports = () => {
    const [sportsImages, setSportsImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchSportsImages = async () => {
        try {
            if (sportsImages.length === 0 && !loading) {
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
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Sports images:', error);
            setLoading(false);
        }
        };
    
        fetchSportsImages();
    }, [sportsImages, loading]); // Now the effect will run whenever sportsImages changes
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>Sports</h1>
        <p className='mb-2'>
        Sports are fun and active games or activities that people play for enjoyment, exercise, and sometimes competition. You can play sports with friends or as part of a team. Some sports involve running and jumping, like soccer or basketball, while others involve using equipment, like bats and balls in baseball or racquets in tennis.
        </p>
        <p className='mb-2'>
        Sports are a great way to stay healthy and make new friends. They come in all shapes and sizes, from simple games you can play in your backyard to organized competitions with teams and rules. Whether you're kicking a ball, swinging a bat, or swimming in a pool, sports are about moving your body, having fun, and maybe even learning some cool skills!
        </p>
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
        </div>
    );
    };
    
    export default Sports;
    