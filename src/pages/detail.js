import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const DetailImg = styled.img`
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    margin-bottom: 20px;
`;

const SaveButton = styled(FaHeart)`
    cursor: pointer;
    font-size: 24px;
    color: ${props => (props.saved ? '#f00' : '#000')};
    margin-top: 10px;
`;

const Detail = () => {
    const { imageUrl } = useParams();
    const [imageDetails, setImageDetails] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const getImageDetails = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${imageUrl}?client_id=U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4`);
                setImageDetails(response.data);
            } catch (error) {
                console.error('Error fetching image details:', error);
            }
        };

        getImageDetails();
    }, [imageUrl]);

    useEffect(() => {
        // Check if the image is saved when the component mounts
        const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
        const isImageSaved = savedImages.some(savedImage => savedImage.id === imageDetails.id);
        setIsSaved(isImageSaved);
    }, [imageDetails]);

    const handleSaveButtonClick = () => {
        // Toggle the save status
        setIsSaved(!isSaved);
    
        // Get the saved images from local storage or an empty array
        const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    
        // Check if the image is already saved
        const isImageSaved = savedImages.some(savedImage => savedImage.id === imageDetails.id);
    
        if (!isImageSaved) {
            const { id, urls, alt_description, title } = imageDetails;
            // Save the complete object, including title and id
            localStorage.setItem('savedImages', JSON.stringify([...savedImages, { id, urls, alt_description, title }]));
            console.log('Image saved!');
        } else {
            const updatedImages = savedImages.filter(savedImage => savedImage.id !== imageDetails.id);
            localStorage.setItem('savedImages', JSON.stringify(updatedImages));
            console.log('Image unsaved!');
        }
    };
    

    if (!imageDetails) {
        return <div>Loading...</div>;
    }

    return (
        <DetailContainer>
            <DetailImg src={imageUrl} alt={imageDetails.alt_description} />
            <SaveButton saved={isSaved} onClick={handleSaveButtonClick} />
        </DetailContainer>
    );
};

export default Detail;
