import { useContext, useState } from "react";
import { ImageContext } from "../../pages/search";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchData, setSearchImage, response } = useContext(ImageContext);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleButtonSearch = () => {
        setCurrentPage(1); // Reset to first page when performing a new search
        fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
        setSearchImage(searchValue);
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            handleButtonSearch();
        }
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        fetchData(`search/photos?page=${currentPage + 1}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            fetchData(`search/photos?page=${currentPage - 1}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
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
                    disabled={!searchValue || (response && response.length === 0)}
                    className="bg-gray-800 px-2 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SearchField;
