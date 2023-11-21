import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Travel = () => {
const [travelImages, setTravelImages] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchTravelImages = async () => {
    try {
        if (travelImages.length === 0 && !loading) {
        const response = await axios.get(
            'https://api.unsplash.com/photos/random',
            {
            params: {
                query: 'Travel',
                orientation: 'landscape',
                count: 9,
                client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
            },
            }
        );

        const newTravelImages = response.data.map((image) => image.urls.regular);
        setTravelImages(newTravelImages);
        }

        setLoading(false);
    } catch (error) {
        console.error('Error fetching Travel images:', error);
        setLoading(false);
    }
    };

    fetchTravelImages();
}, [travelImages, loading]);

return (
    <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
    <h1 className='mt-7 mb-8 text-2xl'>Travel</h1>
    <p className='mb-2'>
    Traveling is like going on an adventure to different places. It means leaving your home and exploring new and exciting locations. When you travel, you might visit other cities, countries, or even natural wonders like mountains or beaches.
    </p>
    <p className='mb-2'>
    People travel for all sorts of reasons—it could be to see new things, try different foods, meet new friends, or just have fun. Traveling might involve using different types of transportation, like cars, planes, trains, or boats. It's a way to experience and learn about the world beyond where you live.
    </p>
    <p className='mb-2'>
    So, in simple terms, travel is like taking a journey to discover and enjoy different parts of the world!
    </p>
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        {travelImages.map((imageUrl, index) => (
            <img
            key={index}
            src={imageUrl}
            alt={`Travel ${index + 1}`}
            className='rounded-lg'
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
        ))}
        </div>
    )}
    </div>
);
};

export default Travel;