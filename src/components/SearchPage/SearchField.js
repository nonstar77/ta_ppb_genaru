import { useContext, useEffect, useState } from "react";
import { ImageContext } from "../../pages/search";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const { fetchData, setSearchImage, response } = useContext(ImageContext);

    // Load state from local storage on component mount
    useEffect(() => {
        const storedSearchValue = localStorage.getItem("searchValue");
        const storedCurrentPage = localStorage.getItem("currentPage");

        if (storedSearchValue) {
            setSearchValue(storedSearchValue);
            setSearchPerformed(true); // Set searchPerformed to true if searchValue is present
        }

        if (storedCurrentPage) {
            setCurrentPage(Number(storedCurrentPage));
        }
    }, []);

    // Save state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("searchValue", searchValue);
        localStorage.setItem("currentPage", currentPage.toString());
    }, [searchValue, currentPage]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleButtonSearch = () => {
        setCurrentPage(1);
        setSearchPerformed(true);
        fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
        setSearchImage(searchValue);
    };

    const handleEnterSearch = (e) => {
        if (e.key === "Enter") {
            handleButtonSearch();
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        fetchData(
            `search/photos?page=${currentPage + 1}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
        );
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            fetchData(
                `search/photos?page=${currentPage - 1}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
            );
        }
    };

    return (
        <div style={{ maxWidth: "80%", margin: "0 auto", marginTop: "15px" }}>
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
                    className="bg-gray-800 px-6 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 relative"
                >
                    Search
                </button>

                <button
                    onClick={handleNextPage}
                    disabled={!searchPerformed || (response && response.length === 0)}
                    className="bg-gray-800 px-2 py-2.5 text-white rounded focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchField;
