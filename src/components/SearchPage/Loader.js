const Loader = ({ item }) => {
    return [...Array(item).keys()].map(() => (
        <div className="animate-pulse">
            <div className="bg-gray-300 h-80 z-index-1 rounded-lg"></div>
        </div>
    ))
}

export default Loader