// SavedImages.js
import React, { useEffect, useState } from 'react';
import Random from '../components/HomePage/Random';

const SavedImages = () => {
const [savedImages, setSavedImages] = useState([]);

useEffect(() => {
    // Load saved images from local storage
    const savedImagesData = localStorage.getItem('savedImages');
    if (savedImagesData) {
    setSavedImages(JSON.parse(savedImagesData));
    }
}, []);

return (
    <div>
    <h1 className="text-center mt-7 text-2xl">Saved Images</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {savedImages.map(savedImage => (
        <Random url={savedImage.urls.thumb} key={savedImage.id} />
        ))}
    </div>
    </div>
);
};

export default SavedImages;
