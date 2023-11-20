import { useContext } from "react";
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
        transition: transform 0.2s;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

const Images = () => {
    const { response, isLoading, searchImage } = useContext(ImageContext);

    return (
        <>
            <h1 className="text-center mt-7 text-2xl">
                {searchImage ? `Results for ${searchImage || 'cats'}` : "Searching..."}
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-6xl mx-auto px-4">
                {isLoading ? (
                    <Loader item={10} />
                ) : response.length === 0 ? (
                    <p className="text-center">
                        the image you're looking for isn't available.
                    </p>
                ) : (
                    response.map((data, key) => (
                        <ImageContainer key={key}>
                            <Link to={`/detail/${encodeURIComponent(data.urls.regular)}`}>
                                <img src={data.urls.small} alt={data.alt_description} />
                            </Link>
                        </ImageContainer>
                    ))
                )}
            </div>
        </>
    );
};

export default Images;