import { Link } from "react-router-dom";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Locations = ({ data }) => {
    const searchText = useSelector(state => state.search.searchText);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data?.results.length > 0) {
            setFilteredData(
                data?.results.filter((location) =>
                location.name.toLowerCase().includes(searchText.toLowerCase()) ||
                location.type.toLowerCase().includes(searchText.toLowerCase()) ||
                location.dimension.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, data])
    return (
        <div className="container mx-auto">
            <Search />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    filteredData?.map((location, index) => (
                        <Link
                        to={`/location/${location.id}`}
                        key={index} 
                        className='flex bg-gray-200 space-x-5 p-4 my-2 rounded-lg shadow-md hover:scale-105 duration-300 hover:text-orange-500 hover:cursor-pointer'>
                        <h1 className="font-bold">{location.id}</h1>
                        <div className="flex flex-col ">
                            <h1 className="font-bold">{location.name}</h1>
                            <p>{location.type}</p>
                            <p>{location.dimension}</p>
                        </div>
                    </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Locations;