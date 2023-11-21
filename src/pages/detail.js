import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const Detail = () => {
    const { imageUrl } = useParams();
    const [imageDetails, setImageDetails] = useState({});

    useEffect(() => {
        const getImageDetails = async () => {
            const accessKey = process.env.REACT_APP_ACCESS_KEY;
    
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${imageUrl}?client_id=${accessKey}`);
                setImageDetails(response.data);
            } catch (error) {
                console.error('Error fetching image details:', error);
                console.log('Response:', error.response); // Log the response for more details
            }
        };
    
        getImageDetails();
    }, [imageUrl]);
    
    if (!imageDetails) {
        return <div>Loading...</div>;
    }

    return (
        <DetailContainer>
            <DetailImg src={imageUrl} alt={imageDetails.alt_description} />
            <div className='text-center'>
                <p>no detail about this image</p>
            </div>
        </DetailContainer>
    );
};

export default Detail;
