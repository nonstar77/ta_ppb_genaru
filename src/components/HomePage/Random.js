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

const Random = ({ url }) => {
    return (
        <div>
            <Link to={`/detail/${encodeURIComponent(url)}`}>
                <Img src={url} alt="" />
            </Link>
        </div>
    );
};

export default Random;
