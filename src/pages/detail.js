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
    const [imageDetails, setImageDetails] = useState({}); // Set initial state to an empty object

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

    if (!imageDetails) {
        return <div>Loading...</div>;
    }

    const { title, alt_description } = imageDetails;

    return (
        <DetailContainer>
            <DetailImg src={imageUrl} alt={alt_description} />
            {title && <p>{title}</p>}
        </DetailContainer>
    );
};

export default Detail;