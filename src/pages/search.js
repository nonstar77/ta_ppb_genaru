import { createContext, useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import styled from "styled-components";
import Images from "../components/SearchPage/Images";
import SearchField from "../components/SearchPage/SearchField";
import useAxios from "../hooks/useAxios";

export const ImageContext = createContext();

const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1a202c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2000;
    margin: 2rem auto;
    display: ${(props) => (props.visible ? 'block' : 'none')};
`;

function Search() {
    const [searchImage, setSearchImage] = useState('');
    const { response, setResponse, isLoading, error, fetchData } = useAxios(`search/photos?page=1&query=&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

    const value = {
        response,
        isLoading,
        error,
        fetchData,
        searchImage,
        setSearchImage,
        setResponse
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollButtonVisible(scrolled > 200);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ImageContext.Provider value={value}>
            <SearchField />
            <Images />
            <ScrollToTopButton visible={scrollButtonVisible} onClick={handleScrollToTop}>
                <BsArrowUp/>
            </ScrollToTopButton>
        </ImageContext.Provider>
    );
}

export default Search;
