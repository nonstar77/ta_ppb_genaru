import { useContext, useState } from "react";
import { ImageContext } from "../../pages/search";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(2);
    const { fetchData, setSearchImage } = useContext(ImageContext);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleButtonSearch = () => {
        fetchData(`search/photos?page=${currentPage}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
        setSearchImage(searchValue);
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            handleButtonSearch();
            setCurrentPage(1);
        }
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        handleButtonSearch();
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            handleButtonSearch();
        }
    }

    return (
        <div style={{ maxWidth: '80%', margin: '0 auto', marginTop: '15px' }}>
            <input
                className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded"
                type="search"
                placeholder="Search Images..."
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleEnterSearch}

            />
            <div className="flex justify-center space-x-4 mt-2">
                <button
                    onClick={handlePrevPage}
                    disabled={!searchValue || currentPage === 1}
                    className="bg-gray-800 px-2 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    Prev
                </button>

                <button
                onClick={handleButtonSearch}
                disabled={!searchValue}
                className="bg-gray-800 px-6 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    Search
                </button>

                <button
                    onClick={handleNextPage}
                    disabled={!searchValue}
                    className="bg-gray-800 px-2 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SearchField;
