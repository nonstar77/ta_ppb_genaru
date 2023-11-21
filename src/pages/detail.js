// DetailPage.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    text-align: center;
`;

const DetailImg = styled.img`
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const Detail = () => {
    const { id } = useParams();
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    console.error('Invalid URL: No "id" parameter found.');
                    return;
                }

                const response = await axios.get(
                    `https://api.unsplash.com/photos/${id}`,
                    {
                        params: {
                            client_id: 'U2z6gxwaT0bJRUOYwt-NTz_EelpsVwzNWYsSGH8gnD4',
                        },
                    }
                );

                setDetailData(response.data);
            } catch (error) {
                console.error('Error fetching image details:', error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <DetailContainer>
            {detailData ? (
                <>
                    <DetailImg src={detailData.urls.regular} alt={detailData.alt_description || 'Image'} />
                    <h2>{detailData.alt_description || 'Image Detail'}</h2>
                    <p>{detailData.description || 'No description available.'}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </DetailContainer>
    );
};

export default Detail;