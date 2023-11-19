import { createContext, useState } from "react";
import Images from "../components/SearchPage/Images";
import SearchField from "../components/SearchPage/SearchField";
import useAxios from "../hooks/useAxios";

export const ImageContext = createContext();

function Search() {
    const [searchImage, setSearchImage] = useState('');
    const { response, isLoading, error, fetchData } = useAxios(`search/photos&client_id=${process.env.REACT_APP_ACCESS_KEY}`);

    const value = {
        response,
        isLoading,
        error,
        fetchData,
        searchImage,
        setSearchImage
    }

    return (
        <ImageContext.Provider value={value}>
        <SearchField />
        <Images />
        </ImageContext.Provider>
    );
}

export default Search;