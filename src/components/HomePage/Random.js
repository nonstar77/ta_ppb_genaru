import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
    }
`;

const Random = ({ data, url }) => {
    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate(`/detail/${encodeURIComponent(url)}`);
    };

    return (
        <div>
            <Img src={url} alt="" onClick={goToDetailPage} />
        </div>
    );
};

export default Random;
