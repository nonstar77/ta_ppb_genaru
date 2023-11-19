import { useContext, useState } from "react";
import { ImageContext } from "../../pages/search";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState("");
    const { fetchData, setSearchImage } = useContext(ImageContext);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleButtonSearch = () => {
        fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
        setSearchImage(searchValue);
    }

    const handleEnterSearch = e => {
        if(e.key === 'Enter') {
            fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
            setSearchImage(searchValue);
        }
    }

    return (
        <div className="flex" style={{ maxWidth: '80%', margin: '0 auto', marginTop: '15px'}}>
            <input
                className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
                type="search"
                placeholder="Search Images..."
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleEnterSearch}
            />
            <button
                onClick={handleButtonSearch}
                disabled={!searchValue}
                className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
            >Search</button>
        </div>
    )
}

export default SearchField;