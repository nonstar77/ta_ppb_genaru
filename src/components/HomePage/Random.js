import React from 'react';
import { Link } from 'react-router-dom';
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
