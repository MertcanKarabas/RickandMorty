import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchText } from './../features/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.search.searchText);
    const handleInputChange = (e) => {
        dispatch(setSearchText(e.target.value));
    };
    return (
        <form className="max-w-md mx-auto my-5">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    type="search"
                    value={searchText}
                    onChange={handleInputChange}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                    placeholder="Search something.."
                    required />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                    Search</button>
            </div>
        </form>
    )
}

export default Search;