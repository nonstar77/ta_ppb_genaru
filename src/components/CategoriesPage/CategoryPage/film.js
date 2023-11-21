import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Film = () => {
    const [filmImages, setFilmImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFilmImages = async () => {
        try {
            if (filmImages.length === 0 && !loading) {
            const response = await axios.get(
                'https://api.unsplash.com/photos/random',
                {
                params: {
                    query: 'film',
                    orientation: 'landscape',
                    count: 9,
                    client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                },
                }
            );
    
            const newFilmImages = response.data.map((image) => image.urls.regular);
            setFilmImages(newFilmImages);
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching film images:', error);
            setLoading(false);
        }
        };
    
        fetchFilmImages();
    }, [filmImages, loading]);
    
    return (
        <div className='text-center mx-auto max-w-7xl' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className='mt-7 mb-8 text-2xl'>Film</h1>
        <p className='mb-2'>
        A film, also commonly known as a movie, is a series of moving images that are shown on a screen to tell a story or convey information. It is a form of visual art and entertainment that combines moving images, sound, and often music to create a narrative or convey emotions.
        </p>
        <p className='mb-2'>
        Films are typically produced by recording images with cameras, and the images are then edited together to create a seamless flow of motion. The images are usually accompanied by sound, including dialogue, music, and sound effects. Films can be of various genres, such as drama, comedy, action, science fiction, documentary, and more.        </p>
        <p className='mb-2'>
        People often go to movie theaters to watch films on a big screen, but films are also commonly watched at home on television or through various online streaming platforms. The process of making a film involves a collaboration of various creative and technical professionals, including actors, directors, producers, writers, cinematographers, and editors.
        </p>
        <p className='mb-2'>
        In simpler terms, a film is like a moving story that you can watch on a screen, with pictures and sound that tell you what's happening and make you feel different emotions.
        </p>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 gap-4 mt-4'>
            {filmImages.map((imageUrl, index) => (
                <img
                key={index}
                src={imageUrl}
                alt={`Film ${index + 1}`}
                className='rounded-lg'
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            ))}
            </div>
        )}
        </div>
    );
    };
    
    export default Film;
    