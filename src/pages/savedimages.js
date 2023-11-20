// SavedImages.js
import React from 'react';

const SavedImages = () => {
// Get the saved images from local storage or an empty array
const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

// SavedImages.js
return (
    <div>
    <h1>Saved Images</h1>
    <div className="image-container">
        {savedImages.map((savedImages, index) => {
        console.log('savedImage:', savedImages); // Tambahkan ini
        return (
            <div key={index}>
            {savedImages.urls && savedImages.urls.small && (
                <img src={savedImages.urls.small} alt={savedImages.alt_description} />
            )}
            </div>
        );
        })}
    </div>
    </div>
);

};

export default SavedImages;
