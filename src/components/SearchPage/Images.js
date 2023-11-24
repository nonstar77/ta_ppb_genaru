import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ImageContext } from "../../pages/search";
import Loader from "./Loader";

const ImageContainer = styled.div`
    position: relative;

    img {
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
    }
`;

const NoImages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 8px;
    margin-top: 10px;
    
    p {
        text-align: center;
    }
`;
const Images = () => {
    const { response, isLoading, searchImage } = useContext(ImageContext);

    return (
        <div className="text-center">
            {isLoading ? (
                <Loader key="loader" item={12} />
            ) :
            response.length === 0 ? (
                <NoImages>
                    <p>the image you're looking for isn't available.</p>
                </NoImages>
            ) :
            (
                <div>
                    <h1 className="mt-7 text-2xl">
                        {searchImage ? `Results for ${searchImage}` : "Searching..."}
                    </h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-6xl mx-auto px-4">
                        {response.map((data, key) => (
                            <ImageContainer key={key}>
                                <Link to={`/detail/${data.id}`}>
                                    <img src={data.urls.small} alt={data.alt_description} />
                                </Link>
                            </ImageContainer>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Images;

