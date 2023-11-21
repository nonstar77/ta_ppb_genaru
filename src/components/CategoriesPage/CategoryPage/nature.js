import axios from 'axios';
import { default as React, useEffect, useState } from 'react';

const Nature = () => {
    const [natureImages, setNatureImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchNatureImages = async () => {
        try {
            if (natureImages.length === 0 && !loading) {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    query: 'nature',
                    orientation: 'landscape',
                    count: 9,
                    client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                },
                }
            );
    
            const newNatureImages = response.data.map((image) => image.urls.regular);
            setNatureImages(newNatureImages);
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Nature images:', error);
            setLoading(false);
        }
        };
    
        fetchNatureImages();
    }, [natureImages, loading]); // Now the effect will run whenever natureImages changes
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>Nature</h1>
        <p className='mb-2'>
        Nature is everything around us that isn't made by people. It's the air we breathe, the trees and flowers, the sun, the sky, and even the animals like birds and butterflies. Nature is like a big, beautiful playground where we can see and enjoy the outdoors.
        </p>
        <p className='mb-2'>
        Think about a forest, a beach, or a park—that's nature! It's full of different plants, animals, and landscapes. Nature is also the changing weather, like rain and sunshine. So, whenever you go outside and see the world around you, you're experiencing nature!
        </p>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 gap-4 mt-4'>
            {natureImages.map((imageUrl, index) => (
                <img
                key={index}
                src={imageUrl}
                alt={`Nature ${index + 1}`}
                className='rounded-lg'
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            ))}
            </div>
        )}
        </div>
    );
    };
    
    export default Nature;
    