import axios from 'axios';
import { default as React, useEffect, useState } from 'react';

const Space = () => {
    const [spaceImages, setSpaceImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchSpaceImages = async () => {
        try {
            if (spaceImages.length === 0 && !loading) {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    query: 'space',
                    orientation: 'landscape',
                    count: 9,
                    client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                },
                }
            );
    
            const newSpaceImages = response.data.map((image) => image.urls.regular);
            setSpaceImages(newSpaceImages);
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Space images:', error);
            setLoading(false);
        }
        };
    
        fetchSpaceImages();
    }, [spaceImages, loading]); // Now the effect will run whenever spaceImages changes
    
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
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 gap-4 mt-4'>
            {spaceImages.map((imageUrl, index) => (
                <img
                key={index}
                src={imageUrl}
                alt={`Space ${index + 1}`}
                className='rounded-lg'
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            ))}
            </div>
        )}
        </div>
    );
    };
    
    export default Space;
    