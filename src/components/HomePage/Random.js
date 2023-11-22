import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
    cursor: pointer;
    border-radius: 8px;
    
    &:hover {
        transform: scale(0.98);
    }

    &:active {
        transform: scale(1.05);
        transition: 0.3s;
    }
`;

const Random = ({ id, url }) => {
    return (
        <div>
            <Link to={`/detail/${id}`}>
                <Img src={url} alt="" />
            </Link>
        </div>
    );
};

export default Random;
