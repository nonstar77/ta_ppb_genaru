import axios from 'axios';
import { default as React, useEffect, useState } from 'react';

const Food = () => {
    const [foodImages, setFoodImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFoodImages = async () => {
        try {
            if (foodImages.length === 0 && !loading) {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    query: 'food',
                    orientation: 'landscape',
                    count: 9,
                    client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                },
                }
            );
    
            const newFoodImages = response.data.map((image) => image.urls.regular);
            setFoodImages(newFoodImages);
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching food images:', error);
            setLoading(false);
        }
        };
    
        fetchFoodImages();
    }, [foodImages, loading]); // Now the effect will run whenever foodImages changes
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>Food</h1>
        <p className='mb-2'>
        Food: Food is the yummy stuff you eat to keep your body strong and healthy. It includes things like fruits, vegetables, meat, and bread. Each type of food gives your body special things it needs to work well, like making your muscles strong or helping your bones grow.
        </p>
        <p className='mb-2'>
            Drink: Drinks are the things you sip or gulp. Water is a drink, and so are juices, milk, and even hot chocolate. Drinking is important because it keeps you from getting thirsty, and your body needs liquids to stay in good shape. So, whether it's a glass of water or a cup of juice, drinks help you stay refreshed!
        </p>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 gap-4 mt-4'>
            {foodImages.map((imageUrl, index) => (
                <img
                key={index}
                src={imageUrl}
                alt={`Food ${index + 1}`}
                className='rounded-lg'
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            ))}
            </div>
        )}
        </div>
    );
    };
    
    export default Food;
    