import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Animal = () => {
const [animalImages, setAnimalImages] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchAnimalImages = async () => {
    try {
        if (animalImages.length === 0 && !loading) {
        const response = await axios.get(
            'https://api.unsplash.com/photos/random',
            {
            params: {
                query: 'animal',
                orientation: 'landscape',
                count: 9,
                client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
            },
            }
        );

        const newAnimalImages = response.data.map((image) => image.urls.regular);
        setAnimalImages(newAnimalImages);
        }

        setLoading(false);
    } catch (error) {
        console.error('Error fetching animal images:', error);
        setLoading(false);
    }
    };

    fetchAnimalImages();
}, [animalImages, loading]); // Now the effect will run whenever animalImages changes

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
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        {animalImages.map((imageUrl, index) => (
            <img
            key={index}
            src={imageUrl}
            alt={`Animal ${index + 1}`}
            className='rounded-lg'
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
        ))}
        </div>
    )}
    </div>
);
};

export default Animal;
